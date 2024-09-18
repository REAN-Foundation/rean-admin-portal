<script lang="ts">
    import BarChart from './components/BarChart.svelte';

    export let data;

    let DummyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let DummyLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    let patientRegistrationHistoryData, patientRegistrationHistoryLabels;
    let patientDeRegistrationHistoryData, patientDeRegistrationHistoryLabels;

    function formatMonthLabel(month: string): string {
        const date = new Date(month + '-01');
        return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    }

    if (data.statistics.BasicStatistics) {
        if (data.statistics.BasicStatistics.PatientRegistrationHistory) {
            patientRegistrationHistoryData = data.statistics.BasicStatistics.PatientRegistrationHistory.map(
                (x) => x.user_count
            );
            patientRegistrationHistoryLabels = data.statistics.BasicStatistics.PatientRegistrationHistory.map((x) => {
                const label = formatMonthLabel(x.month);
                return label ? label : 'Unknown';
            });
        }

        if (data.statistics.BasicStatistics.PatientDeregistrationHistory) {
            patientDeRegistrationHistoryData = data.statistics.BasicStatistics.PatientDeregistrationHistory.map(
                (x) => x.user_count
            );
            patientDeRegistrationHistoryLabels = data.statistics.BasicStatistics.PatientDeregistrationHistory.map(
                (x) => {
                    const label = formatMonthLabel(x.month);
                    return label ? label : 'Unknown';
                }
            );
        }
    }
</script>

<div class="flex flex-col justify-center">
    <div class="grid grid-cols-1 justify-center rounded-lg py-8 gap-8">
        <div class="flex justify-center items-center h-full gap-10 w-full">
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                {#if patientRegistrationHistoryData}
                    <BarChart
                        dataSource={patientRegistrationHistoryData}
                        labels={patientRegistrationHistoryLabels}
                        title="Patient Registration History"
                    />
                {:else}
                    <BarChart
                        dataSource={DummyData}
                        labels={DummyLabels}
                        title="Patient Registration History (Data Not Available)"
                    />
                {/if}
            </div>

            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                {#if patientDeRegistrationHistoryData}
                    <BarChart
                        dataSource={patientDeRegistrationHistoryData}
                        labels={patientDeRegistrationHistoryLabels}
                        title="Patient Deregistration History "
                    />
                {:else}
                    <BarChart
                        dataSource={DummyData}
                        labels={DummyLabels}
                        title="Patient Deregistration History (Data Not Available)"
                    />
                {/if}
            </div>
        </div>
    </div>
</div>
