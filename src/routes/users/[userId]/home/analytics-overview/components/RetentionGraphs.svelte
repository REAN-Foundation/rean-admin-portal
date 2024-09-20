<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import { getDoughnutColors, getTickColorLight, getTickColorDark } from '$lib/themes/theme.selector';
    /////////////////////////////////////////////////////////////////////////////
    const tickColorLight = getTickColorLight();
    const tickColorDark = getTickColorDark();
    export let labels: string[] = [];
    export let dataSource: number[] = [];
    export let rate;
    export let title: string;
    let barChart;
    let ctx;
    console.log(labels, 'labels', dataSource, 'data');
    const colorPalette = getDoughnutColors();
    function getColor(index: number): string {
        const localIndex = index % colorPalette.length;
        return colorPalette[localIndex];
    }
    function getDynamicColors(data: number[]): string[] {
        return data.map((_, index) => getColor(index));
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
                        backgroundColor: '#5EC1E9',
                        borderColor: '#5EC1E9',
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
                            label: function (context) {
                                let label = context.dataset.label || '';
                                let customNames = labels;
                                let extraInfo = rate;
                                let tooltipLines = [];
                                if (context.parsed.y !== null) {
                                    let customLabel = customNames[context.dataIndex] || 'Default Name';
                                    tooltipLines.push(customLabel);
                                    let extra = extraInfo[context.dataIndex] || 'No Extra Info';
                                    tooltipLines.push(extra);
                                }
                                return tooltipLines;
                            }
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
