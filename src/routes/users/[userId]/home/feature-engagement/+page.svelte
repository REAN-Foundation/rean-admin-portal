<script lang="ts">
    import Graph from './graph.svelte';
    import { onMount } from 'svelte';
    import { formatMonth, generateMonthSequence } from '../analytics-overview/components/functions';
    
    // //////////////////////////////////////////////////////////////////////////////////////////////
    
    export let data;

    let medicationManagementdata = data.statistics.MedicationManagementMetrics[0];

    let activeFeature: string = 'Login Session';
    const features = ['Login Session', 'Medication', 'Symptoms', 'Vitals', 'Careplan', 'User Tasks'];

    const metricTypes = [
        'AccessFrequency',
        'EngagementRate',
        'RetentionRateOnSpecificDays',
        'RetentionRateInSpecificIntervals',
        'DropOffPoints'
    ];

    let featureMetrics = {};

    function processAccessFrequency(feature: string, metricData) {
        const months = metricData.map((x) => x.month);
        const oldestMonth = months.sort((a, b) => new Date(a) - new Date(b))[0];
        const latestMonth = months.sort((a, b) => new Date(b) - new Date(a))[0];

        const allMonths = generateMonthSequence(oldestMonth, latestMonth);

        const accessFrequencyDataMap = {};
        metricData.forEach((x) => {
            accessFrequencyDataMap[formatMonth(x.month)] = x.access_frequency;
        });

        const accessFrequencyData = allMonths.map((month) => accessFrequencyDataMap[month] || 0);

        featureMetrics[feature].accessFrequencyLabels = allMonths;
        featureMetrics[feature].accessFrequencyData = accessFrequencyData;
    }

    function processEngagementRate(feature: string, metricData) {
        const months = metricData.map((x) => x.month);
        const oldestMonth = months.sort((a, b) => new Date(a) - new Date(b))[0];
        const latestMonth = months.sort((a, b) => new Date(b) - new Date(a))[0];

        const allMonths = generateMonthSequence(oldestMonth, latestMonth);

        const accessFrequencyDataMap = {};
        metricData.forEach((x) => {
            accessFrequencyDataMap[formatMonth(x.month)] = x.engagement_rate;
        });

        const accessFrequencyData = allMonths.map((month) => accessFrequencyDataMap[month] || 0);

        featureMetrics[feature].engagementRateLabels = allMonths;
        featureMetrics[feature].engagementRateData = accessFrequencyData;
    }

    function initializeFeatureMetrics() {
        const featureKeys = ['loginSession', 'medication', 'symptoms', 'vitals', 'careplan', 'userTask'];
        featureKeys.forEach((featureKey, index) => {
            if (data.statistics.FeatureMetrics[index]) {
                const feature = features[index];
                featureMetrics[feature] = {};
                metricTypes.forEach((metricType) => {
                    const metricData = data.statistics.FeatureMetrics[index][metricType];
                    switch (metricType) {
                        case 'AccessFrequency':
                            processAccessFrequency(feature, metricData);
                            break;
                        case 'EngagementRate':
                            processEngagementRate(feature, metricData);
                            break;
                        case 'RetentionRateOnSpecificDays': {
                            const retentionDays = metricData.retention_on_specific_days;
                            featureMetrics[feature].retentionRateDaysData = retentionDays.map((x) => x.returning_users);
                            featureMetrics[feature].retentionRateDaysLabels = retentionDays.map((x) => x.day);
                            featureMetrics[feature].retentionRateDaysRate = retentionDays.map((x) => x.retention_rate);
                            break;
                        }
                        case 'RetentionRateInSpecificIntervals': {
                            const retentionIntervals = metricData.retention_in_specific_interval;
                            featureMetrics[feature].retentionRateIntervalsData = retentionIntervals.map(
                                (x) => x.returning_users
                            );
                            featureMetrics[feature].retentionRateIntervalsLabels = retentionIntervals.map(
                                (x) => x.interval
                            );
                            featureMetrics[feature].retentionRateIntervalsRate = retentionIntervals.map(
                                (x) => x.retention_rate
                            );
                            break;
                        }
                        case 'DropOffPoints': {
                            featureMetrics[feature].dropOffPointsData = metricData.map((x) => x.dropoff_count);
                            featureMetrics[feature].dropOffPointsLabels = metricData.map((x) => x.event_name);
                            break;
                        }
                    }
                });
            }
        });
    }

    onMount(() => {
        initializeFeatureMetrics();
    });

    function setActiveFeature(feature: string) {
        activeFeature = feature;
    }

    $: currentMetrics = featureMetrics[activeFeature] || {};
</script>

<div class="flex mt-4 gap-4">
    {#each features as feature}
        <button
            on:click={() => setActiveFeature(feature)}
            class="btn {activeFeature === feature
                ? 'variant-filled-secondary'
                : 'border'} hover:variant-outline-secondary"
        >
            {feature}
        </button>
    {/each}
</div>

{#key activeFeature}
    {#if Object.keys(currentMetrics).length > 0}
        <Graph feature = {activeFeature} {...currentMetrics} medicationManagementdata = {medicationManagementdata} />
    {/if}
{/key}
