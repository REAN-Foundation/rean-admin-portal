<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import { getDoughnutColors, getTickColorLight, getTickColorDark } from '$lib/themes/theme.selector';

    /////////////////////////////////////////////////////////////////////////////

    const tickColorLight = getTickColorLight();
    const tickColorDark = getTickColorDark();

    export let labels: string[];
    export let data: number[];
    export let title: string;

    let doughnutChart;
    let ctx;

    const colorPalette = getDoughnutColors();

    function getColor(value: number, totalSum: number, index: number): string {
        let localIndex = index;
        const percentage = Math.floor((value / totalSum) * 100);
        console.log('Percentage:', percentage, 'Value:', value, 'Total Sum:', totalSum);
        console.log('Color Index:',percentage%8)
        console.log('Type of Color Index:',typeof(percentage%8))
        if (index === 8) {
            localIndex = index%8;
        }
        return colorPalette[localIndex];
        // if (percentage <= 16) {
        //     return colorPalette[5];
        // } else if (percentage <= 32) {
        //     return colorPalette[4];
        // } else if (percentage <= 48) {
        //     return colorPalette[3];
        // } else if (percentage <= 64) {
        //     return colorPalette[2];
        // } else if (percentage <= 80) {
        //     return colorPalette[1];
        // } else {
        //     return colorPalette[0];
        // }
    }

    function getDynamicColors(data: number[]): string[] {
        const totalSum = data.reduce((acc, curr) => acc + curr, 0); // Sum of all values
        return data.map((value, index) => getColor(value, totalSum, index));
    }

    function truncateLabel(label: string, maxLength: number = 8): string {
        return label.length > maxLength ? label.slice(0, maxLength) + '...' : label;
    }

    $: dynamicColors = getDynamicColors(data);
    $: truncatedLabels = labels.map((label) => truncateLabel(label));

    $: data;
    $: labels;

    onMount(async () => {
        ctx = doughnutChart.getContext('2d');
        doughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: truncatedLabels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: dynamicColors, // Dynamic colors for the doughnut chart
                        hoverBackgroundColor: dynamicColors
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            boxWidth: 10,
                            boxHeight: 10,
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

<!-- Canvas for the Doughnut chart -->
<div class=" ">
    <canvas
        height="400"
        width="400"
        bind:this={doughnutChart}
    />
</div>
