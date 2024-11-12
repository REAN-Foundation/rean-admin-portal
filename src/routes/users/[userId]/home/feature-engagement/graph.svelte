<script lang="ts">
    import BarChart from '$lib/components/analytics/BarChart.svelte';
    import PieChart from '$lib/components/analytics/PieChart.svelte';
    import RetentionGraphs from '$lib/components/analytics/RetentionGraphs.svelte';

    /////////////////////////////////////////////////

    export let accessFrequencyData, accessFrequencyLabels;
    export let engagementRateData, engagementRateLabels;
    export let retentionRateDaysData, retentionRateDaysLabels, retentionRateDaysRate;
    export let retentionRateIntervalsData, retentionRateIntervalsLabels, retentionRateIntervalsRate;
    export let dropOffPointsData, dropOffPointsLabels;
    export let feature = undefined;
    $: sortedData = dropOffPointsData
        .map((value, index) => ({ value, label: dropOffPointsLabels[index] }))
        .sort((a, b) => parseInt(b.value) - parseInt(a.value));

    console.log('accessFrequencyData', accessFrequencyData, 'accessFrequencyLabels', accessFrequencyLabels);

    let selectedGraph = 'graph1';
    let percentageGraph = 'graph1';
    export let medicationManagementdata;
    let medicationLabels = ['Taken', 'Not Taken', 'Not Specified'];
    let medicationData = [
        medicationManagementdata?.medication_taken_count || 0,
        medicationManagementdata?.medication_missed_count || 0,
        medicationManagementdata?.medication_not_answered_count || 0
    ];
</script>

<div class="flex flex-col justify-center">
    <div class="grid grid-cols-1 justify-center rounded-lg py-8 gap-8">
        <div class="flex justify-center items-center h-full gap-10 w-full">
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center flex-col">
                        <h4 class="mx-4 text-left justify-center pt-3 py-1 text-lg font-semibold sm:pl-3">
                            Access Frequency
                        </h4>
                        <!-- <h5 class="mr-4 text-left justify-center ml-4 text-sm font-semibold sm:pl-3 mt-[-4px]">
                            (Frequency After Registration)
                        </h5> -->
                        <p class="mx-2 text-left justify-left my-2 pb-1 text-sm sm:pl-3">
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
                            <p class="justify-left items-center flex text-2xl">
                                <!-- Access Frequency -->
                            </p>
                            <p class="justify-center items-center flex text-xl mt-28 leading-3">Data Not Available</p>
                        </div>
                    {/if}
                </div>
            </div>
            <div
                class="flex overflow-x-auto h-[100%] justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center flex-col">
                        <h4 class="mx-4 text-left justify-center py-1 pt-3 text-lg font-semibold sm:pl-3">
                            Engagement Rate
                        </h4>
                        <!-- <h5 class="mr-4 text-left justify-center ml-4 text-sm font-semibold sm:pl-3 mt-[-4px]">
                            (Rate After Registration)
                        </h5> -->
                        <p class="mx-2 text-left justify-left my-2 pb-1 text-sm sm:pl-3">
                            This is the ratio of number of unique users engaging with each feature per month to the
                            total number of active users per month.
                        </p>
                    </div>
                    {#if engagementRateData.length > 0}
                        <div class="h-96">
                            <!-- rate={engagementRateRate} -->
                            <RetentionGraphs
                                dataSource={engagementRateData}
                                labels={engagementRateLabels}
                                title="Engagement Rate (%)"
                            />
                        </div>
                    {:else}
                        <div class="h-[400px] w-[400px] p-4">
                            <p class="justify-left items-center flex text-2xl">
                                <!-- Engagement Rate (%) -->
                            </p>
                            <p class="justify-center items-center flex text-xl mt-28 leading-3">Data Not Available</p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
    <div class="flex justify-center  h-full items-stretch gap-10 w-full">
        <div
            class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
        >
            <div class="w-full">
                <div class="flex items-center flex-col">
                    <h4 class="mx-4 justify-center py-1 pt-3 text-lg font-semibold sm:pl-3">
                        Retention After Registration
                    </h4>
                    <h5 class="flex justify-center mx-5 text-sm font-semibold sm:pl-3 mt-[-4px]">
                        (Days After Registration)
                    </h5>
                    <div class="flex w-full justify-end">
                        <select
                            class="mt-4 border border-secondary-100 rounded-lg select pl-2 w-fit"
                            on:change={(e) => {
                                selectedGraph = e.target.value;
                            }}
                        >
                            <option value="graph1">User Count</option>
                            <option value="graph2">Percentage</option>
                        </select>
                    </div>
                    <div class="h-fit w-full">
                        <p class="mx-2 text-left justify-left my-2 pb-1 text-sm sm:pl-3">
                            The percentage of users who return to a feature after their first use at specific intervals
                            (day 1, day 7, day 30). Retention rates measure user loyalty and the ability of the feature
                            to keep users engaged over time.
                        </p>
                    </div>
                </div>
                {#if selectedGraph === 'graph1' && retentionRateDaysData.length > 0}
                    <div class="h-96">
                        <RetentionGraphs
                            dataSource={retentionRateDaysData}
                            labels={retentionRateDaysLabels}
                            title="Retention User Count On Specific Days"
                        />
                    </div>
                {:else if selectedGraph === 'graph1'}
                    <div class="h-[400px] w-[400px] p-4">
                        <p class="justify-center items-center flex text-xl mt-28 leading-3">Data Not Available</p>
                    </div>
                {:else if selectedGraph === 'graph2'}
                    <div class="h-96">
                        <RetentionGraphs
                            dataSource={retentionRateDaysRate}
                            labels={retentionRateDaysLabels}
                            title="Retention User Count On Specific Days (%)"
                        />
                    </div>
                {/if}
            </div>
        </div>

        <div
            class="flex  overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
        >
            <div class="w-full">
                <div class="flex items-center text-center  flex-col">
                    <h4 class="mx-4 justify-center py-1 pt-3 text-lg font-semibold sm:pl-3">
                        Retention After Registration
                    </h4>
                    <h5 class="flex justify-start mx-5 text-sm font-semibold sm:pl-3 mt-[-4px]">
                        (Interval After Registration)
                    </h5>
                    <div class="flex w-full justify-end 0">
                     
                        <select
                            class="select pl-2 w-fit mt-4 border border-secondary-100 dark:border-surface-700 rounded-lg"
                            on:change={(e) => {
                                percentageGraph = e.target.value;
                            }}
                        >
                            <option value="graph1">User Count</option>
                            <option value="graph2">Percentage</option>
                        </select>
                    </div>
                    <div class="h-fit w-full">
                        <p class="mx-2 text-left justify-left my-2 pb-1 text-sm sm:pl-3">
                            The percentage of users who return to a feature after their first use at specific intervals
                            (0-1 days, 1-3 days, 3-7 days, etc). This is just another way to look at the retention on
                            specific days.
                        </p>
                    </div>
                </div>
                <!-- {#if retentionRateIntervalsData.length > 0}
                    <div class="h-96">
                        <RetentionGraphs
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
                        ></p>
                        <p
                            style="color:{fontColor}"
                            class="justify-center items-center flex text-xl mt-28 leading-3"
                        >
                            Data Not Available
                        </p>
                    </div>
                {/if} -->
                {#if percentageGraph === 'graph1' && retentionRateIntervalsData.length > 0}
                    <div class="h-96">
                        <RetentionGraphs
                            dataSource={retentionRateIntervalsData}
                            labels={retentionRateIntervalsLabels}
                            title="Retention User Count On Specific Intervals"
                        />
                    </div>
                {:else if percentageGraph === 'graph1'}
                    <div class=" p-4">
                        <p class="justify-center items-center flex text-xl mt-28 leading-3">Data Not Available</p>
                    </div>
                {:else if percentageGraph === 'graph2'}
                    <div class="h-96">
                        <RetentionGraphs
                            dataSource={retentionRateIntervalsRate}
                            labels={retentionRateIntervalsLabels}
                            title="Retention User Count On Specific Intervals (%)"
                        />
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
    <!-- <div class="mt-10 flex justify-center items-center h-full gap-10 w-full">
        <div
            class="flex flex-col overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
        >
            <div class="h-fit w-full">
                <div class="justify-left items-center flex py-3 text-lg sm:pl-3 flex-col">
                    {#if dropOffPointsData && dropOffPointsLabels}
                        <p class="font-semibold">DropOff Points</p>
                        <p class=" text-left justify-left my-2 pb-1 text-sm sm:pl-3">
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
                                <th class="py-2 px-4 border-b border-gray-200 font-semibold text-left">Action</th>
                                <th class="py-2 px-4 border-b border-gray-200 font-semibold text-left">Count</th>
                            </tr>
                        </thead>
                        <tbody class="justify-center">
                            {#each dropOffPointsData as value, index}
                                <tr>
                                    <td class="py-2 px-4 border-b border-gray-200">{dropOffPointsLabels[index]}</td>
                                    <td class="py-2 px-4 border-b border-gray-200">{value} </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                {:else}
                    <div class="h-fit w-full p-4">
                        <p class="justify-center items-center flex text-xl mt-28 leading-3">Data Not Available</p>
                    </div>
                {/if}
            </div>
        </div>
    </div> -->

    {#if feature === 'Medication'}
        <div class="flex justify-center h-full items-stretch gap-10 w-full mt-10">
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center flex-col">
                        <h4 class="mx-4 text-left justify-center py-1 pt-5 text-lg font-semibold sm:pl-3">
                            Medication Management
                        </h4>
                        <div class="h-fit w-full">
                            <p class="mx-2 text-left justify-left my-2 pb-1 text-sm sm:pl-3">
                              The medication adherence showing the percentage of scheduled doses taken on time, alongside the number and percentage of missed doses.
                            </p>
                        </div>
                        <!-- <Doughnut
                    data = {medicationData}
                    labels = {medicationLabels}
                    title=''
                /> -->

                
                <div class="justify-center pb-6">
                    {#if medicationManagementdata}
                        <PieChart
                        data={medicationData}
                        labels={medicationLabels}
                        title=""
                    />
                    {:else}
                    <div class="h-96 w-full items-center pl-10 justify-center font-semibold">
                        Data not available
                    </div>
                    {/if}
                </div>
                      
                    </div>
                </div>
            </div>
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="justify-left items-center flex py-3 text-lg sm:pl-3 flex-col">
                        {#if dropOffPointsData && dropOffPointsLabels}
                            <p class="font-semibold">DropOff Points</p>
                            <p class="text-left justify-left my-2 pb-1 text-sm sm:pl-3">
                                Points in the user flow where users most frequently stop using a feature. Identifying
                                drop-off points helps in optimizing the user journey and addressing usability challenges
                                to improve feature completion rates.
                            </p>
                        {:else}
                            DropOff Points (%) (Data not available)
                        {/if}
                    </div>
                    {#if dropOffPointsData && dropOffPointsLabels}
                        <table
                            class="min-w-full mt-2 mb-10 rounded-lg border border-secondary-100 dark:border-surface-70"
                        >
                            <thead>
                                <tr>
                                    <th class="py-2 px-4 border-b border-gray-200 font-semibold text-left">Action</th>
                                    <th class="py-2 px-4 border-b border-gray-200 font-semibold text-left">Count</th>
                                </tr>
                            </thead>
                            <tbody class="justify-center">
                                {#each sortedData as { value, label }}
                                    <tr>
                                        <td class="py-2 px-4 border-b border-gray-200">{label}</td>
                                        <td class="py-2 px-4 border-b border-gray-200">{value}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    {:else}
                        <div class=" w-full p-4">
                            <p class="justify-center items-center flex text-xl mt-28 leading-3">Data Not Available</p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    {:else}
        <div class="mt-10 flex justify-center items-center h-full gap-10 w-full">
            <div
                class="flex flex-col overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="h-fit w-full">
                    <div class="justify-left items-center flex py-3 text-lg sm:pl-3 flex-col">
                        {#if dropOffPointsData && dropOffPointsLabels}
                            <p class="font-semibold">DropOff Points</p>
                            <p class="text-left justify-left my-2 pb-1 text-sm sm:pl-3">
                                Points in the user flow where users most frequently stop using a feature. Identifying
                                drop-off points helps in optimizing the user journey and addressing usability challenges
                                to improve feature completion rates.
                            </p>
                        {:else}
                            DropOff Points (%) (No Data available)
                        {/if}
                    </div>
                    {#if dropOffPointsData && dropOffPointsLabels}
                        <table
                            class="min-w-full mt-2 mb-10 rounded-lg border border-secondary-100 dark:border-surface-70"
                        >
                            <thead>
                                <tr>
                                    <th class="py-2 px-4 border-b border-gray-200 font-semibold text-left">Action</th>
                                    <th class="py-2 px-4 border-b border-gray-200 font-semibold text-left">Count</th>
                                </tr>
                            </thead>
                            <tbody class="justify-center">
                                {#each sortedData as { value, label }}
                                    <tr>
                                        <td class="py-2 px-4 border-b border-gray-200">{label}</td>
                                        <td class="py-2 px-4 border-b border-gray-200">{value}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    {:else}
                        <div class="h-fit w-full p-4">
                            <p class="justify-center items-center flex text-xl mt-28 leading-3">Data Not Available</p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</div>
