<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import {
		getChartColors,
		getTickColorLight,
		getTickColorDark
  	} from '$lib/themes/theme.selector';

  /////////////////////////////////////////////////////////////////////////////

  const chartColors = getChartColors();
  const tickColorLight = getTickColorLight();
  const tickColorDark = getTickColorDark();

	export let labels: string[];
	export let data: number[];
	export let title: string;

	$:data;
    $:labels
	let pieChart;
	let ctx;

	onMount(async () => {
		ctx = pieChart.getContext('2d');
		pieChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: labels,
				datasets: [
					{
						data: data,
						backgroundColor: chartColors,
						hoverBackgroundColor: chartColors
					}
				]
			},
			options: {
				responsive: true,
				// layout: {
				// 	padding: {
				// 		left: 10,
				// 		right:10,
				// 		top: 10,
				// 		bottom:10
				// 	}
				// },
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
					title: {
						display: false,
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

<div>
	<canvas id="pieChart" bind:this={pieChart} />
</div>
