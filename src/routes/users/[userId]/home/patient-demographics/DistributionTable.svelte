<script lang="ts">
    import Doughnut from '../analytics-overview/components/doughnut.svelte';
    export let title = '';
    export let tableHeaders = [];
    export let tableData = [];
    export let chartData = null;
    export let chartLabels = [];
    let fontColor = '#661B26';

    // Calculate the total sum of counts
    let totalCount = tableData.reduce((total, record) => total + record.count, 0);

    // Calculate the average and add it to each record
    let updatedTableData = tableData.map((record) => ({
        ...record,
        average: ((record.count / totalCount) * 100).toFixed(2) + '%'
    }));
</script>

{#if chartData.length > 0}
    <div
        class="grid grid-cols-3 overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-full h-full gap-3"
    >
        <div class="px-4 sm:px-6 lg:px-8 col-span-2 items-center justify-center">
            <div class="flow-root">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-4">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table class="min-w-full border border-secondary-100 dark:border-surface-700 rounded-lg">
                            <thead>
                                <tr class="w-[100%] border border-secondary-100 dark:border-surface-700">
                                    {#each tableHeaders as header}
                                        <th
                                            class="w-[30%] py-3 pl-4 pr-3 text-left text-sm font-semibold sm:pl-3 border border-secondary-100 dark:border-surface-700"
                                        >
                                            {header}
                                        </th>
                                    {/each}
                                </tr>
                            </thead>
                            <tbody>
                                {#each updatedTableData as data}
                                    <tr
                                        class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700"
                                    >
                                        {#each Object.values(data).slice(0, -1) as value}
                                            <td
                                                class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                            >
                                                {value || 'Unknown'}
                                            </td>
                                        {/each}
                                        <!-- Display the calculated average percentage -->
                                        <td
                                            class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                        >
                                            {data.average}
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4">
            <div class="flex col-span-3 overflow-x-auto justify-center items-center dark:border-surface-700 sm:px-4">
                <Doughnut
                    data={chartData}
                    labels={chartLabels}
                    {title}
                />
            </div>
        </div>
    </div>
{:else}
    <div
        class="w-full justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 h-fit p-4 gap-3"
    >
        <p class="text-xl flex text-center items-center justify-center place-items-center place-content-center">
            Data Not Available
        </p>
    </div>
{/if}
