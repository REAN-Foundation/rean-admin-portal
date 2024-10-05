<script lang="ts">
    import JointBarGraph from '$lib/components/analytics/JointBarGraph.svelte';
    import PieChart from '$lib/components/analytics/PieChart.svelte';
    import {
        processPatientDeregistrationHistory,
        formatLabelOfMonth,
        processPatientRegistrationHistory,
        formatDate
    } from './components/functions';
    import Line from '$lib/components/analytics/Line.svelte';

    export let data;

    let patientRegistrationHistoryData, patientRegistrationHistoryLabels;
    let patientDeRegistrationHistoryData;
    let usersDistributionByRoleData, usersDistributionByRoleLabels;
    let activeUsersCountAtEndOfMonthData, activeUsersCountAtEndOfMonthLabels;
    let dereg = processPatientDeregistrationHistory(data.statistics.BasicStatistics.PatientDeregistrationHistory);


    if (data.statistics.BasicStatistics) {
        if (data.statistics.BasicStatistics.PatientRegistrationHistory) {
            patientRegistrationHistoryData = data.statistics.BasicStatistics.PatientRegistrationHistory.map(
                (x) => x.user_count
            );
            patientRegistrationHistoryLabels = data.statistics.BasicStatistics.PatientRegistrationHistory.map((x) => {
                const label = formatLabelOfMonth(x.month);
                return label ? label : 'Unknown';
            });
        }

        if (data.statistics.BasicStatistics.PatientDeregistrationHistory) {
            patientDeRegistrationHistoryData = data.statistics.BasicStatistics.PatientDeregistrationHistory.map(
                (x) => x.user_count
            );
            // patientDeRegistrationHistoryLabels = data.statistics.BasicStatistics.PatientDeregistrationHistory.map(
            //     (x) => {
            //         const label = formatMonthLabel(x.month);
            //         return label ? label : 'Unknown';
            //     }
            // );
        }
        if (data.statistics.BasicStatistics.UsersDistributionByRole) {
            usersDistributionByRoleData = data.statistics.BasicStatistics.UsersDistributionByRole.map(
                (x) => x.registration_count
            );
            usersDistributionByRoleLabels = data.statistics.BasicStatistics.UsersDistributionByRole.map(
                (x) => x.role_name 
            );
        }

        if (data.statistics.BasicStatistics.ActiveUsersCountAtEndOfMonth) {
            activeUsersCountAtEndOfMonthData = data.statistics.BasicStatistics.ActiveUsersCountAtEndOfMonth.map(
                (x) => x.active_user_count
            );
            activeUsersCountAtEndOfMonthLabels = data.statistics.BasicStatistics.ActiveUsersCountAtEndOfMonth.map(
                (x) => x.month_end
            );
        }
    }
    console.log(usersDistributionByRoleData);
    console.log(usersDistributionByRoleLabels);

    let result;
    result = processPatientRegistrationHistory(
        data.statistics.BasicStatistics.PatientRegistrationHistory,
        data.statistics.BasicStatistics.PatientDeregistrationHistory
    );
    // onMount(() => {
    // });
    console.log('this is formatted result', result);
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
                                            class="whitespace-nowrap text-sm py-2 pl-4 pr-3 sm:pl-3">Tenant Code</td
                                        >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm"
                                        >
                                            {data.statistics.TenantId || 'Default'}</td
                                        >

                                        <td
                                            style="width:15%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm"
                                            >Unique identifier for the tenant.
                                        </td>
                                    </tr>
                                    <tr
                                        class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700"
                                    >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap text-sm py-2 pl-4 pr-3 sm:pl-3">Tenant Name</td
                                        >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm"
                                            >{'American Heart Association'}</td
                                        >
                                        <td
                                            style="width:15%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm"
                                        >
                                            Name of the tenant/organization.
                                        </td>
                                    </tr>
                                    <tr
                                        class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700"
                                    >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap text-sm py-2 pl-4 pr-3 sm:pl-3">Start Date</td
                                        >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm"
                                        >
                                            {formatDate(data.statistics.StartDate)}</td
                                        >
                                        <td
                                            style="width:15%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm"
                                            >Start date of the analysis period.
                                        </td>
                                    </tr>
                                    <tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition">
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap text-sm py-2 pl-4 pr-3 sm:pl-3">End Date</td
                                        >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm"
                                        >
                                            {formatDate(data.statistics.EndDate)}</td
                                        >
                                        <td
                                            style="width:15%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm"
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
            <div class="px-5 py-2">
                <p class="py-2 text-left text-lg font-bold sm:pl-3">Basic Statistics</p>
                <p class="py-2 text-left text-sm sm:pl-3">
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
                                            class=" py-3 pl-4 pr-3 text-left text-lg font-bold  sm:pl-3"
                                            >Basic Statistics</th
                                        >
                                    </tr>
                                    <tr>
                                        <td
                                            colspan="3"
                                            class="  py-3 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-3"
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
                                            class="whitespace-nowrap text-sm py-2 pl-4 pr-3 sm:pl-3"
                                            >Total Users
                                        </td>
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm"
                                        >
                                            {data.statistics.BasicStatistics.TotalUsers}</td
                                        >

                                        <td
                                            style="width:15%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm"
                                            >Overall count of users associated with the tenant.
                                        </td>
                                    </tr>
                                    <tr
                                        class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700"
                                    >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap text-sm py-2 pl-4 pr-3 sm:pl-3">Total Patients</td
                                        >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm"
                                            >{data.statistics.BasicStatistics.TotalPatients}</td
                                        >
                                        <td
                                            style="width:15%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm"
                                            >Total number of patients registered within the system.
                                        </td>
                                    </tr>
                                    <tr
                                        class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition border border-secondary-100 dark:border-surface-700"
                                    >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap text-sm py-2 pl-4 pr-3 sm:pl-3"
                                            >Total Active Patients</td
                                        >
                                        <td
                                            style="width:10%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm"
                                            >{data.statistics.BasicStatistics.TotalActivePatients}</td
                                        >
                                        <td
                                            style="width:15%;"
                                            class="whitespace-nowrap px-3 py-2 text-sm"
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
                <p class="py-2 pl-4 text-left text-lg font-bold  sm:pl-3">
                    Registration / Deregistration History
                </p>
                <p class="py-2 pl-4 text-left text-sm  sm:pl-3">
                    Trends of how many users registered or deregistered from the system on a given day, in a given week
                    or a month.
                </p>
            </div>
        </div> -->
    </div>
</div>
<div class="grid grid-cols-1 overflow-x-auto justify-center rounded-lg sm:px-4 px-4 pt-4 w-full h-full">
    <div class="px-5 py-2">
        <p class="py-2 pl-4 text-left text-lg font-bold sm:pl-3">Registration / Deregistration History</p>
        <p class="py-2 pl-4 text-left text-sm sm:pl-3">
            Trends of how many users registered or deregistered from the system on a given day, in a given week or a
            month.
        </p>
    </div>
</div>
<div class="flex flex-col justify-center">
    <div class="grid grid-cols-1 justify-center rounded-lg gap-8 px-12">
        <div class="flex justify-center items-center h-full gap-10 w-full">
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-full"
            >
                <div class="w-full">
                    <div class="flex items-center w-full justify-center">
                        <h4 class="mr-4 text-center justify-center py-3 ml-4 text-lg font-semibold sm:pl-3">
                            Patient Registration / Deregistration History
                        </h4>
                    </div>
                    {#if patientRegistrationHistoryData}
                        <div class="h-96">
                            <JointBarGraph
                                firstDataSource={result.registrationData}
                                secondDataSource={result.deregistrationData}
                                labels={result.labels}
                                title="Patient Registration / Deregistration History"
                            />
                        </div>
                    {:else}
                        <div class="h-[400px] w-full p-4">
                            <p class="justify-center items-center flex text-2xl">
                                Patient Registration / Deregistration History
                            </p>
                            <p class="justify-center items-center flex text-xl mt-28 leading-3">Data Not Available</p>
                        </div>
                    {/if}
                </div>
            </div>

            <!-- <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center justify-center">
                        <h4 class="mr-4 text-left justify-center py-3 ml-4 text-lg font-semibold sm:pl-3">
                            Patient Deregistration History
                        </h4>
                    </div>
                    {#if patientDeRegistrationHistoryData}
                        <div class="h-96">
                            <BarChart
                                dataSource={dereg.data}
                                labels={formattedDeregistrationLabels}
                                title="Patient Deregistration History"
                            />
                        </div>
                    {:else}
                        <div class="h-[400px] w-full p-4">
                            <p
                                
                                class="justify-center items-center flex text-2xl"
                            >
                                Patient Deregistration History
                            </p>
                            <p
                                
                                class="justify-center items-center flex text-xl mt-28 leading-3"
                            >
                                Data Not Available
                            </p>
                        </div>
                    {/if}
                </div>
            </div> -->
        </div>

        <div class="flex justify-center items-center h-full gap-10 w-full">
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center w-full justify-center">
                        <h4 class="mr-4 text-center justify-center py-3 ml-4 text-lg font-semibold sm:pl-3">
                            User Distribution By Roles
                        </h4>
                    </div>
                    {#if usersDistributionByRoleData}
                        <div class="h-96 pl-8">
                            <PieChart
                                data={usersDistributionByRoleData}
                                labels={usersDistributionByRoleLabels}
                                title="User Distribution By Roles"
                            />
                        </div>
                    {:else}
                        <div class="h-[400px] w-full p-4">
                            <!-- <p class="justify-center items-center flex text-2xl">User Distribution By Roles</p> -->
                            <p class="justify-center font-semibold items-center flex text-base mt-28 leading-3">
                                Data Not Available
                            </p>
                        </div>
                    {/if}
                </div>
            </div>

            <div
                class="flex min-h-full overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                <div class="w-full">
                    <div class="flex items-center justify-center w-full">
                        <h4 class="mr-4 text-left justify-center py-3 ml-4 text-lg font-semibold sm:pl-3">
                            Active Users For Month
                        </h4>
                    </div>
                    {#if patientDeRegistrationHistoryData}
                        <div class="h-96">
                            <Line
                                data={activeUsersCountAtEndOfMonthData}
                                lables={activeUsersCountAtEndOfMonthLabels}
                                title="Patient Deregistration History"
                            />
                        </div>
                    {:else}
                        <div class="h-[400px] w-full p-4">
                            <!-- <p class="justify-center items-center flex text-2xl">Active Users At End Of The Month</p> -->
                            <p class="justify-center items-center flex text-xl mt-28 leading-3">Data Not Available</p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>
