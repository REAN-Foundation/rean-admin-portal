<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import { getChartColors,getTickColorLight, getTickColorDark } from '$lib/themes/theme.selector';

    /////////////////////////////////////////////////////////////////////////////

    const tickColorLight = getTickColorLight();
    const tickColorDark = getTickColorDark();

    export let labels: string[] = [];
    export let dataSource: number[] = [];
    export let title: string;
    
    let barChart;
    let ctx;

    // Predefined color palette, sorted from darkest to lightest
    const colorPalette = getChartColors();

    // Function to determine which color to assign based on the value's percentile
    function getColor(value: number, minValue: number, maxValue: number): string {
        const range = maxValue - minValue;
        const percentage = ((value - minValue) / range) * 100;

        // Assign colors based on percentage ranges
        if (percentage <= 25) {
            return colorPalette[3]; // Lightest
        } else if (percentage <= 50) {
            return colorPalette[2];
        } else if (percentage <= 75) {
            return colorPalette[1];
        } else {
            return colorPalette[0]; // Darkest
        }
    }

    // Function to generate dynamic colors for the entire dataset
    function getDynamicColors(data: number[]): string[] {
        const minValue = Math.min(...data);
        const maxValue = Math.max(...data);
        return data.map(value => getColor(value, minValue, maxValue));
    }

    $: dynamicColors = getDynamicColors(dataSource);

    console.log(labels, 'labels', dataSource);

    onMount(() => {
        ctx = barChart.getContext('2d');
        barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: dataSource,
                        backgroundColor: dynamicColors,  // Apply dynamic colors
                        borderColor: dynamicColors,  // Use the same color for borders
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'x',
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? tickColorDark : tickColorLight
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? tickColorDark : tickColorLight
                        }
                    }
                },
                layout: {
                    padding: {
                        bottom: 20
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                        position: 'top',
                        align: 'center',
                        labels: {
                            color: document.documentElement.classList.contains('dark') ? tickColorDark : tickColorLight
                        }
                    },
                    title: {
                        display: true,
                        text: title,
                        position: 'top',
                        color: document.documentElement.classList.contains('dark') ? tickColorDark : tickColorLight,
                        align: 'start',
                        padding: 20,
                        font: {
                            size: 22,
                            weight: 'normal',
                            lineHeight: 1.2
                        }
                    }
                }
            }
        });
    });
</script>

<canvas
    class="h-96"
    bind:this={barChart}
/>
