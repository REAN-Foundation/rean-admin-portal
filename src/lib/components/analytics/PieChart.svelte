<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import { getDoughnutColors, getTickColorLight, getTickColorDark } from '$lib/themes/theme.selector';

    /////////////////////////////////////////////////////////////////////////////

    const tickColorLight = getTickColorLight();
    const tickColorDark = getTickColorDark();

    export let labels: [];
    export let data: [];
    export let title: string;

    let pieChart;
    let ctx;

    console.log(data, 'data', labels);
    const colorPalette = getDoughnutColors();

    onMount(async () => {
        // const dynamicColors = getDynamicColors(data); // Get dynamic colors based on the dataset

        ctx = pieChart.getContext('2d');
        pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: colorPalette, // Dynamic colors for the pie chart
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
                    }
                }
            }
        });
    });
</script>

<div class="h-96 w-full  items-center pl-10 justify-center">
    {#if data}
        <canvas height="400" width="400"  bind:this={pieChart} />
    {:else}
        <p>No data available.</p>
    {/if}
</div>
