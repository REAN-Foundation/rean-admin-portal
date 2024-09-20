<script lang="ts">
    import BarChart from '../analytics-overview/components/BarChart.svelte';
    import Line from '..//analytics-overview/components/Line.svelte';
    import { getTickColorLight, getTickColorDark } from '$lib/themes/theme.selector';
    import RetentionGraphs from '..//analytics-overview/components/RetentionGraphs.svelte';
    ////////////////////////////////////////////////////////////////////////
    export let data;

    const tickColorLight = getTickColorLight();
    const tickColorDark = getTickColorDark();

    const fontColor = '#661B26';

    let DummyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // let DummyData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let DummyLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

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
</script>

<div class="flex flex-col justify-center">
    <div class="grid grid-cols-1 justify-center rounded-lg py-8 gap-8">
        <div class="flex justify-center items-center h-96 gap-10 w-full">
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                {#if dailyActiveUsersData}
                    <BarChart
                        dataSource={dailyActiveUsersData}
                        labels={dailyActiveUsersLabels}
                        title="Daily Active Users"
                    />
                {:else}
                    <div class="h-[400px] w-full p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            Daily Active Users
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
                {#if weeklyActiveUsersData}
                    <BarChart
                        dataSource={weeklyActiveUsersData}
                        labels={weeklyActiveUsersLabels}
                        title="Weekly Active Users"
                    />
                {:else}
                    <div class="h-[400px] w-full p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            Weekly Active Users
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
                {#if monthlyActiveUsersData}
                    <BarChart
                        dataSource={monthlyActiveUsersData}
                        labels={monthlyActiveUsersLabels}
                        title="Monthly Active Users"
                    />
                {:else}
                    <div class="h-[400px] w-full p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            Monthly Active Users
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
                {#if retentionOnDaysData}
                    <RetentionGraphs
                        rate={retentionOnDaysRate}
                        dataSource={retentionOnDaysData}
                        labels={retentionOnDaysLabels}
                        title="Retention On Specific Days"
                    />
                {:else}
                    <div class="h-[400px] w-full p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            Retention On Specific Days
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
                {#if retentionOnIntervalData}
                    <RetentionGraphs
                        rate={retentionOnIntervalRate}
                        dataSource={retentionOnIntervalData}
                        labels={retentionOnIntervalLabels}
                        title="Retention On Specific Interval"
                    />
                {:else}
                    <div class="h-[400px] w-full p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            Retention On Specific Interval
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
                {#if mostVisitedFeatureLoginData === null}
                    <Line
                        login={mostVisitedFeatureLoginData}
                        medication={mostVisitedFeatureMedicationData}
                        lables={commonlyVisitedFeatureLabels}
                        title="Commonly Visited Feature Data"
                    />
                {:else}
                    <div class="h-[400px] w-full py-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl bold"
                        >
                            Commonly Visited Feature Data
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
