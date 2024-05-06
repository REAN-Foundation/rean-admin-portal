<script lang="ts">
    import Funnel from '$lib/components/users-stats/charts/funnel.svelte';
    import { afterUpdate, onMount } from 'svelte';

    export let labels: string[];
    export let dataSource: number[];

    interface FunnelDataPoint {
        label: string;
        count: number;
    }

    let dataPoints : FunnelDataPoint[] = []
    onMount (() => {
        dataPoints = labels.map((label, index) => {
            return {
                label,
                count: dataSource[index]
            }
        })
    });
</script>

<div class="mt-5 flex overflow-x-auto rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:p-6 w-1/2 h-auto"
>
    <div class="pb-4 w-1/2 gap-6 justify-center ">
        <h4 class="text-center mb-2 p-2 font-semibold justify-center text-primary-500 dark:text-primary-100">App Users</h4>
        <div>
            <Funnel {labels} dataSource={dataSource} />
        </div>
    </div>
    <div class="mt-10 px-4 w-1/2">
        { #each dataPoints as dp}
            <div class="flex gap-4 w-full py-1">
                <div class="h-3 w-3 mt-1 border bg-primary-700" />
                <div class="text-sm w-2/3 font-normal text-primary-500 dark:text-primary-100">{dp.label}</div>
                <div class="text-sm w-1/3 font-normal text-primary-500 dark:text-primary-100">{dp.count}</div>
            </div>
        {/each}
    </div>
</div>
