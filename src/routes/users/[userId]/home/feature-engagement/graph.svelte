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
        <div class="flex justify-center items-center h-full gap-10 w-full">
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center flex-col">
                        <h4 class="mr-4 text-left justify-center pt-3 pb-1 ml-4 text-lg font-semibold sm:pl-3">
                            Access Frequency
                        </h4>
                        <p class="mr-4 text-left justify-center ml-4 pb-1 text-sm sm:pl-3">
                            The number of times users access a particular feature over time. This metric helps identify
                            the popularity and utility of features among users.
                        </p>
                    </div>
                    {#if accessFrequencyData.length > 0}
                        <div class="h-96">
                            <BarChart
                                dataSource={accessFrequencyData}
                                labels={accessFrequencyLabels}
                                title="Access Frequency"
                            />
                        </div>
                    {:else}
                        <div class="h-[400px] w-[400px] p-4">
                            <p
                                style="color:{fontColor}"
                                class="justify-left items-center flex text-2xl"
                            >
                                <!-- Access Frequency -->
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

            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center flex-col">
                        <h4 class="mr-4 text-left justify-center py-3 ml-4 text-lg font-semibold sm:pl-3">
                            Engagement Rate (%)
                        </h4>

                        <p class="mr-4 text-left justify-center ml-4 pb-1 text-sm sm:pl-3">
                            This is the ratio of number of unique users engaging with each feature per month to the
                            total number of active users per month.
                        </p>
                    </div>
                    {#if engagementRateData.length > 0}
                        <div class="h-96">
                            <RetentionGraphs
                                rate={engagementRateRate}
                                dataSource={engagementRateData}
                                labels={engagementRateLabels}
                                title="Engagement Rate (%)"
                            />
                        </div>
                    {:else}
                        <div class="h-[400px] w-[400px] p-4">
                            <p
                                style="color:{fontColor}"
                                class="justify-left items-center flex text-2xl"
                            >
                                <!-- Engagement Rate (%) -->
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
    <div class="flex justify-center items-center h-full gap-10 w-full">
        <div
            class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
        >
            <div class="w-full">
                <div class="flex items-center flex-col">
                    <h4 class="mr-4 text-left justify-center py-3 ml-4 text-lg font-semibold sm:pl-3">
                        <!-- Retention User Count On Specific Days (%) -->
                        Retention Days After Registration
                    </h4>
                    <p class="mr-4 text-left justify-center ml-4 pb-1 text-sm sm:pl-3">
                        The percentage of users who return to a feature after their first use at specific intervals (day
                        1, day 7, day 30). Retention rates measure user loyalty and the ability of the feature to keep
                        users engaged over time.
                    </p>
                </div>
                {#if retentionRateDaysData.length > 0 && retentionRateDaysLabels.length > 0}
                    <div class="h-96">
                        <RetentionGraphs
                            rate={retentionRateDaysRate}
                            dataSource={retentionRateDaysData}
                            labels={retentionRateDaysLabels}
                            title="Retention User Count On Specific Days (%)"
                        />
                    </div>
                {:else}
                    <div class="h-[400px] w-[400px] p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            <!-- Retention User Count On Specific Days (%) -->
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
        <div
            class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
        >
            <div class="w-full">
                <div class="flex items-center flex-col">
                    <h4 class="mr-4 text-left justify-center py-3 ml-4 text-lg font-semibold sm:pl-3">
                        <!-- Retention User Count On Specific Intervals (%) -->
                        Retention After Registration
                    </h4>
                    <p class="mr-4 text-left justify-center ml-4 pb-1 text-sm sm:pl-3">
                        The percentage of users who return to a feature after their first use at specific intervals (0-1
                        days, 1-3 days, 3-7 days, etc). This is just another way to look at the retention on specific
                        days.
                    </p>
                </div>
                {#if retentionRateIntervalsData.length > 0}
                    <div class="h-96">
                        <RetentionGraphs
                            rate={retentionRateIntervalsRate}
                            dataSource={retentionRateIntervalsData}
                            labels={retentionRateIntervalsLabels}
                            title="Retention User Count On Specific Intervals (%)"
                        />
                    </div>
                {:else}
                    <div class="h-[400px] w-[400px] p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            <!-- Retention User Count On Specific Intervals (%) -->
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
    <div class="mt-10 flex justify-center items-center h-full gap-10 w-full">
        <div
            class="flex flex-col overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
        >
            <div class="h-fit w-full">
                <div class="justify-left items-center flex py-3 text-lg sm:pl-3 flex-col">
                    {#if dropOffPointsData && dropOffPointsLabels}
                        <p class="font-semibold">DropOff Points (%)</p>

                        <p class="mr-4 text-left justify-center ml-4 pb-1 text-sm sm:pl-3">
                            Points in the user flow where users most frequently stop using a feature. Identifying
                            drop-off points helps in optimizing the user journey and addressing usability challenges to
                            improve feature completion rates.
                        </p>
                    {:else}
                        DropOff Points (%) (No Data available)
                    {/if}
                </div>
                {#if dropOffPointsData && dropOffPointsLabels}
                    <table class="min-w-full mt-2 mb-10 rounded-lg border border-secondary-100 dark:border-surface-70">
                        <thead>
                            <tr>
                                <th class="py-2 px-4 border-b border-gray-200 font-semibold text-left">Label</th>
                                <th class="py-2 px-4 border-b border-gray-200 font-semibold text-left">Value</th>
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
