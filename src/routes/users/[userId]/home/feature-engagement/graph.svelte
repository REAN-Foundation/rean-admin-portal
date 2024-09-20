<script lang="ts">
    import BarChart from '../analytics-overview/components/BarChart.svelte';
    import RetentionGraphs from '../analytics-overview/components/RetentionGraphs.svelte';
    /////////////////////////////////////////////////
    const fontColor = '#661B26';
    export let accessFrequencyData, accessFrequencyLabels;
    export let engagementRateData, engagementRateLabels, engagementRateRate;
    export let retentionRateDaysData, retentionRateDaysLabels, retentionRateDaysRate;
    export let retentionRateIntervalsData, retentionRateIntervalsLabels, retentionRateIntervalsRate;
    export let dropOffPointsData, dropOffPointsLabels;

    let DummyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let DummyLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
</script>

<div class="flex flex-col justify-center">
    <div class="grid grid-cols-1 justify-center rounded-lg py-8 gap-8">
        <div class="flex justify-center items-center h-96 gap-10 w-full">
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                {#if accessFrequencyData.length > 0}
                    <BarChart
                        dataSource={accessFrequencyData}
                        labels={accessFrequencyLabels}
                        title="Access Frequency"
                    />
                {:else}
                    <div class="h-[400px] w-[400px] p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            Access Frequency
                        </p>
                        <p
                            style="color:{fontColor}"
                            class="justify-center items-center flex text-xl mt-28 leading-3"
                        >
                            Data Not Available
                        </p>
                    </div>
                {/if}
            </div>
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                {#if engagementRateData.length > 0}
                    <RetentionGraphs
                        rate={engagementRateRate}
                        dataSource={engagementRateData}
                        labels={engagementRateLabels}
                        title="Engagement Rate (%)"
                    />
                {:else}
                    <div class="h-[400px] w-[400px] p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            Engagement Rate (%)
                        </p>
                        <p
                            style="color:{fontColor}"
                            class="justify-center items-center flex text-xl mt-28 leading-3"
                        >
                            Data Not Available
                        </p>
                    </div>
                {/if}
            </div>
        </div>
        <div class="flex justify-center items-center h-full gap-10 w-full">
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                {#if retentionRateDaysData.length > 0}
                    <RetentionGraphs
                        rate={retentionRateDaysRate}
                        dataSource={retentionRateDaysData}
                        labels={retentionRateDaysLabels}
                        title="Retention User Count On Specific Days (%)"
                    />
                {:else}
                    <div class="h-[400px] w-[400px] p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            Retention User Count On Specific Days (%)
                        </p>
                        <p
                            style="color:{fontColor}"
                            class="justify-center items-center flex text-xl mt-28 leading-3"
                        >
                            Data Not Available
                        </p>
                    </div>
                {/if}
            </div>
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                {#if retentionRateIntervalsData.length > 0}
                    <RetentionGraphs
                        rate={retentionRateIntervalsRate}
                        dataSource={retentionRateIntervalsData}
                        labels={retentionRateIntervalsLabels}
                        title="Retention User Count On Specific Intervals (%)"
                    />
                {:else}
                    <div class="h-[400px] w-[400px] p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            Retention User Count On Specific Intervals (%)
                        </p>
                        <p
                            style="color:{fontColor}"
                            class="justify-center items-center flex text-xl mt-28 leading-3"
                        >
                            Data Not Available
                        </p>
                    </div>
                {/if}
            </div>
        </div>
        <!-- <div class="flex justify-center items-center h-full gap-10 w-full">
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            > -->
        <!-- {#if dropOffPointsData.length > 0}
                    <PieChart
                        data={dropOffPointsData}
                        labels={dropOffPointsLabels}
                        title="DropOff Points (%)"
                    />
                {:else}
                    <PieChart
                        data={DummyData}
                        labels={DummyLabels}
                        title="DropOff Points (%) (No Data available)"
                    />
                {/if} -->
        <div class="flex justify-center items-center h-full gap-10 w-full">
            <div
                class="flex flex-col overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="h-fit w-full">
                    <div class="justify-left items-center flex text-xl bold p-4 text-primary-500 dark:text-primary-100">
                        {#if dropOffPointsData && dropOffPointsLabels}
                            DropOff Points (%)
                        {:else}
                            DropOff Points (%) (No Data available)
                        {/if}
                    </div>
                    {#if dropOffPointsData && dropOffPointsLabels}
                        <table
                            class="min-w-full mt-2 mb-10 rounded-lg border border-secondary-100 dark:border-surface-70 text-primary-500 dark:text-primary-100"
                        >
                            <thead>
                                <tr>
                                    <th class="py-2 px-4 border-b border-gray-200 text-left">Label</th>
                                    <th class="py-2 px-4 border-b border-gray-200 text-left">Value</th>
                                </tr>
                            </thead>
                            <tbody class="justify-center">
                                {#each dropOffPointsData as value, index}
                                    <tr>
                                        <td class="py-2 px-4 border-b border-gray-200">{dropOffPointsLabels[index]}</td>
                                        <td class="py-2 px-4 border-b border-gray-200">{value} %</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    {:else}
                        <div class="h-fit w-full p-4">
                            <p
                                style="color:{fontColor}"
                                class="justify-left items-center flex text-2xl"
                            >
                                DropOff Points (%)
                            </p>
                            <p
                                style="color:{fontColor}"
                                class="justify-center items-center flex text-xl mt-28 leading-3"
                            >
                                Data Not Available
                            </p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>
