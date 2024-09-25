<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import { getDoughnutColors, getTickColorLight, getTickColorDark } from '$lib/themes/theme.selector';

    /////////////////////////////////////////////////////////////////////////////

    const tickColorLight = getTickColorLight();
    const tickColorDark = getTickColorDark();

    export let labels: string[] = [];
    export let firstDataSource: number[] = [];
    export let secondDataSource: number[] = [];
    export let title: string;

    let barChart;
    let ctx;

    // console.log(labels, 'labels', dataSource, 'data');

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

    // $: dynamicColors = getDynamicColors(dataSource);

    // console.log(labels, 'labels', dataSource);

    onMount(() => {
        ctx = barChart.getContext('2d');
        barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: firstDataSource,
                        backgroundColor: '#68d33d',
                        borderColor: '#5EC009',
                        borderWidth: 1,
                        label: 'Patient Registration Moth',
                        borderRadius: {
                            topLeft: 4,
                            topRight: 4
                        }
                    },
                    {
                        data: secondDataSource,
                        backgroundColor: '#f86565',
                        borderColor: '#5EC1E9',
                        borderWidth: 1,
                        label: 'Patient Deregistration Month',
                        borderRadius: {
                            topLeft: 4,
                            topRight: 4
                        }
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
                            display: true
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
                        display: true,
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
                                // Get the label for the dataset
                                let label = context.dataset.label || '';

                                // Add the x-axis value (label)
                                let xLabel = labels[context.dataIndex] || 'No label';

                                // Add the y-axis value (data point value)
                                let yValue = context.parsed.y !== null ? context.parsed.y : 'No value';

                                // Customizing the tooltip text
                                if (label) {
                                    label += ': ';
                                }
                                label += `${xLabel} , Value: ${yValue}`;

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
