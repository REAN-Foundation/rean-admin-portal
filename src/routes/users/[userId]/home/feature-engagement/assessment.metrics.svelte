<script lang="ts">
    import { Helper } from '$lib/utils/helper';

    ///////////////////////////////////////////////////////////////////////////

    export let assessmentMetrics;
    let assessmentQueryResponseDetails = assessmentMetrics?.AssessmentQueryResponseDetails ?? [];
    let careplanWiseAssessmentCompletionCount = assessmentMetrics?.CareplanWiseAssessmentCompletionCount ?? [];
    let customAssessmentCompletionCount = assessmentMetrics?.CustomAssessmentCompletionCount ?? [];
    let selectedAssessmentData = [];
    let selectedCareplanAssessmentData = [];
    const assessmentTableHeaders = ['Question', 'Response Type', 'Response Text', 'Response Count'];
    const careplanTableHeaders = ['Completed Count', 'Inprogress Count'];
    let selectedCode = 'Careplan';
    const uniqueTitles = [...new Set(assessmentQueryResponseDetails.map((item) => item.assessment_template_title))];
    let selectedAssessment = uniqueTitles.length > 0 ? uniqueTitles[0] : '';

    function mergeAssessmentCompletionCounts(careplanData, customData) {
        const customEntries = customData.map((item) => ({
            ...item,
            care_plan_code: item.action_type
        }));

        return [...careplanData, ...customEntries];
    }

    const mergedData = mergeAssessmentCompletionCounts(
        careplanWiseAssessmentCompletionCount,
        customAssessmentCompletionCount
    );

    const uniqueCodes = [...new Set(mergedData.map((item) => item.care_plan_code))];

    function getSelectedAssessmentData() {
        if (selectedAssessment) {
            selectedAssessmentData = assessmentQueryResponseDetails.filter(
                (item) => item.assessment_template_title === selectedAssessment
            );
        }
    }

    function getSelectedCareplanAssessmentData() {
        if (selectedCode) {
            selectedCareplanAssessmentData = mergedData.filter((item) => item.care_plan_code === selectedCode);
        }
    }

    getSelectedCareplanAssessmentData();
    getSelectedAssessmentData();
</script>

<div class="flex justify-center items-center h-full min-w-full py-10">
    <div
        class="min-w-full flex overflow-x-auto overflow-hidden justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4"
    >
        <div class="w-full">
            <div class="flex flex-col items-center justify-between py-4">
                <h4 class="text-lg font-semibold text-center flex-grow">Careplan Metrics</h4>

                <div class="flex items-center ml-auto">
                    <label
                        for="select-Plan"
                        class="mr-2">Select</label
                    >
                    <select
                        id="select-Plan"
                        bind:value={selectedCode}
                        on:change={getSelectedCareplanAssessmentData}
                        class="select border border-secondary-100 dark:border-surface-700 rounded mr-8"
                    >
                        {#each uniqueCodes as code}
                            <option value={code}>{code}</option>
                        {/each}
                    </select>
                </div>
            </div>
            <div class="sm:px-6 lg:px-8 col-span-2 items-center justify-center pb-8">
                <table class="min-w-full border border-secondary-100 dark:border-surface-700 rounded-lg">
                    <thead>
                        <tr class="border border-secondary-100 dark:border-surface-700">
                            {#each careplanTableHeaders as header}
                                <th
                                    class="py-3 text-left text-sm font-semibold sm:pl-3 border border-secondary-100 dark:border-surface-700"
                                >
                                    {header}
                                </th>
                            {/each}
                        </tr>
                    </thead>
                    <tbody>
                        {#if selectedCareplanAssessmentData.length > 0}
                            {#each selectedCareplanAssessmentData as row}
                                <tr
                                    class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700"
                                >
                                    <td
                                        class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                    >
                                        {row.completed_assessment_count}
                                    </td>
                                    <td
                                        class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                    >
                                        {row.in_progress_assessment_count}
                                    </td>
                                </tr>
                            {/each}
                        {:else}
                            <tr>
                                <td
                                    colspan={assessmentTableHeaders.length}
                                    class="text-center py-4 text-sm text-gray-500"
                                >
                                    No data available for the selected title.
                                </td>
                            </tr>
                        {/if}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div class="flex justify-center items-center h-full min-w-full">
    <div
        class="min-w-full flex overflow-x-auto overflow-hidden justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4"
    >
        <div class="w-full">
            <div class="flex flex-col items-center justify-between py-4">
                <h4 class="text-lg font-semibold text-center flex-grow">Assessment Metrics</h4>

                <div class="flex items-center ml-auto mt-3">
                    <label
                        for="select-Plan"
                        class="mr-2">Select Assessment</label
                    >
                    <select
                        id="select-Plan"
                        bind:value={selectedAssessment}
                        on:change={getSelectedAssessmentData}
                        class="select border border-secondary-100 dark:border-surface-700 rounded mr-8"
                    >
                        {#each uniqueTitles as title}
                            <option value={title}>{title}</option>
                        {/each}
                    </select>
                </div>
            </div>
            <div class="px-2 sm:px-6 lg:px-8 col-span-2 items-center justify-center pb-8">
                <div class="flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-4">
                        <div class="inline-block min-w-full align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full border border-secondary-100 dark:border-surface-700 rounded-lg">
                                <thead>
                                    <tr class="border border-secondary-100 dark:border-surface-700">
                                        {#each assessmentTableHeaders as header}
                                            <th
                                                class="py-3 text-left text-sm font-semibold sm:pl-3 border border-secondary-100 dark:border-surface-700"
                                            >
                                                {header}
                                            </th>
                                        {/each}
                                    </tr>
                                </thead>
                                <tbody>
                                    {#if selectedAssessmentData.length > 0}
                                        {#each selectedAssessmentData as row}
                                            <tr
                                                class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700"
                                            >
                                                <td
                                                    class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                                >
                                                    <!-- {row.node_title} -->
                                                    {Helper.truncateText(row.node_title, 50)}
                                                </td>
                                                <td
                                                    class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                                >
                                                    {row.query_response_type}
                                                </td>
                                                <td
                                                    class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                                >
                                                    {Helper.truncateText(row.response_option_text, 40)}
                                                    <!-- {row.response_option_text} -->
                                                </td>
                                                <td
                                                    class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                                >
                                                    {row.response_count}
                                                </td>
                                            </tr>
                                        {/each}
                                    {:else}
                                        <tr>
                                            <td
                                                colspan={assessmentTableHeaders.length}
                                                class="text-center py-4 text-sm text-gray-500"
                                            >
                                                No data available for the selected title.
                                            </td>
                                        </tr>
                                    {/if}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
