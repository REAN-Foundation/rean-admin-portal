<script lang="ts">
    import BarChart from '../analytics-overview/components/BarChart.svelte';
    import Line from '..//analytics-overview/components/Line.svelte';
    import { getTickColorLight, getTickColorDark } from '$lib/themes/theme.selector';
    import RetentionGraphs from '..//analytics-overview/components/RetentionGraphs.svelte';
    import GenericChart from './GenericChart.svelte';
    import { onMount } from 'svelte';
    ////////////////////////////////////////////////////////////////////////
    export let data;

    const fontColor = '#661B26';

    let dailyActiveUsersData, dailyActiveUsersLabels;
    let monthlyActiveUsersData, monthlyActiveUsersLabels;
    let weeklyActiveUsersData, weeklyActiveUsersLabels;
    let retentionOnDaysData, retentionOnDaysLabels, retentionOnDaysRate;
    let retentionOnIntervalData, retentionOnIntervalLabels, retentionOnIntervalRate;
    // let commonlyVisitedFeatureData, commonlyVisitedFeatureLabels;

    let mostVisitedFeatureMedicationData: number[] = [];
    let mostVisitedFeatureLoginData: number[] = [];
    let commonlyVisitedFeatureLabels: string[];

    function formatMonthLabel(month: string): string {
        const date = new Date(month + '-01');
        return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    }
    function formatDateToDDMMYYYY(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    if (data.statistics.GenericMetrics) {
        if (data.statistics.GenericMetrics.DailyActiveUsers) {
            dailyActiveUsersData = data.statistics.GenericMetrics.DailyActiveUsers.map((x) => x.daily_active_users);
            dailyActiveUsersLabels = data.statistics.GenericMetrics.DailyActiveUsers.map((x) =>
                formatDateToDDMMYYYY(x.activity_date)
            );
        }

        if (data.statistics.GenericMetrics.WeeklyActiveUsers) {
            weeklyActiveUsersData = data.statistics.GenericMetrics.WeeklyActiveUsers.map((x) => x.weekly_active_users);
            weeklyActiveUsersLabels = data.statistics.GenericMetrics.WeeklyActiveUsers.map(
                (x) => `${formatDateToDDMMYYYY(x.week_start_date)}`
            );
        }
        if (data.statistics.GenericMetrics.MonthlyActiveUsers) {
            monthlyActiveUsersData = data.statistics.GenericMetrics.MonthlyActiveUsers.map(
                (x) => x.monthly_active_users
            );
            monthlyActiveUsersLabels = data.statistics.GenericMetrics.MonthlyActiveUsers.map((x) =>
                formatMonthLabel(x.activity_month)
            );
        }

        if (data.statistics.GenericMetrics.RetentionRateOnSpecificDays.retention_on_specific_days) {
            retentionOnDaysData =
                data.statistics.GenericMetrics.RetentionRateOnSpecificDays.retention_on_specific_days.map(
                    (x) => x.returning_users
                );
            retentionOnDaysLabels =
                data.statistics.GenericMetrics.RetentionRateOnSpecificDays.retention_on_specific_days.map(
                    (x) => `${x.day}`
                );
            retentionOnDaysRate =
                data.statistics.GenericMetrics.RetentionRateOnSpecificDays.retention_on_specific_days.map(
                    (x) => x.retention_rate
                );
        }

        if (data.statistics.GenericMetrics.RetentionRateInSpecificIntervals.retention_in_specific_interval) {
            retentionOnIntervalData =
                data.statistics.GenericMetrics.RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                    (x) => x.returning_users
                );
            retentionOnIntervalLabels =
                data.statistics.GenericMetrics.RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                    (x) => x.interval
                );
            retentionOnIntervalRate =
                data.statistics.GenericMetrics.RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                    (x) => x.retention_rate
                );
        }

        // commonlyVisitedFeatureData = data.statistics.GenericMetrics.MostCommonlyVisitedFeatures.map((x) => x.feature_usage_count);
        // commonlyVisitedFeatureLabels = data.statistics.GenericMetrics.MostCommonlyVisitedFeatures.map((x) => formatMonthLabel(x.month));

        if (data.statistics.GenericMetrics.MostCommonlyVisitedFeatures) {
            commonlyVisitedFeatureLabels = data.statistics.GenericMetrics.MostCommonlyVisitedFeatures.map((x) =>
                formatMonthLabel(x.month)
            );

            data.statistics.GenericMetrics.MostCommonlyVisitedFeatures.forEach((feature) => {
                if (feature.feature.toLowerCase() === 'medication') {
                    mostVisitedFeatureMedicationData.push(feature.feature_usage_count);
                } else if (feature.feature.toLowerCase() === 'login') {
                    mostVisitedFeatureLoginData.push(feature.feature_usage_count);
                }
            });
        }
    }

    let tableHeaders = ['Month', 'Most Used Feature', 'Usage Count', 'Total Usage', 'Percentage'];
    let processedData = [];

    onMount(() => {
        // Process the data
        let monthlyData = {};
        data.statistics.GenericMetrics.MostCommonlyVisitedFeatures.forEach((item) => {
            if (!monthlyData[item.month]) {
                monthlyData[item.month] = { totalUsage: 0, features: {} };
            }
            monthlyData[item.month].totalUsage += item.feature_usage_count;
            monthlyData[item.month].features[item.feature] = item.feature_usage_count;
        });

        // Find the most used feature for each month and calculate percentages
        processedData = Object.entries(monthlyData).map(([month, data]) => {
            let mostUsedFeature = Object.entries(data.features).reduce((a, b) => (b[1] > a[1] ? b : a));
            return {
                month,
                mostUsedFeature: mostUsedFeature[0],
                usageCount: mostUsedFeature[1],
                totalUsage: data.totalUsage,
                percentage: ((mostUsedFeature[1] / data.totalUsage) * 100).toFixed(2) + '%'
            };
        });

        // Sort by month
        processedData.sort((a, b) => new Date(a.month) - new Date(b.month));
    });

        // Function to format the date
        function formatDate(utcDate: string): string {
        const date = new Date(utcDate);
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric'
        }).format(date);
    }
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
                            Daily Active Users
                        </h4>
                        <p class="mr-4 text-left justify-center ml-4 pb-1 text-sm sm:pl-3">
                            Total number of unique users who interact with the platform on a given day.
                        </p>
                    </div>
                    <GenericChart
                        type="bar"
                        data={dailyActiveUsersData}
                        labels={dailyActiveUsersLabels}
                        title="Daily Active Users"
                        {fontColor}
                    />
                </div>
            </div>
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center flex-col">
                        <h4 class="mr-4 text-left justify-center pt-3 pb-1 ml-4 text-lg font-semibold sm:pl-3">
                            Weekly Active Users
                        </h4>
                        <p class="mr-4 text-left justify-center ml-4 pb-1 text-sm sm:pl-3">
                            Total number of unique users who interact with the platform during a week.
                        </p>
                    </div>
                    <GenericChart
                        type="bar"
                        data={weeklyActiveUsersData}
                        labels={weeklyActiveUsersLabels}
                        title="Weekly Active Users"
                        {fontColor}
                    />
                </div>
            </div>
        </div>

        <div class="flex justify-center items-center h-full gap-10 w-full">
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center flex-col">
                        <h4 class="mr-4 text-left justify-center pt-3 pb-1 ml-4 text-lg font-semibold sm:pl-3">
                            Monthly Active Users
                        </h4>
                        <p class="mr-4 text-left justify-center ml-4 pb-1 text-sm sm:pl-3">
                            Total number of unique users who interact with the platform during a month.
                        </p>
                    </div>
                    <GenericChart
                        type="bar"
                        data={monthlyActiveUsersData}
                        labels={monthlyActiveUsersLabels}
                        title="Monthly Active Users"
                        {fontColor}
                    />
                </div>
            </div>
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center flex-col">
                        <h4 class="mr-4 text-left justify-center pt-3 pb-1 ml-4 text-lg font-semibold sm:pl-3">
                            Retention On Specific Days
                        </h4>
                        <p class="mr-4 text-left justify-center ml-4 pb-1 text-sm sm:pl-3">
                            Total number of unique users who interact with the platform during a month.
                        </p>
                    </div>
                    <GenericChart
                        type="retention"
                        data={retentionOnDaysData}
                        labels={retentionOnDaysLabels}
                        title="Retention On Specific Days"
                        rate={retentionOnDaysRate}
                        {fontColor}
                    />
                </div>
            </div>
        </div>

        <div class="flex justify-left items-left h-full gap-10 w-full">
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center flex-col">
                        <h4 class="mr-4 text-left justify-center pt-3 pb-1 ml-4 text-lg font-semibold sm:pl-3">
                            Retention On Specific Interval
                        </h4>
                        <p class="mr-4 text-left justify-center ml-4 pb-1 text-sm sm:pl-3">
                            Total number of unique users who interact with the platform during a month.
                        </p>
                    </div>
                    <GenericChart
                        type="retention"
                        data={retentionOnIntervalData}
                        labels={retentionOnIntervalLabels}
                        title="Retention On Specific Interval"
                        rate={retentionOnIntervalRate}
                        {fontColor}
                    />
                </div>
            </div>
            <!-- <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center">
                        <h4
                            class="mr-4 text-left justify-center py-3 ml-4 text-lg font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                        >
                            Commonly Visited Feature Data
                        </h4>
                    </div>
                    <GenericChart
                        type="line"
                        data={mostVisitedFeatureLoginData.length > 0}
                        login={mostVisitedFeatureLoginData}
                        medication={mostVisitedFeatureMedicationData}
                        labels={commonlyVisitedFeatureLabels}
                        title="Commonly Visited Feature Data"
                        {fontColor}
                    />
                </div>
            </div> -->
        </div>
    </div>
</div>
<div class="flex justify-center items-center h-full  min-w-full">
    <div
        class=" min-w-full flex overflow-x-auto overflow-hidden justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4"
    >
        <div class="w-full">
            <div class="flex items-center flex-col">
                <h4 class="mr-4 mt-3 text-left justify-center py-3 ml-4 text-lg font-semibold sm:pl-3">
                    Commonly Visited Features
                </h4>
                <!-- <p class="mr-4 text-left justify-center ml-4 pb-1 text-sm sm:pl-3">
                        Total number of unique users who interact with the platform during a month.
                    </p> -->
            </div>
            <div class=" px-2 sm:px-6 lg:px-8 col-span-2 items-center justify-center">
                <div class="flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-4">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full border border-secondary-100 dark:border-surface-700 rounded-lg">
                                <thead>
                                    <tr class=" border border-secondary-100 dark:border-surface-700">
                                        {#each tableHeaders as header}
                                            <th
                                                class=" py-3 text-left text-sm font-semibold sm:pl-3 border border-secondary-100 dark:border-surface-700"
                                            >
                                                {header}
                                            </th>
                                        {/each}
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each processedData as row}
                                        <tr
                                            class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700"
                                        >
                                            <td
                                                class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                            >
                                                {formatDate(row.month)}
                                            </td>
                                            <td
                                                class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                            >
                                                {row.mostUsedFeature}
                                            </td>
                                            <td
                                                class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                            >
                                                {row.usageCount}
                                            </td>
                                            <td
                                                class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                            >
                                                {row.totalUsage}
                                            </td>
                                            <td
                                                class="whitespace-nowrap text-sm px-3 py-2 border border-secondary-100 dark:border-surface-700"
                                            >
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
