<script lang="ts">
    import Graph from './graph.svelte';

    /////////////////////////////////////////////////////

    export let data;

    let activeFeature: string | null = 'loginSession';

    function mapData(feature: string) {
        activeFeature = feature;
    }
    let loginSessionAccessFrequencyData, loginSessionAccessFrequencyLabels;
    let loginSessionEngagementRateData, loginSessionEngagementRateLabels, loginSessionEngagementRateRate;
    let loginSessionRetentionRateDaysData, loginSessionRetentionRateDaysLabels, loginSessionRetentionRateDaysRate;
    let loginSessionRetentionRateIntervalsData,
        loginSessionRetentionRateIntervalsLabels,
        loginSessionRetentionRateIntervalsRate;
    let loginSessionDropOffPointsData, loginSessionDropOffPointsLabels;

    let medicationAccessFrequencyData, medicationRateAccessFrequencyLabels;
    let medicationEngagementRateData, medicationEngagementRateLabels, medicationEngagementRateRate;
    let medicationRetentionRateDaysData, medicationRetentionRateDaysLabels, medicationRetentionRateDaysRate;
    let medicationRetentionRateIntervalsData,
        medicationRetentionRateIntervalsLabels,
        medicationRetentionRateIntervalsRate;
    let medicationDropOffPointsData, medicationDropOffPointsLabels;

    let symptomsAccessFrequencyData, symptomsRateAccessFrequencyLabels;
    let symptomsEngagementRateData, symptomsEngagementRateLabels, symptomsEngagementRateRate;
    let symptomsRetentionRateDaysData, symptomsRetentionRateDaysLabels, symptomsRetentionRateDaysRate;
    let symptomsRetentionRateIntervalsData, symptomsRetentionRateIntervalsLabels, symptomsRetentionRateIntervalsRate;
    let symptomsDropOffPointsData, symptomsDropOffPointsLabels;

    let vitalsAccessFrequencyData, vitalsRateAccessFrequencyLabels;
    let vitalsEngagementRateData, vitalsEngagementRateLabels, vitalsEngagementRateRate;
    let vitalsRetentionRateDaysData, vitalsRetentionRateDaysLabels, vitalsRetentionRateDaysRate;
    let vitalsRetentionRateIntervalsData, vitalsRetentionRateIntervalsLabels, vitalsRetentionRateIntervalsRate;
    let vitalsDropOffPointsData, vitalsDropOffPointsLabels;

    let careplanAccessFrequencyData, careplanRateAccessFrequencyLabels;
    let careplanEngagementRateData, careplanEngagementRateLabels, careplanEngagementRateRate;
    let careplanRetentionRateDaysData, careplanRetentionRateDaysLabels, careplanRetentionRateDaysRate;
    let careplanRetentionRateIntervalsData, careplanRetentionRateIntervalsLabels, careplanRetentionRateIntervalsRate;
    let careplanDropOffPointsData, careplanDropOffPointsLabels;

    let userTaskAccessFrequencyData, userTaskRateAccessFrequencyLabels;
    let userTaskEngagementRateData, userTaskEngagementRateLabels, userTaskEngagementRateRate;
    let userTaskRetentionRateDaysData, userTaskRetentionRateDaysLabels, userTaskRetentionRateDaysRate;
    let userTaskRetentionRateIntervalsData, userTaskRetentionRateIntervalsLabels, userTaskRetentionRateIntervalsRate;
    let userTaskDropOffPointsData, userTaskDropOffPointsLabels;

    if (data.statistics.FeatureMetrics[0]) {
        loginSessionAccessFrequencyData = data.statistics.FeatureMetrics[0].AccessFrequency.map(
            (x) => x.access_frequency
        );
        loginSessionAccessFrequencyLabels = data.statistics.FeatureMetrics[0].AccessFrequency.map((x) => x.month);

        loginSessionEngagementRateData = data.statistics.FeatureMetrics[0].EngagementRate.map((x) => x.engagement_rate);
        loginSessionEngagementRateLabels = data.statistics.FeatureMetrics[0].EngagementRate.map((x) => x.month);
        loginSessionEngagementRateRate = data.statistics.FeatureMetrics[0].EngagementRate.map((x) => x.engagement_rate);

        loginSessionRetentionRateDaysData =
            data.statistics.FeatureMetrics[0].RetentionRateOnSpecificDays.retention_on_specific_days.map(
                (x) => x.returning_users
            );
        loginSessionRetentionRateDaysLabels =
            data.statistics.FeatureMetrics[0].RetentionRateOnSpecificDays.retention_on_specific_days.map((x) => x.day);
        loginSessionRetentionRateDaysRate =
            data.statistics.FeatureMetrics[0].RetentionRateOnSpecificDays.retention_on_specific_days.map(
                (x) => x.retention_rate
            );

        loginSessionRetentionRateIntervalsData =
            data.statistics.FeatureMetrics[0].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.returning_users
            );
        loginSessionRetentionRateIntervalsLabels =
            data.statistics.FeatureMetrics[0].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.interval
            );
        loginSessionRetentionRateIntervalsRate =
            data.statistics.FeatureMetrics[0].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.retention_rate
            );

        loginSessionDropOffPointsData = data.statistics.FeatureMetrics[0].DropOffPoints.map((x) => x.dropoff_count);
        loginSessionDropOffPointsLabels = data.statistics.FeatureMetrics[0].DropOffPoints.map((x) => x.event_name);
    }
    ////////////////////////////////////////////////////////////
    if (data.statistics.FeatureMetrics[1]) {
        medicationAccessFrequencyData = data.statistics.FeatureMetrics[1].AccessFrequency.map(
            (x) => x.access_frequency
        );
        medicationRateAccessFrequencyLabels = data.statistics.FeatureMetrics[1].AccessFrequency.map((x) => x.month);

        medicationEngagementRateData = data.statistics.FeatureMetrics[1].EngagementRate.map((x) => x.engagement_rate);
        medicationEngagementRateLabels = data.statistics.FeatureMetrics[1].EngagementRate.map((x) => x.month);
        medicationEngagementRateRate = data.statistics.FeatureMetrics[1].EngagementRate.map((x) => x.engagement_rate);

        medicationRetentionRateDaysData =
            data.statistics.FeatureMetrics[1].RetentionRateOnSpecificDays.retention_on_specific_days.map(
                (x) => x.returning_users
            );
        medicationRetentionRateDaysLabels =
            data.statistics.FeatureMetrics[1].RetentionRateOnSpecificDays.retention_on_specific_days.map((x) => x.day);
        medicationRetentionRateDaysRate =
            data.statistics.FeatureMetrics[1].RetentionRateOnSpecificDays.retention_on_specific_days.map(
                (x) => x.retention_rate
            );

        medicationRetentionRateIntervalsData =
            data.statistics.FeatureMetrics[1].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.returning_users
            );
        medicationRetentionRateIntervalsLabels =
            data.statistics.FeatureMetrics[1].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.retention_rate
            );
        medicationRetentionRateIntervalsRate =
            data.statistics.FeatureMetrics[1].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.interval
            );

        medicationDropOffPointsData = data.statistics.FeatureMetrics[1].DropOffPoints.map((x) => x.dropoff_count);
        medicationDropOffPointsLabels = data.statistics.FeatureMetrics[1].DropOffPoints.map((x) => x.event_name);
    }
    //////////////////////////////////////////////////////////////////////
    if (data.statistics.FeatureMetrics[2]) {
        symptomsAccessFrequencyData = data.statistics.FeatureMetrics[2].AccessFrequency.map((x) => x.access_frequency);
        symptomsRateAccessFrequencyLabels = data.statistics.FeatureMetrics[2].AccessFrequency.map((x) => x.month);

        symptomsEngagementRateData = data.statistics.FeatureMetrics[2].EngagementRate.map((x) => x.engagement_rate);
        symptomsEngagementRateLabels = data.statistics.FeatureMetrics[2].EngagementRate.map((x) => x.month);
        symptomsEngagementRateRate = data.statistics.FeatureMetrics[2].EngagementRate.map((x) => x.engagement_rate);

        symptomsRetentionRateDaysData =
            data.statistics.FeatureMetrics[2].RetentionRateOnSpecificDays.retention_on_specific_days.map(
                (x) => x.returning_users
            );
        symptomsRetentionRateDaysLabels =
            data.statistics.FeatureMetrics[2].RetentionRateOnSpecificDays.retention_on_specific_days.map((x) => x.day);
        symptomsRetentionRateDaysRate =
            data.statistics.FeatureMetrics[2].RetentionRateOnSpecificDays.retention_on_specific_days.map(
                (x) => x.retention_rate
            );

        symptomsRetentionRateIntervalsData =
            data.statistics.FeatureMetrics[2].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.returning_users
            );
        symptomsRetentionRateIntervalsLabels =
            data.statistics.FeatureMetrics[2].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.interval
            );
        symptomsRetentionRateIntervalsRate =
            data.statistics.FeatureMetrics[2].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.retention_rate
            );

        symptomsDropOffPointsData = data.statistics.FeatureMetrics[2].DropOffPoints.map((x) => x.dropoff_count);
        symptomsDropOffPointsLabels = data.statistics.FeatureMetrics[2].DropOffPoints.map((x) => x.event_name);
    }

    //////////////////////////////////////////////////////////////////////

    if (data.statistics.FeatureMetrics[3]) {
        vitalsAccessFrequencyData = data.statistics.FeatureMetrics[3].AccessFrequency.map((x) => x.access_frequency);
        vitalsRateAccessFrequencyLabels = data.statistics.FeatureMetrics[3].AccessFrequency.map((x) => x.month);

        vitalsEngagementRateData = data.statistics.FeatureMetrics[3].EngagementRate.map((x) => x.engagement_rate);
        vitalsEngagementRateLabels = data.statistics.FeatureMetrics[3].EngagementRate.map((x) => x.month);
        vitalsEngagementRateRate = data.statistics.FeatureMetrics[3].EngagementRate.map((x) => x.engagement_rate);

        vitalsRetentionRateDaysData =
            data.statistics.FeatureMetrics[3].RetentionRateOnSpecificDays.retention_on_specific_days.map(
                (x) => x.returning_users
            );
        vitalsRetentionRateDaysLabels =
            data.statistics.FeatureMetrics[3].RetentionRateOnSpecificDays.retention_on_specific_days.map((x) => x.day);
        vitalsRetentionRateDaysRate =
            data.statistics.FeatureMetrics[3].RetentionRateOnSpecificDays.retention_on_specific_days.map(
                (x) => x.retention_rate
            );

        vitalsRetentionRateIntervalsData =
            data.statistics.FeatureMetrics[3].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.returning_users
            );
        vitalsRetentionRateIntervalsLabels =
            data.statistics.FeatureMetrics[3].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.interval
            );
        vitalsRetentionRateIntervalsRate =
            data.statistics.FeatureMetrics[3].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.retention_rate
            );
        vitalsDropOffPointsData = data.statistics.FeatureMetrics[3].DropOffPoints.map((x) => x.dropoff_count);
        vitalsDropOffPointsLabels = data.statistics.FeatureMetrics[3].DropOffPoints.map((x) => x.event_name);
    }
    ///////////////////////////////////////////////////////////////

    if (data.statistics.FeatureMetrics[4]) {
        careplanAccessFrequencyData = data.statistics.FeatureMetrics[4].AccessFrequency.map((x) => x.access_frequency);
        careplanRateAccessFrequencyLabels = data.statistics.FeatureMetrics[4].AccessFrequency.map((x) => x.month);

        careplanEngagementRateData = data.statistics.FeatureMetrics[4].EngagementRate.map((x) => x.engagement_rate);
        careplanEngagementRateLabels = data.statistics.FeatureMetrics[4].EngagementRate.map((x) => x.month);
        careplanEngagementRateRate = data.statistics.FeatureMetrics[4].EngagementRate.map((x) => x.engagement_rate);

        careplanRetentionRateDaysData =
            data.statistics.FeatureMetrics[4].RetentionRateOnSpecificDays.retention_on_specific_days.map(
                (x) => x.returning_users
            );
        careplanRetentionRateDaysLabels =
            data.statistics.FeatureMetrics[4].RetentionRateOnSpecificDays.retention_on_specific_days.map((x) => x.day);
        careplanRetentionRateDaysRate =
            data.statistics.FeatureMetrics[4].RetentionRateOnSpecificDays.retention_on_specific_days.map(
                (x) => x.retention_rate
            );

        careplanRetentionRateIntervalsData =
            data.statistics.FeatureMetrics[4].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.returning_users
            );
        careplanRetentionRateIntervalsLabels =
            data.statistics.FeatureMetrics[4].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.interval
            );
        careplanRetentionRateIntervalsRate =
            data.statistics.FeatureMetrics[4].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.retention_rate
            );
        careplanDropOffPointsData = data.statistics.FeatureMetrics[4].DropOffPoints.map((x) => x.dropoff_count);
        careplanDropOffPointsLabels = data.statistics.FeatureMetrics[4].DropOffPoints.map((x) => x.event_name);
    }
    ///////////////////////////////////////
    if (data.statistics.FeatureMetrics[5]) {
        userTaskAccessFrequencyData = data.statistics.FeatureMetrics[5].AccessFrequency.map((x) => x.access_frequency);
        userTaskRateAccessFrequencyLabels = data.statistics.FeatureMetrics[5].AccessFrequency.map((x) => x.month);

        userTaskEngagementRateData = data.statistics.FeatureMetrics[5].EngagementRate.map((x) => x.engagement_rate);
        userTaskEngagementRateLabels = data.statistics.FeatureMetrics[5].EngagementRate.map((x) => x.month);
        userTaskEngagementRateRate = data.statistics.FeatureMetrics[5].EngagementRate.map((x) => x.engagement_rate);

        userTaskRetentionRateDaysData =
            data.statistics.FeatureMetrics[5].RetentionRateOnSpecificDays.retention_on_specific_days.map(
                (x) => x.returning_users
            );
        userTaskRetentionRateDaysLabels =
            data.statistics.FeatureMetrics[5].RetentionRateOnSpecificDays.retention_on_specific_days.map((x) => x.day);
        userTaskRetentionRateDaysRate =
            data.statistics.FeatureMetrics[5].RetentionRateOnSpecificDays.retention_on_specific_days.map(
                (x) => x.retention_rate
            );

        userTaskRetentionRateIntervalsData =
            data.statistics.FeatureMetrics[5].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.returning_users
            );
        userTaskRetentionRateIntervalsLabels =
            data.statistics.FeatureMetrics[5].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.interval
            );
        userTaskRetentionRateIntervalsRate =
            data.statistics.FeatureMetrics[5].RetentionRateInSpecificIntervals.retention_in_specific_interval.map(
                (x) => x.retention_rate
            );
        userTaskDropOffPointsData = data.statistics.FeatureMetrics[5].DropOffPoints.map((x) => x.dropoff_count);
        userTaskDropOffPointsLabels = data.statistics.FeatureMetrics[5].DropOffPoints.map((x) => x.event_name);
    }
</script>

<div class="flex mt-4 gap-4">
    <button
        on:click={() => mapData('loginSession')}
        class="btn {activeFeature === 'loginSession' ? 'variant-filled-secondary' : 'variant-outline-secondary'}"
    >
        Login Session
    </button>
    <button
        on:click={() => mapData('medication')}
        class="btn {activeFeature === 'medication' ? 'variant-filled-secondary' : 'variant-outline-secondary'}"
    >
        Medication
    </button>
    <button
        on:click={() => mapData('symptoms')}
        class="btn {activeFeature === 'symptoms' ? 'variant-filled-secondary' : 'variant-outline-secondary'}"
    >
        Symptoms
    </button>
    <button
        on:click={() => mapData('vitals')}
        class="btn {activeFeature === 'vitals' ? 'variant-filled-secondary' : 'variant-outline-secondary'}"
    >
        Vitals
    </button>
    <button
        on:click={() => mapData('careplan')}
        class="btn {activeFeature === 'careplan' ? 'variant-filled-secondary' : 'variant-outline-secondary'}"
    >
        Careplan
    </button>
    <button
        on:click={() => mapData('userTask')}
        class="btn {activeFeature === 'userTask' ? 'variant-filled-secondary' : 'variant-outline-secondary'}"
    >
        User Task
    </button>
</div>

{#if activeFeature === 'loginSession'}
    <Graph
        engagementRateRate={loginSessionEngagementRateRate}
        retentionRateDaysRate={loginSessionRetentionRateDaysRate}
        retentionRateIntervalsRate={loginSessionRetentionRateIntervalsRate}
        accessFrequencyData={loginSessionAccessFrequencyData}
        accessFrequencyLabels={loginSessionAccessFrequencyLabels}
        engagementRateData={loginSessionEngagementRateData}
        engagementRateLabels={loginSessionEngagementRateLabels}
        retentionRateDaysData={loginSessionRetentionRateDaysData}
        retentionRateDaysLabels={loginSessionRetentionRateDaysLabels}
        retentionRateIntervalsData={loginSessionRetentionRateIntervalsData}
        retentionRateIntervalsLabels={loginSessionRetentionRateIntervalsLabels}
        dropOffPointsData={loginSessionDropOffPointsData}
        dropOffPointsLabels={loginSessionDropOffPointsLabels}
    />
{/if}
{#if activeFeature === 'medication'}
    <Graph
        engagementRateRate={medicationEngagementRateRate}
        retentionRateDaysRate={medicationRetentionRateDaysRate}
        retentionRateIntervalsRate={medicationRetentionRateIntervalsRate}
        accessFrequencyData={medicationAccessFrequencyData}
        accessFrequencyLabels={medicationRateAccessFrequencyLabels}
        engagementRateData={medicationEngagementRateData}
        engagementRateLabels={medicationEngagementRateLabels}
        retentionRateDaysData={medicationRetentionRateDaysData}
        retentionRateDaysLabels={medicationRetentionRateDaysLabels}
        retentionRateIntervalsData={medicationRetentionRateIntervalsData}
        retentionRateIntervalsLabels={medicationRetentionRateIntervalsLabels}
        dropOffPointsData={medicationDropOffPointsData}
        dropOffPointsLabels={medicationDropOffPointsLabels}
    />
{/if}
{#if activeFeature === 'symptoms'}
    <Graph
        engagementRateRate={symptomsEngagementRateRate}
        retentionRateDaysRate={symptomsRetentionRateDaysRate}
        retentionRateIntervalsRate={symptomsRetentionRateIntervalsRate}
        accessFrequencyData={symptomsAccessFrequencyData}
        accessFrequencyLabels={symptomsRateAccessFrequencyLabels}
        engagementRateData={symptomsEngagementRateData}
        engagementRateLabels={symptomsEngagementRateLabels}
        retentionRateDaysData={symptomsRetentionRateDaysData}
        retentionRateDaysLabels={symptomsRetentionRateDaysLabels}
        retentionRateIntervalsData={symptomsRetentionRateIntervalsData}
        retentionRateIntervalsLabels={symptomsRetentionRateIntervalsLabels}
        dropOffPointsData={symptomsDropOffPointsData}
        dropOffPointsLabels={symptomsDropOffPointsLabels}
    />
{/if}
{#if activeFeature === 'vitals'}
    <Graph
        engagementRateRate={vitalsEngagementRateRate}
        retentionRateDaysRate={vitalsRetentionRateDaysRate}
        retentionRateIntervalsRate={vitalsRetentionRateIntervalsRate}
        accessFrequencyData={vitalsAccessFrequencyData}
        accessFrequencyLabels={vitalsRateAccessFrequencyLabels}
        engagementRateData={vitalsEngagementRateData}
        engagementRateLabels={vitalsEngagementRateLabels}
        retentionRateDaysData={vitalsRetentionRateDaysData}
        retentionRateDaysLabels={vitalsRetentionRateDaysLabels}
        retentionRateIntervalsData={vitalsRetentionRateIntervalsData}
        retentionRateIntervalsLabels={vitalsRetentionRateIntervalsLabels}
        dropOffPointsData={vitalsDropOffPointsData}
        dropOffPointsLabels={vitalsDropOffPointsLabels}
    />
{/if}
{#if activeFeature === 'careplan'}
    <Graph
        engagementRateRate={careplanEngagementRateRate}
        retentionRateDaysRate={careplanRetentionRateDaysRate}
        retentionRateIntervalsRate={careplanRetentionRateIntervalsRate}
        accessFrequencyData={careplanAccessFrequencyData}
        accessFrequencyLabels={careplanRateAccessFrequencyLabels}
        engagementRateData={careplanEngagementRateData}
        engagementRateLabels={careplanEngagementRateLabels}
        retentionRateDaysData={careplanRetentionRateDaysData}
        retentionRateDaysLabels={careplanRetentionRateDaysLabels}
        retentionRateIntervalsData={careplanRetentionRateIntervalsData}
        retentionRateIntervalsLabels={careplanRetentionRateIntervalsLabels}
        dropOffPointsData={careplanDropOffPointsData}
        dropOffPointsLabels={careplanDropOffPointsLabels}
    />
{/if}
{#if activeFeature === 'userTask'}
    <Graph
        engagementRateRate={userTaskEngagementRateRate}
        retentionRateDaysRate={userTaskRetentionRateDaysRate}
        retentionRateIntervalsRate={userTaskRetentionRateIntervalsRate}
        accessFrequencyData={userTaskAccessFrequencyData}
        accessFrequencyLabels={userTaskRateAccessFrequencyLabels}
        engagementRateData={userTaskEngagementRateData}
        engagementRateLabels={userTaskEngagementRateLabels}
        retentionRateDaysData={userTaskRetentionRateDaysData}
        retentionRateDaysLabels={userTaskRetentionRateDaysLabels}
        retentionRateIntervalsData={userTaskRetentionRateIntervalsData}
        retentionRateIntervalsLabels={userTaskRetentionRateIntervalsLabels}
        dropOffPointsData={userTaskDropOffPointsData}
        dropOffPointsLabels={userTaskDropOffPointsLabels}
    />
{/if}
