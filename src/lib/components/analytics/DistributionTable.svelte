<script lang="ts">
    import Doughnut from "./Doughnut.svelte";
    
    export let title = '';
    export let tableHeaders: string[] = [];
    export let tableData: any[] = [];
    // export let chartLabels: string[] = [];
    // export let chartData: number[] = [];
    
    // Dynamically set keys for labels and counts, passed in by the parent component
    export let labelKey: string = 'label'; // e.g., 'age_group', 'gender', 'hospital', etc.
    export let countKey: string = 'count'; // e.g., 'count'

    const MAX_ENTRIES = 6;

    // Function to handle truncating long labels
    function truncateLabel(label: string, maxLength: number): string {
        if (!label) return 'Unknown';
        return label.length > maxLength ? label.slice(0, maxLength) + '...' : label;
    }

    // Process the data: map table data to format {label, count, percentage}, limit to MAX_ENTRIES
    $: processedData = (() => {
        const totalCount = tableData.reduce((sum, item) => sum + (item[countKey] || 0), 0);

        let processed = tableData
            .map((item) => ({
                label: item[labelKey] || 'Unknown',
                count: item[countKey] || 0,
                percentage: totalCount > 0 ? ((item[countKey] || 0) / totalCount * 100).toFixed(2) : '0.00'
            }))
            .sort((a, b) => b.count - a.count);

        if (processed.length > MAX_ENTRIES) {
            const topItems = processed.slice(0, MAX_ENTRIES - 1);
            const otherItems = processed.slice(MAX_ENTRIES - 1);
            const otherCount = otherItems.reduce((sum, item) => sum + item.count, 0);
            const otherPercentage = totalCount > 0 ? (otherCount / totalCount * 100).toFixed(2) : '0.00';
            
            processed = [
                ...topItems, 
                { label: 'Other', count: otherCount, percentage: otherPercentage }
            ];
        }

        return processed;
    })();

    // Updated data for chart rendering
    $: updatedChartLabels = processedData.map(item => truncateLabel(item.label, 20));
    $: updatedChartData = processedData.map(item => item.count);

    $: hasData = processedData && processedData.length > 0;
</script>

{#if hasData}
    <div class="grid grid-cols-3 overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-full h-full gap-3">
        <div class="px-4 sm:px-6 lg:px-8 col-span-2 items-center justify-center">
            <div class="flow-root">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-4">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table class="w-1/2 border border-secondary-100 dark:border-surface-700 rounded-lg">
                            <thead>
                                <tr class="w-[100%] border border-secondary-100 dark:border-surface-700">
                                    {#each tableHeaders as header}
                                        <th class="w-[30%] py-3 pl-4 pr-3 text-left text-sm font-semibold sm:pl-3 border border-secondary-100 dark:border-surface-700">
                                            {header}
                                        </th>
                                    {/each}
                                </tr>
                            </thead>
                            <tbody>
                                {#each processedData as data}
                                    <tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700">
                                        <td class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700">
                                            {data.label}
                                        </td>
                                        <td class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700">
                                            {data.count}
                                        </td>
                                        <td class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700">
                                            {data.percentage}%
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
                    data={updatedChartData}
                    labels={updatedChartLabels}
                    {title}
                />
            </div>
        </div>
    </div>
{:else}
    <div class="w-full justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 h-fit p-4 gap-3">
        <p class="text-lg font-semibold flex text-center items-center justify-center place-items-center place-content-center">
            Data Not Available
        </p>
    </div>
{/if}
