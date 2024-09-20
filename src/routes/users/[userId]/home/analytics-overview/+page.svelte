<script lang="ts">
    import BarChart from './components/BarChart.svelte';

    export let data;
    const fontColor = '#661B26';
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

    // Function to format the date
    function formatDate(utcDate: string): string {
        const date = new Date(utcDate);
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    }
</script>

<div class="flex flex-col justify-center">
    <div class="grid grid-cols-1 justify-center rounded-lg py-8 gap-8">
        <div class="grid grid-cols-1 overflow-x-auto justify-center sm:px-4 px-4 py-4 w-full h-full">
            <div class="px-4 sm:px-6 lg:px-8">
                <div class="flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full">
                                <tbody class="border border-secondary-100 dark:border-surface-700">
                                    <tr
                                        class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700"
                                    >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap text-sm py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 sm:pl-3"
                                            >Tenant Code</td
                                        >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
                                        >
                                            {data.statistics.TenantId || 'Default'}</td
                                        >

                                        <td
                                            style="width:15%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
                                            >Unique identifier for the tenant.
                                        </td>
                                    </tr>
                                    <tr
                                        class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700"
                                    >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap text-sm py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 sm:pl-3"
                                            >Tenant Name</td
                                        >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
                                            >{'American Heart Association'}</td
                                        >
                                        <td
                                            style="width:15%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
                                        >
                                            Name of the tenant/organization.
                                        </td>
                                    </tr>
                                    <tr
                                        class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700"
                                    >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap text-sm py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 sm:pl-3"
                                            >Start Date</td
                                        >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
                                        >
                                            {formatDate(data.statistics.StartDate)}</td
                                        >
                                        <td
                                            style="width:15%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
                                            >Start date of the analysis period.
                                        </td>
                                    </tr>
                                    <tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition">
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap text-sm py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 sm:pl-3"
                                            >End Date</td
                                        >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
                                        >
                                            {formatDate(data.statistics.EndDate)}</td
                                        >
                                        <td
                                            style="width:15%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
                                            >End date of the analysis period.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="  grid grid-cols-1 overflow-x-auto justify-center rounded-lg sm:px-4 px-4 py-4 w-full h-full">
            <div class="px-10 py-2">
                <p class="py-2 pl-4 text-left text-lg font-bold text-primary-500 dark:text-primary-100 sm:pl-3">
                    Basic Statistics
                </p>
                <p class="py-2 pl-4 text-left text-sm text-primary-500 dark:text-primary-100 sm:pl-3">
                    This section provides an overview of the basic analytics related to the tenant, including the total
                    number of users, patient statistics, and registration/deregistration history.
                </p>
            </div>
            <div class="px-4 py-2 sm:px-6 lg:px-8">
                <div class="flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full">
                                <!-- <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            class=" py-3 pl-4 pr-3 text-left text-lg font-bold text-primary-500 dark:text-primary-100 sm:pl-3"
                                            >Basic Statistics</th
                                        >
                                    </tr>
                                    <tr>
                                        <td
                                            colspan="3"
                                            class="  py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            <p>
                                                This section provides an overview of the basic analytics related to the
                                                tenant, including the total number of users, patient statistics, and
                                                registration/deregistration history.
                                            </p>
                                        </td>
                                    </tr>
                                </thead> -->
                                <tbody class="rounded-lg border border-secondary-100 dark:border-surface-700">
                                    <tr
                                        class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700 rounded-lg"
                                    >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap text-sm py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 sm:pl-3"
                                            >Total Users
                                        </td>
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
                                        >
                                            {data.statistics.BasicStatistics.TotalUsers}</td
                                        >

                                        <td
                                            style="width:15%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
                                            >Overall count of users associated with the tenant.
                                        </td>
                                    </tr>
                                    <tr
                                        class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700"
                                    >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap text-sm py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 sm:pl-3"
                                            >Total Patients</td
                                        >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
                                            >{data.statistics.BasicStatistics.TotalPatients}</td
                                        >
                                        <td
                                            style="width:15%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
                                            >Total number of patients registered within the system.
                                        </td>
                                    </tr>
                                    <tr
                                        class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700"
                                    >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap text-sm py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 sm:pl-3"
                                            >Total Active Patients</td
                                        >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
                                            >{data.statistics.BasicStatistics.TotalActivePatients}</td
                                        >
                                        <td
                                            style="width:15%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
                                            >Total number of active (Not-deleted) patients
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="grid grid-cols-1 overflow-x-auto justify-center rounded-lg sm:px-4 px-4 pt-4 w-full h-full bg-green-200">
            <div class="px-10 py-2">
                <p class="py-2 pl-4 text-left text-lg font-bold text-primary-500 dark:text-primary-100 sm:pl-3">
                    Registration / Deregistration History
                </p>
                <p class="py-2 pl-4 text-left text-sm text-primary-500 dark:text-primary-100 sm:pl-3">
                    Trends of how many users registered or deregistered from the system on a given day, in a given week
                    or a month.
                </p>
            </div>
        </div> -->
    </div>
</div>
<div class="grid grid-cols-1 overflow-x-auto justify-center rounded-lg sm:px-4 px-4 pt-4 w-full h-full ">
    <div class="px-10 py-2">
        <p class="py-2 pl-4 text-left text-lg font-bold text-primary-500 dark:text-primary-100 sm:pl-3">
            Registration / Deregistration History
        </p>
        <p class="py-2 pl-4 text-left text-sm text-primary-500 dark:text-primary-100 sm:pl-3">
            Trends of how many users registered or deregistered from the system on a given day, in a given week
            or a month.
        </p>
    </div>
</div>
<div class="flex flex-col justify-center ">
    <div class="grid grid-cols-1 justify-center rounded-lg gap-8 px-12">
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
                    <div class="h-[400px] w-full p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-center items-center flex text-2xl"
                        >
                            Patient Registration History
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
                {#if patientDeRegistrationHistoryData}
                    <BarChart
                        dataSource={patientDeRegistrationHistoryData}
                        labels={patientDeRegistrationHistoryLabels}
                        title="Patient Deregistration History"
                    />
                {:else}
                    <div class="h-[400px] w-full p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-center items-center flex text-2xl"
                        >
                            Patient Deregistration History
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
