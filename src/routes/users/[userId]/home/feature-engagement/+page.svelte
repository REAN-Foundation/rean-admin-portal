<script lang="ts">
    import Graph from './graph.svelte';
    import { onMount } from 'svelte';
    import { formatMonth, generateMonthSequence } from '../analytics-overview/components/functions'; // Import the formatMonth function
    export let data;

    let activeFeature: string = 'loginSession';
    const features = ['loginSession', 'medication', 'symptoms', 'vitals', 'careplan', 'userTask'];

    const metricTypes = [
        'AccessFrequency',
        'EngagementRate',
        'RetentionRateOnSpecificDays',
        'RetentionRateInSpecificIntervals',
        'DropOffPoints'
    ];

    let featureMetrics = {};
    // Function to process AccessFrequency data
    function processAccessFrequency(feature: string, metricData) {
        const months = metricData.map((x) => x.month); // Extract the months
        const oldestMonth = months.sort((a, b) => new Date(a) - new Date(b))[0]; // Find the oldest month
        const latestMonth = months.sort((a, b) => new Date(b) - new Date(a))[0]; // Find the latest month

        const allMonths = generateMonthSequence(oldestMonth, latestMonth); // Generate all months sequentially

        // Fill the data for each month, inserting 0 for missing months
        const accessFrequencyDataMap = {};
        metricData.forEach((x) => {
            accessFrequencyDataMap[formatMonth(x.month)] = x.access_frequency; // Format months
        });

        const accessFrequencyData = allMonths.map((month) => accessFrequencyDataMap[month] || 0);

        // Update the featureMetrics with sorted and complete data
        featureMetrics[feature].accessFrequencyLabels = allMonths;
        featureMetrics[feature].accessFrequencyData = accessFrequencyData;
    }

    // Function to process AccessFrequency data
    function processEngagementRate(feature: string, metricData) {
        const months = metricData.map((x) => x.month); // Extract the months
        const oldestMonth = months.sort((a, b) => new Date(a) - new Date(b))[0]; // Find the oldest month
        const latestMonth = months.sort((a, b) => new Date(b) - new Date(a))[0]; // Find the latest month

        const allMonths = generateMonthSequence(oldestMonth, latestMonth); // Generate all months sequentially

        // Fill the data for each month, inserting 0 for missing months
        const accessFrequencyDataMap = {};
        metricData.forEach((x) => {
            accessFrequencyDataMap[formatMonth(x.month)] = x.engagement_rate; // Format months
        });

        const accessFrequencyData = allMonths.map((month) => accessFrequencyDataMap[month] || 0);

        // Update the featureMetrics with sorted and complete data
        featureMetrics[feature].engagementRateLabels = allMonths;
        featureMetrics[feature].engagementRateData = accessFrequencyData;
    }

    function initializeFeatureMetrics() {
        features.forEach((feature, index) => {
            if (data.statistics.FeatureMetrics[index]) {
                featureMetrics[feature] = {};
                metricTypes.forEach((metricType) => {
                    const metricData = data.statistics.FeatureMetrics[index][metricType];
                    switch (metricType) {
                        case 'AccessFrequency':
                            processAccessFrequency(feature, metricData); // Call the function for AccessFrequency
                            break;
                        case 'EngagementRate':
                            // featureMetrics[feature].engagementRateData = metricData.map(x => x.engagement_rate);
                            // featureMetrics[feature].engagementRateLabels = metricData.map(x => formatMonth(x.month)); // Use formatMonth for formatting
                            // featureMetrics[feature].engagementRateRate = metricData.map(x => x.engagement_rate);
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
            {feature.charAt(0).toUpperCase() + feature.slice(1)}
        </button>
    {/each}
</div>

{#key activeFeature}
    {#if Object.keys(currentMetrics).length > 0}
        <Graph {...currentMetrics} />
    {/if}
{/key}
