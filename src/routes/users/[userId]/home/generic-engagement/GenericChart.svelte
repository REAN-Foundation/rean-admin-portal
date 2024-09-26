<script>
    import BarChart from '$lib/components/analytics/BarChart.svelte';
    import RetentionGraphs from '$lib/components/analytics/RetentionGraphs.svelte';

    export let type = 'bar';
    export let data = null;
    export let labels = [];
    export let title = '';
</script>

<!-- <div
    class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
> -->
{#if data}
    {#if type === 'bar'}
        <div class="h-96">
            <BarChart
                dataSource={data}
                {labels}
                {title}
            />
        </div>
    {:else if type === 'retention'}
        <div class="h-96">
            <RetentionGraphs
                dataSource={data}
                {labels}
                {title}
            />
        </div>
    {/if}
{:else}
    <div class="h-[400px] w-full p-4">
        <p class="justify-left items-center flex text-2xl">
            <!-- {title} -->
        </p>
        <p class="justify-center items-center flex text-xl mt-28 leading-3">Data Not Available</p>
    </div>
{/if}
<!-- </div> -->
