<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import {getChartColors, getTickColorLight, getTickColorDark } from '$lib/themes/theme.selector';

    /////////////////////////////////////////////////////////////////////////////

    const tickColorLight = getTickColorLight();
    const tickColorDark = getTickColorDark();

    export let labels: string[];
    export let data: number[];
    export let title: string;

    let pieChart;
    let ctx;

    // // Function to create a color based on value
    // function getColor(value: number, minValue: number, maxValue: number): string {
    //     const colorScale = interpolateRgb('#ffcccc', '#ff0000'); // From light red to dark red
    //     const normalizedValue = (value - minValue) / (maxValue - minValue); // Normalize value to range 0-1
    //     return colorScale(normalizedValue); // Interpolated color
    // }

    // // Function to generate colors dynamically based on the dataset
    // function getDynamicColors(data: number[]): string[] {
    //     const minValue = Math.min(...data); // Minimum value in dataset
    //     const maxValue = Math.max(...data); // Maximum value in dataset
    //     return data.map((value) => getColor(value, minValue, maxValue)); // Map each value to a color
    // }

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

$: dynamicColors = getDynamicColors(data);

    $: data;
    $: labels;

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
                        backgroundColor: dynamicColors, // Dynamic colors for the pie chart
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
                        align: 'center',
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

<div class=" ">
    <canvas
    height="500"
    width="500"
        bind:this={pieChart}
    />
</div>
