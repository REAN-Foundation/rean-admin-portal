<script lang="ts">
    import { onMount} from 'svelte';
    import Chart from 'chart.js/auto';
    import { getDoughnutColors, getTickColorLight, getTickColorDark } from '$lib/themes/theme.selector';

    /////////////////////////////////////////////////////////////////////////////

    const tickColorLight = getTickColorLight();
    const tickColorDark = getTickColorDark();

    export let labels: string[] = [];
    export let data: number[] = [];
    export let title: string = '';

    let pieChart;
    let ctx;
    const colorPalette = getDoughnutColors();

    const initChart = () => {
        if (pieChart) {
            pieChart.destroy();
        }
        ctx = (document.getElementById('myPieChart') as HTMLCanvasElement)?.getContext('2d');

        pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: colorPalette,
                        hoverBackgroundColor: colorPalette
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 10,
                            boxHeight: 10,
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
                            label: (context) => {
                                const label = context.label || '';
                                const value = context.raw as number;
                                const total = context.dataset.data.reduce((acc, curr) => acc + (curr as number), 0);
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    },
                }
            }
        });
    };

    onMount(() => {
        initChart();
    });

    $: {
        if (data.length > 0 && labels.length > 0) {
            initChart();
        }
    }
</script>

<div class="h-96 w-full items-center pl-10 justify-center">
    {#if data.length > 0 && labels.length > 0}
        <canvas id="myPieChart" height="400" width="400" />
    {:else}
        <p>No data available.</p>
    {/if}
</div>
