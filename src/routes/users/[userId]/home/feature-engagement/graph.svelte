<script lang="ts">
    import BarChart from '$lib/components/analytics/BarChart.svelte';
    import PieChart from '$lib/components/analytics/PieChart.svelte';
    import RetentionGraphs from '$lib/components/analytics/RetentionGraphs.svelte';
    import { Helper } from '$lib/utils/helper';

    /////////////////////////////////////////////////

    export let accessFrequencyData, accessFrequencyLabels;
    export let engagementRateData, engagementRateLabels;
    export let retentionRateDaysData, retentionRateDaysLabels, retentionRateDaysRate;
    export let retentionRateIntervalsData, retentionRateIntervalsLabels, retentionRateIntervalsRate;
    export let dropOffPointsData, dropOffPointsLabels;
    export let feature = undefined;
    export let medicationManagementdata;
    export let healthJourneyWiseTask;
    export let overallHealthJourneyTaskData ;
    export let patientTaskMetrics;
    export let vitalMetrics;
 
    let selectedGraph = 'graph1';
    let percentageGraph = 'graph1';
    let selectedPlanCode = 'Overall';
    let selectedTaskCategory = 'Overall';
    let selectedVitalName = 'Blood Pressure'
    let healthJourneyMetricsData = [];
    let taskCategoriesData = [];
    let vitalMetricsData = [];
    let hasMedicationManagementData = Object.keys(medicationManagementdata).length > 0;

    $: sortedData = dropOffPointsData
        .map((value, index) => ({ value, label: dropOffPointsLabels[index] }))
        .sort((a, b) => parseInt(b.value) - parseInt(a.value));

    let medicationLabels = ['Taken', 'Not Taken', 'Not Specified'];
    let medicationData = [
        medicationManagementdata?.medication_taken_count || 0,
        medicationManagementdata?.medication_missed_count || 0,
        medicationManagementdata?.medication_not_answered_count || 0
    ];

    let taskMetricsLabels = ['Completed', 'Not Completed'];
    let vitalLabels = ['Manual Entry Count', 'Device Entry Count'];
    let categorySpecificData = patientTaskMetrics?.CategorySpecific ?? [];
    let overallCompletedTasks = overallHealthJourneyTaskData?.health_journey_completed_task_count ?? 0;
    let overallNotCompletedTasks = (overallHealthJourneyTaskData?.health_journey_task_count ?? 0) - overallCompletedTasks;
    let overallCompletedTasksCategory = patientTaskMetrics?.Overall?.patient_completed_task_count ?? 0;
    let overallNotCompletedTasksCategory = (patientTaskMetrics?.Overall?.patient_task_count ?? 0) - overallCompletedTasksCategory;
    let planCodes = ['Overall', ...(healthJourneyWiseTask?.length ? new Set(healthJourneyWiseTask.map((item) => item.PlanCode)) : [])];
    let taskCategories = ['Overall', ...(patientTaskMetrics?.CategorySpecific?.length ? new Set(patientTaskMetrics.CategorySpecific.map((item) => item.task_category)) : [])];

    let vitalNames = vitalMetrics.map(item => item.vital_name);
    let standardizedVitalNames = vitalNames.map(name => Helper.standardizeVitalName(name));

    function getSelectedHealthJourneyData(planCode: string) {
        const taskData = healthJourneyWiseTask?.find((item) => item?.PlanCode === planCode) ?? {};
        const completedCount = taskData?.careplan_completed_task_count ?? 0;
        const totalTaskCount = taskData?.careplan_task_count ?? 0;

        return {
            completed: completedCount,
            notCompleted: Math.max(totalTaskCount - completedCount, 0)
        };
    }

    function getSelectedTaskCategoryData(taskCategory: string) {
        const taskData = categorySpecificData?.find((item) => item?.task_category === taskCategory) ?? {};
        const completedCount = taskData?.patient_completed_task_count ?? 0;
        const totalTaskCount = taskData?.task_count ?? 0;

        return {
            completed: completedCount,
            notCompleted: Math.max(totalTaskCount - completedCount, 0)
        };
    }

    function getSelectedVitalsData(vitalName: string) {
        let standardizedVitalName = Helper.standardizeVitalName(vitalName);
        if (!vitalMetrics || !Array.isArray(vitalMetrics)) {
            return {
                ManualEntryCount: 0,
                DeviceEntryCount: 0
            };
        }
        const vitalData = vitalMetrics?.find((item) => {
            const itemVitalName = item.vital_name ?? ''; 
            return Helper.standardizeVitalName(itemVitalName) === standardizedVitalName;
        }) ?? {};
        const manualEntryCount = vitalData.manual_entry_add_event_count ?? 0;
        const deviceEntryCount = vitalData.device_entry_add_event_count ?? 0;
        return {
            ManualEntryCount: manualEntryCount,
            DeviceEntryCount: deviceEntryCount
        };
    }

    function updateHealthJourneyData() {
        let stats;
        if (selectedPlanCode === 'Overall') {
            stats = {
                completed: overallCompletedTasks ?? 0,
                notCompleted: overallNotCompletedTasks ?? 0
            };
        } else {
            stats = getSelectedHealthJourneyData(selectedPlanCode);
        }

        healthJourneyMetricsData = [stats.completed, stats.notCompleted];
        console.log('Health Journey Metrics Data', healthJourneyMetricsData);
    }

    function updateTaskCategoryData() {
        let stats;
        if (selectedTaskCategory === 'Overall') {
            stats = {
                completed: overallCompletedTasksCategory ?? 0,
                notCompleted: overallNotCompletedTasksCategory ?? 0
            };
        } else {
            stats = getSelectedTaskCategoryData(selectedTaskCategory);
        }

        taskCategoriesData = [stats.completed, stats.notCompleted];
        console.log('Task Category Metrics Data', taskCategoriesData);
    }

    function updateVitalsData() {
        let stats;
        stats = getSelectedVitalsData(selectedVitalName);
        vitalMetricsData = [stats.ManualEntryCount, stats.DeviceEntryCount];
    }

    $: updateHealthJourneyData();
    $: updateTaskCategoryData();
    $: updateVitalsData();

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
    <div class="flex justify-center h-full items-stretch gap-10 w-full">
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
                    <div class="h-fit w-full">
                        <p class="mx-2 text-left justify-left my-2 pb-1 text-sm sm:pl-3">
                            The percentage of users who return to a feature after their first use at specific intervals
                            (day 1, day 7, day 30). Retention rates measure user loyalty and the ability of the feature
                            to keep users engaged over time.
                        </p>
                    </div>
                    <div class="flex w-full justify-end">
                        <select
                            class="select pl-2 w-fit border border-secondary-100 dark:border-surface-700 rounded-lg"
                            on:change={(e) => {
                                selectedGraph = e.target.value;
                            }}
                        >
                            <option value="graph1">User Count</option>
                            <option value="graph2">Percentage</option>
                        </select>
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
            class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
        >
            <div class="w-full">
                <div class="flex items-center text-center flex-col">
                    <h4 class="mx-4 justify-center py-1 pt-3 text-lg font-semibold sm:pl-3">
                        Retention After Registration
                    </h4>
                    <h5 class="flex justify-start mx-5 text-sm font-semibold sm:pl-3 mt-[-4px]">
                        (Interval After Registration)
                    </h5>
                    <div class="h-fit w-full">
                        <p class="mx-2 text-left justify-left my-2 pb-1 text-sm sm:pl-3">
                            The percentage of users who return to a feature after their first use at specific intervals
                            (0-1 days, 1-3 days, 3-7 days, etc). This is just another way to look at the retention on
                            specific days.
                        </p>
                    </div>
                    <div class="flex w-full justify-end 0">
                        <select
                            class="select pl-2 w-fit border border-secondary-100 dark:border-surface-700 rounded-lg"
                            on:change={(e) => {
                                percentageGraph = e.target.value;
                            }}
                        >
                            <option value="graph1">User Count</option>
                            <option value="graph2">Percentage</option>
                        </select>
                    </div>
                </div>
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
    {#if feature === 'Medication'}
        <div class="flex justify-center h-full items-stretch gap-10 w-full mt-10">
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center flex-col">
                        <h4 class="mx-4 justify-center py-1 pt-3 text-lg font-semibold sm:pl-3">
                            Medication Management
                        </h4>
                        <div class="h-fit w-full">
                            <p class="mx-2 text-left justify-left my-2 pb-1 text-sm sm:pl-3">
                                The medication adherence showing the percentage of scheduled doses taken on time,
                                alongside the number and percentage of missed doses.
                            </p>
                        </div>
                            <div class="justify-center pb-6">
                                {#if hasMedicationManagementData}
                                    <PieChart
                                    data={medicationData}
                                    labels={medicationLabels}
                                    title=""
                                    showLegendData={true}
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
                class="flex overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
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
    {:else if feature === 'Careplan'}
        <div class="flex justify-center h-full items-stretch gap-10 w-full mt-10">
            <div
                class="flex overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center flex-col">
                        <h4 class="mx-4 justify-center py-1 pt-3 text-lg font-semibold sm:pl-3">
                            Health Journey Task Metrics
                        </h4>
                        <div class="h-fit w-full">
                            <p class="mx-2 text-left justify-left my-2 pb-1 text-sm sm:pl-3">
                                This shows the completion rate of health journey tasks, comparing completed tasks and
                                created tasks for both overall and individual care plans.
                            </p>
                        </div>
                        {#if healthJourneyWiseTask?.length > 0 && planCodes?.length > 0}
                            <div class="flex w-full justify-end 0">
                            
                                <select
                                    class="select pl-2 mb-2 w-fit border border-secondary-100 dark:border-surface-700 rounded-lg"
                                    bind:value={selectedPlanCode}
                                    on:change={updateHealthJourneyData}
                                >
                                    {#each planCodes as planCode}
                                        <option value={planCode}>{planCode}</option>
                                    {/each}
                                </select>
                            </div>
                            <div class="justify-center pb-6">
                                <!-- {#if healthJourneyMetricsData.length > 0} -->
                                    <PieChart
                                        data={healthJourneyMetricsData}
                                        labels={taskMetricsLabels}
                                        title=""
                                        showLegendData={true}
                                    />
                            
                            </div>
                        {:else}
                            <div class="h-96 w-full flex pl-10 justify-center font-semibold">
                                Data not available
                            </div>
                        {/if}
                    </div>
                   
                </div>
            </div>
            <div
                class="flex overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
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
    {:else if feature === 'User Tasks'}
        <div class="flex justify-center h-full items-stretch gap-10 w-full mt-10">
            <div
                class="flex overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center flex-col">
                        <h4 class="mx-4 justify-center py-1 pt-3 text-lg font-semibold sm:pl-3">
                            Patient Task Metrics
                        </h4>
                        <div class="h-fit w-full">
                            <p class="mx-2 text-left justify-left my-2 pb-1 text-sm sm:pl-3">
                                This shows the completion rate of patient tasks, comparing completed tasks and
                                created tasks for both overall and individual task category.
                            </p>
                        </div>
                        {#if categorySpecificData?.length > 0 && taskCategories?.length > 0}
                            <div class="flex w-full justify-end 0">
                                <select
                                    class="select pl-2 mb-2 w-fit border border-secondary-100 dark:border-surface-700 rounded-lg"
                                    bind:value={selectedTaskCategory}
                                    on:change={updateTaskCategoryData}
                                >
                                    {#each taskCategories as taskCategory}
                                        <option value={taskCategory}>{taskCategory}</option>
                                    {/each}
                                </select>
                            </div>
                            <div class="justify-center pb-6">
                                {#if taskCategoriesData.length > 0}
                                    <PieChart
                                        data={taskCategoriesData}
                                        labels={taskMetricsLabels}
                                        title=""
                                        showLegendData={true}
                                    />
                                {/if}
                            </div>
                        {:else}
                            <div class="h-96 w-full flex pl-10 justify-center font-semibold">
                                Data not available
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
            <div
                class="flex overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
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
    {:else if feature === 'Vitals'}
        <div class="flex justify-center h-full items-stretch gap-10 w-full mt-10">
            <div
                class="flex overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center flex-col">
                        <h4 class="mx-4 justify-center py-1 pt-3 text-lg font-semibold sm:pl-3">
                           Vitals Task Metrics
                        </h4>
                        <div class="h-fit w-full">
                            <p class="mx-2 text-left justify-left my-2 pb-1 text-sm sm:pl-3">
                                This shows the addition rate of vital metrics, comparing the total events logged for each vital metric and their breakdown into manual entries and device-based entries.
                            </p>
                        </div>
                        {#if vitalMetricsData?.length > 0 && vitalNames?.length > 0}
                            <div class="flex w-full justify-end 0">
                            
                                <select
                                    class="select pl-2 mb-2 w-fit border border-secondary-100 dark:border-surface-700 rounded-lg"
                                    bind:value={selectedVitalName}
                                    on:change={updateVitalsData}
                                >
                                    {#each standardizedVitalNames as vitalName}
                                        <option value={vitalName}>{vitalName}</option>
                                    {/each}
                                </select>
                            </div>
                            <div class="justify-center pb-6">
                                <PieChart
                                    data={vitalMetricsData}
                                    labels={vitalLabels}
                                    title=""
                                    showLegendData={true}
                                />
                            
                            </div>
                        {:else}
                            <div class="h-96 w-full flex pl-10 justify-center font-semibold">
                                Data not available
                            </div>
                        {/if}
                    </div>
                   
                </div>
            </div>
            <div
                class="flex overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
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
