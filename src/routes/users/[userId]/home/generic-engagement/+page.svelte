<script lang="ts">
    import GenericChart from './GenericChart.svelte';
    import { onMount } from 'svelte';
    import { formatMonth, formatMonthLabel, formatDateToDDMMYYYY } from '../analytics-overview/components/functions';

    ////////////////////////////////////////////////////////////////////////

    export let data;
    let dailyActiveUsersData, dailyActiveUsersLabels;
    let monthlyActiveUsersData, monthlyActiveUsersLabels;
    let weeklyActiveUsersData, weeklyActiveUsersLabels;
    let retentionOnDaysData, retentionOnDaysLabels, retentionOnDaysRate;
    let retentionOnIntervalData, retentionOnIntervalLabels, retentionOnIntervalRate;

    if (data.genericMetrics) {
        if (data.genericMetrics.DailyActiveUsers) {
            dailyActiveUsersData = data.genericMetrics.DailyActiveUsers.map((x) => x.daily_active_users);
            dailyActiveUsersLabels = data.genericMetrics.DailyActiveUsers.map((x) =>
                formatDateToDDMMYYYY(x.activity_date)
            );
        }

        if (data.genericMetrics.WeeklyActiveUsers) {
            weeklyActiveUsersData = data.genericMetrics.WeeklyActiveUsers.map((x) => x.weekly_active_users);
            weeklyActiveUsersLabels = data.genericMetrics.WeeklyActiveUsers.map(
                (x) => `${formatDateToDDMMYYYY(x.week_start_date)}`
            );
        }
        if (data.genericMetrics.MonthlyActiveUsers) {
            monthlyActiveUsersData = data.genericMetrics.MonthlyActiveUsers.map(
                (x) => x.monthly_active_users
            );
            monthlyActiveUsersLabels = data.genericMetrics.MonthlyActiveUsers.map((x) =>
                formatMonth(x.activity_month)
            );
        }

        if (data.genericMetrics.RetentionRateOnSpecificDays.retention_on_specific_days) {
            retentionOnDaysData =
                data.genericMetrics.RetentionRateOnSpecificDays.retention_on_specific_days.map(
                    (x) => x.returning_users
                );
            retentionOnDaysLabels =
                data.genericMetrics.RetentionRateOnSpecificDays.retention_on_specific_days.map(
                    (x) => `${x.day}`
                );
            retentionOnDaysRate =
                data.genericMetrics.RetentionRateOnSpecificDays.retention_on_specific_days.map(
                    (x) => x.retention_rate
                );
        }

        if (data.genericMetrics.RetentionRateInSpecificIntervals.retention_in_specific_interval) {
            retentionOnIntervalData =
                data.genericMetrics.RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                    (x) => x.returning_users
                );
            retentionOnIntervalLabels =
                data.genericMetrics.RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                    (x) => x.interval
                );
            retentionOnIntervalRate =
                data.genericMetrics.RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                    (x) => x.retention_rate
                );
        }
    }

    const mostFiredEvents = data.genericMetrics.MostFiredEvents;
    const mostFiredEventsByEventCategory = data.genericMetrics.MostFiredEventsByEventCategory;

    let selectedGraph = 'daily';

    let processedData = [];
    let filteredData = [];
    let years = [];
    let selectedYear = '';
    const tableHeaders = ['Month', 'Most Used Feature', 'Usage Count', 'Total Usage', 'Percentage'];

    onMount(() => {
        // Process the data
        let monthlyData = {};
        data.genericMetrics.MostCommonlyVisitedFeatures.forEach((item) => {
            if (!monthlyData[item.month]) {
                monthlyData[item.month] = { totalUsage: 0, features: {} };
            }
            monthlyData[item.month].totalUsage += item.feature_usage_count;
            monthlyData[item.month].features[item.feature] = item.feature_usage_count;
        });

        processedData = Object.entries(monthlyData).map(([month, data]) => {
            let mostUsedFeature = Object.entries(data.features).reduce((a, b) => (b[1] > a[1] ? b : a));
            return {
                month,
                mostUsedFeature: mostUsedFeature[0],
                usageCount: mostUsedFeature[1],
                totalUsage: data.totalUsage,
                percentage: ((mostUsedFeature[1] / data.totalUsage) * 100).toFixed(2) + '%',
                year: month.split('-')[0] // Extract the year
            };
        });

        processedData.sort((a, b) => new Date(a.month) - new Date(b.month));

        years = [...new Set(processedData.map((data) => data.year))];

        selectedYear = years[0];
    });

    $: filteredData = processedData.filter((item) => item.year === selectedYear);
</script>

<div class="flex flex-col justify-center">

    <div class="grid grid-cols-1 justify-center rounded-lg py-8 gap-8">
        <div class="flex justify-center items-center h-full gap-10 w-full">
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-full"
            >
                <div class="w-full">
                    <div class="flex items-center flex-col">
                        <h4 class="mr-4 text-left justify-center pt-3 pb-1 ml-4 text-lg font-semibold sm:pl-3">
                            {selectedGraph === 'daily'
                                ? 'Daily Active Users'
                                : selectedGraph === 'weekly'
                                  ? 'Weekly Active Users'
                                  : 'Monthly Active Users'}
                        </h4>
                        <p class="mr-4 text-left justify-center ml-4 pb-1 text-sm sm:pl-3">
                            {selectedGraph === 'daily'
                                ? 'Total number of unique users who interact with the platform on a given day.'
                                : selectedGraph === 'weekly'
                                  ? 'Total number of unique users who interact with the platform during a week.'
                                  : 'Total number of unique users who interact with the platform during a month.'}
                        </p>
                    </div>
                    <div class="flex w-full justify-end">
                        <select
                            class="select w-fit px-10 mb-4 border border-secondary-100 dark:border-surface-700 rounded-lg"
                            on:change={(e) => {
                                selectedGraph = e.target.value;
                            }}
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                    {#if selectedGraph === 'daily' && dailyActiveUsersData.length > 0}
                        <GenericChart
                            type="bar"
                            data={dailyActiveUsersData}
                            labels={dailyActiveUsersLabels}
                            title="Daily Active Users"
                        />
                    {:else if selectedGraph === 'daily'}
                        <div class="h-[400px] w-[400px] p-4">
                            <p class="justify-left items-center flex text-2xl"></p>
                            <p class="justify-center items-center flex text-xl mt-28 leading-3">Data Not Available</p>
                        </div>
                    {/if}
                    {#if selectedGraph === 'weekly' && weeklyActiveUsersData.length > 0}
                        <GenericChart
                            type="bar"
                            data={weeklyActiveUsersData}
                            labels={weeklyActiveUsersLabels}
                            title="Weekly Active Users"
                        />
                    {:else if selectedGraph === 'weekly'}
                        <div class="h-[400px] w-[400px] p-4">
                            <p class="justify-left items-center flex text-2xl"></p>
                            <p class="justify-center items-center flex text-xl mt-28 leading-3">Data Not Available</p>
                        </div>
                    {/if}
                    {#if selectedGraph === 'monthly' && monthlyActiveUsersData.length > 0}
                        <GenericChart
                            type="bar"
                            data={monthlyActiveUsersData}
                            labels={monthlyActiveUsersLabels}
                            title="Monthly Active Users"
                        />
                    {:else if selectedGraph === 'monthly'}
                        <div class="h-[400px] w-[400px] p-4">
                            <p class="justify-left items-center flex text-2xl"></p>
                            <p class="justify-center items-center flex text-xl mt-28 leading-3">Data Not Available</p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<div class="flex justify-center items-center h-full min-w-full">
    <div class="min-w-full flex overflow-x-auto overflow-hidden justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4">
        <div class="w-full">
            <div class="relative flex items-center flex-col">
                <h4 class="mt-3 text-center p-3 text-lg font-semibold sm:pl-3 ">
                    Commonly Visited Features
                </h4>
                <div class="absolute right-4 top-3 flex items-center mt-8 ">
                    <label for="year-select" class="mr-2">Year: </label>
                    <select
                        id="year-select"
                        bind:value={selectedYear}
                        class="select border border-secondary-100 dark:border-surface-700 rounded"
                    >
                        {#each years as year}
                            <option value={year}>{year}</option>
                        {/each}
                    </select>
                </div>
            </div>
            <div class="px-2 sm:px-6 lg:px-8 col-span-2 items-center justify-center my-5">
                <div class="flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-4">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full border border-secondary-100 dark:border-surface-700 rounded-lg">
                                <thead>
                                    <tr class="border border-secondary-100 dark:border-surface-700">
                                        {#each tableHeaders as header}
                                            <th
                                                class="py-3 text-left text-sm font-semibold sm:pl-3 border border-secondary-100 dark:border-surface-700"
                                            >
                                                {header}
                                            </th>
                                        {/each}
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each filteredData as row}
                                        <tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700">
                                            <td class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700">
                                                {formatMonthLabel(row.month)}
                                            </td>
                                            <td class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700">
                                                {row.mostUsedFeature}
                                            </td>
                                            <td class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700">
                                                {row.usageCount}
                                            </td>
                                            <td class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700">
                                                {row.totalUsage}
                                            </td>
                                            <td class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700">
                                                {row.percentage}
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="flex justify-center items-center h-full min-w-full mt-10">
    <div
        class="min-w-full flex overflow-x-auto overflow-hidden justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4"
    >
        <div class="w-full">
            <div class="flex items-center flex-col">
                <h4 class="mr-4 mt-3 text-left justify-center py-3 ml-4 text-lg font-semibold sm:pl-3">
                    Most Fired Events
                </h4>
            </div>
            <div class="px-2 sm:px-6 lg:px-8 col-span-2 items-center justify-center">
                <div class="flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-4">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full border border-secondary-100 dark:border-surface-700 rounded-lg">
                                <thead>
                                    <tr class="border border-secondary-100 dark:border-surface-700">
                                        <th class="py-3 text-left text-sm font-semibold sm:pl-3">Event Name</th>
                                        <th class="py-3 text-left text-sm font-semibold sm:pl-3">Event Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each mostFiredEvents as event}
                                        <tr
                                            class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700"
                                        >
                                            <td
                                                class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                            >
                                                {event.EventName}
                                            </td>
                                            <td
                                                class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                            >
                                                {event.event_count}
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="flex justify-center items-center h-full min-w-full mt-10">
    <div
        class="min-w-full flex overflow-x-auto overflow-hidden justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4"
    >
        <div class="w-full">
            <div class="flex items-center flex-col">
                <h4 class="mr-4 mt-3 text-left justify-center py-3 ml-4 text-lg font-semibold sm:pl-3">
                    Most Fired Events by Category
                </h4>
            </div>
            <div class="px-2 sm:px-6 lg:px-8 col-span-2 items-center justify-center">
                <div class="flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-4">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full border border-secondary-100 dark:border-surface-700 rounded-lg">
                                <thead>
                                    <tr class="border border-secondary-100 dark:border-surface-700">
                                        <th
                                            class="py-3 text-left text-sm font-semibold sm:pl-3 border border-secondary-100 dark:border-surface-700"
                                            >Event Name</th
                                        >
                                        <th
                                            class="py-3 text-left text-sm font-semibold sm:pl-3 border border-secondary-100 dark:border-surface-700"
                                            >Event Category</th
                                        >
                                        <th
                                            class="py-3 text-left text-sm font-semibold sm:pl-3 border border-secondary-100 dark:border-surface-700"
                                            >Event Count</th
                                        >
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each mostFiredEventsByEventCategory as event}
                                        <tr
                                            class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700"
                                        >
                                            <td
                                                class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                            >
                                                {event.EventCategory}
                                            </td>
                                            <td
                                                class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                            >
                                                {event.EventName}
                                            </td>
                                            <td
                                                class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                            >
                                                {event.event_count}
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
