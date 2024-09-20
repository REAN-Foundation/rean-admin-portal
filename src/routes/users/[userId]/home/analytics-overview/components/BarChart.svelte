<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import { getDoughnutColors, getTickColorLight, getTickColorDark } from '$lib/themes/theme.selector';

    /////////////////////////////////////////////////////////////////////////////

    const tickColorLight = getTickColorLight();
    const tickColorDark = getTickColorDark();

    export let labels: string[] = [];
    export let dataSource: number[] = [];
    export let title: string;

    let barChart;
    let ctx;

    console.log(labels, 'labels', dataSource, 'data');

    // Predefined color palette, sorted from darkest to lightest
    const colorPalette = getDoughnutColors();

    // function getColor(index: number): string {
    //     let localIndex = index;
    //     if (index === 8) {
    //         localIndex = index % 8;
    //     }
    //     return colorPalette[localIndex];
    // }
    function getColor(index: number): string {
        const localIndex = index % 8; // This will ensure that the index always stays within 0 to 7
        return colorPalette[localIndex];
    }

    // Function to generate dynamic colors for the entire dataset
    function getDynamicColors(data: number[]): string[] {
        return data.map((index) => getColor(index));
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
                        backgroundColor:  '#5EC1E9', // Apply dynamic colors
                        borderColor:  '#5EC1E9', // Use the same color for borders
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
                        display: false,
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
                    },

                    tooltip: {
                        callbacks: {
                            // Modify this to use your custom label logic
                            label: function (context) {
                                let label = context.dataset.label || '';
                                let customNames = labels; // Add your custom names

                                if (label) {
                                    label += ': ';
                                }

                                if (context.parsed.y !== null) {
                                    // Get the value from customNames based on the context index
                                    let customLabel = customNames[context.dataIndex] || 'Default Name';
                                    label += customLabel; // Add the parsed value
                                }

                                return label;
                            }
                        }
                    }
                }
            }
        });
    });
</script>

<canvas
    class=" "
    bind:this={barChart}
/>
