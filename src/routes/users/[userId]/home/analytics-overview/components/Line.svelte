<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import { getChartColors, getTickColorLight, getTickColorDark } from '$lib/themes/theme.selector';

    /////////////////////////////////////////////////////////////////////////////

    const tickColorLight = getTickColorLight();
    const tickColorDark = getTickColorDark();
    const color = getChartColors();

    export let lables: string[] = [];
    export let login: number[] = [];
    export let medication: number[] = [];
    export let title: string;
    let barChart;
    let ctx;
    console.log(lables, 'labels', login, 'medication', medication);
    onMount(() => {
        ctx = barChart.getContext('2d');
        barChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: lables,
                datasets: [
                    {
                        label: 'Login',
                        data: login,
                        borderColor: color[0],
                        fill: false
                    },
                    {
                        label: 'Medication',
                        data: medication,
                        borderColor: color[3],
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? tickColorDark : tickColorLight // set x-axis label color here
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? tickColorDark : tickColorLight // set y-axis label color here
                        }
                    }
                },
                layout: {
                    padding: {
                        bottom: 20 // Adjust the bottom padding value as needed
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'center',
                        labels: {
                            color: document.documentElement.classList.contains('dark') ? tickColorDark : tickColorLight,
                            boxWidth: 10,
                            boxHeight: 10
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
    height="500"
    width="500"
    bind:this={barChart}
/>
