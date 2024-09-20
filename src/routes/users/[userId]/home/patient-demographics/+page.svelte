<script lang="ts">
    import DistributionTable from './DistributionTable.svelte';
    ///////////////////////////////////////////////////////////////////////////////////////////
    export let data;

    const ageGroup = data.statistics.BasicStatistics.PatientDemographics.AgeGroups;
    const genderGroups = data.statistics.BasicStatistics.PatientDemographics.GenderGroups;
    const locationGroups = data.statistics.BasicStatistics.PatientDemographics.LocationGroups;
    const ethinicityGroups = data.statistics.BasicStatistics.PatientDemographics.EthnicityGroups;
    const raceGroups = data.statistics.BasicStatistics.PatientDemographics.RaceGroups;
    const healthSystemsDistribution = data.statistics.BasicStatistics.PatientDemographics.HealthSystemDistribution;
    const hospitalDistribution = data.statistics.BasicStatistics.PatientDemographics.HospitalDistribution;
    const survivorOrCaregiverDistribution =
        data.statistics.BasicStatistics.PatientDemographics.SurvivorOrCareGiverDistribution;

    //     if (data.statistics.BasicStatistics.PatientDemographics) {
    //     if (data.statistics.BasicStatistics.PatientDemographics.AgeGroups) {
    //         ageGroup = data.statistics.BasicStatistics.PatientDemographics.AgeGroups.map((x) => x.count);
    //     }
    // }
    let ageGroupData, ageGroupLabels;
    let genderGroupData, genderGroupLabels;
    let locationGroupData, locationGroupLabels;
    let ethnicityGroupData, ethnicityGroupLabels;
    let raceGroupData, raceGroupLabels;
    let healthSystemGroupData, healthSystemGroupLabels;
    let hospitalGroupData, hospitalGroupLabels;
    let survivorCareGiverGroupData, survivorCareGiverGroupLabels;

    if (data.statistics.BasicStatistics.PatientDemographics) {
        if (data.statistics.BasicStatistics.PatientDemographics.AgeGroups) {
            ageGroupData = data.statistics.BasicStatistics.PatientDemographics.AgeGroups.map((x) => x.count);
            ageGroupLabels = data.statistics.BasicStatistics.PatientDemographics.AgeGroups.map((x) => {
                const label = x.age_group;
                return label ? label : 'Unknown';
            });
        }

        if (data.statistics.BasicStatistics.PatientDemographics.GenderGroups) {
            genderGroupData = data.statistics.BasicStatistics.PatientDemographics.GenderGroups.map((x) => x.count);
            genderGroupLabels = data.statistics.BasicStatistics.PatientDemographics.GenderGroups.map((x) => {
                const label = x.gender;
                return label ? label : 'Unknown';
            });
        }

        if (data.statistics.BasicStatistics.PatientDemographics.LocationGroups) {
            locationGroupData = data.statistics.BasicStatistics.PatientDemographics.LocationGroups.map((x) => x.count);
            locationGroupLabels = data.statistics.BasicStatistics.PatientDemographics.LocationGroups.map((x) => {
                const label = x.location;
                return label ? label : 'Unknown';
            });
        }

        if (data.statistics.BasicStatistics.PatientDemographics.EthnicityGroups) {
            ethnicityGroupData = data.statistics.BasicStatistics.PatientDemographics.EthnicityGroups.map(
                (x) => x.count
            );
            ethnicityGroupLabels = data.statistics.BasicStatistics.PatientDemographics.EthnicityGroups.map((x) => {
                const label = x.ethnicity;
                return label ? label : 'Unknown';
            });
        }

        if (data.statistics.BasicStatistics.PatientDemographics.RaceGroups) {
            raceGroupData = data.statistics.BasicStatistics.PatientDemographics.RaceGroups.map((x) => x.count);
            raceGroupLabels = data.statistics.BasicStatistics.PatientDemographics.RaceGroups.map((x) => {
                const label = x.race;
                return label ? label : 'Unknown';
            });
        }

        if (data.statistics.BasicStatistics.PatientDemographics.HealthSystemDistribution) {
            healthSystemGroupData = data.statistics.BasicStatistics.PatientDemographics.HealthSystemDistribution.map(
                (x) => x.count
            );
            healthSystemGroupLabels = data.statistics.BasicStatistics.PatientDemographics.HealthSystemDistribution.map(
                (x) => {
                    const label = x.health_system;
                    return label ? label : 'Unknown';
                }
            );
        }

        if (data.statistics.BasicStatistics.PatientDemographics.HospitalDistribution) {
            hospitalGroupData = data.statistics.BasicStatistics.PatientDemographics.HospitalDistribution.map(
                (x) => x.count
            );
            hospitalGroupLabels = data.statistics.BasicStatistics.PatientDemographics.HospitalDistribution.map((x) => {
                const label = x.hospital;
                return label ? label : 'Unknown';
            });
        }

        if (data.statistics.BasicStatistics.PatientDemographics.SurvivorOrCareGiverDistribution) {
            survivorCareGiverGroupData =
                data.statistics.BasicStatistics.PatientDemographics.SurvivorOrCareGiverDistribution.map((x) => x.count);
            survivorCareGiverGroupLabels =
                data.statistics.BasicStatistics.PatientDemographics.SurvivorOrCareGiverDistribution.map((x) => {
                    const label = x.caregiver_status;
                    // Check if the label is "Yes" or "No", and assign accordingly
                    if (label === 'No') {
                        return 'Caregiver';
                    } else if (label === 'Yes') {
                        return 'Survivor';
                    } else {
                        return label ? label : 'Unknown';
                    }
                });
        }
    }
</script>

<div class="py-2 mt-8 ">
    <p class="  py-3 pl-4 pr-3 text-left text-sm  sm:pl-3">
        Demographics provide an understanding of the user base by categorizing them into age, gender, location, and
        other key attributes. These groupings help identify user diversity and engagement patterns.
    </p>
</div>
<div class="flex flex-col justify-center ">
    <p class="py-3 pl-4 pr-3 text-left text-lg font-semibold sm:pl-3">
        Age Distribution
    </p>
    <DistributionTable
        title="Age Distribution"
        tableHeaders={['Age Group', 'Count', 'Percentage']}
        tableData={ageGroup}
        chartData={ageGroupData}
        chartLabels={ageGroupLabels}
    />
    <p class="py-3 pl-4 pr-3 pt-10 text-left text-lg font-semibold  sm:pl-3">
        Gender Distribution
    </p>
    <DistributionTable
        title="Gender Distribution"
        tableHeaders={['Gender', 'Count', 'Percentage']}
        tableData={genderGroups}
        chartData={genderGroupData}
        chartLabels={genderGroupLabels}
    />
    <p class="py-3 pl-4 pr-3 pt-10 text-left text-lg font-semibold  sm:pl-3">
        Ethnicity Group Distribution
    </p>
    <DistributionTable
        title="Ethnicity Distribution"
        tableHeaders={['Ethnicity', 'Count', 'Percentage']}
        tableData={ethinicityGroups}
        chartData={ethnicityGroupData}
        chartLabels={ethnicityGroupLabels}
    />
    <p class="py-3 pl-4 pr-3 pt-10 text-left text-lg font-semibold  sm:pl-3">
        Survivor or Caregiver Distribution
    </p>
    <DistributionTable
        title="Survivor or Caregiver Distribution"
        tableHeaders={['Caregiver Status', 'Count', 'Percentage']}
        tableData={survivorOrCaregiverDistribution}
        chartData={survivorCareGiverGroupData}
        chartLabels={survivorCareGiverGroupLabels}
    />
    <p class="py-3 pl-4 pr-3 pt-10 text-left text-lg font-semibold  sm:pl-3">
        Race Distribution
    </p>
    <DistributionTable
        title="Race Distribution"
        tableHeaders={['Race', 'Count', 'Percentage']}
        tableData={raceGroups}
        chartData={raceGroupData}
        chartLabels={raceGroupLabels}
    />
    <p class="py-3 pl-4 pr-3 pt-10 text-left text-lg font-semibold  sm:pl-3">
        Health System Distribution
    </p>
    <DistributionTable
        title="Health System Distribution"
        tableHeaders={['Health System', 'Count', 'Percentage']}
        tableData={healthSystemsDistribution}
        chartData={healthSystemGroupData}
        chartLabels={healthSystemGroupLabels}
    />
    <p class="py-3 pl-4 pr-3 pt-10 text-left text-lg font-semibold  sm:pl-3">
        Hospital Distribution
    </p>
    <DistributionTable
        title="Hospital Distribution"
        tableHeaders={['Hospital', 'Count', 'Percentage']}
        tableData={hospitalDistribution}
        chartData={hospitalGroupData}
        chartLabels={hospitalGroupLabels}
    />
    <p class="py-3 pl-4 pr-3 pt-10 text-left text-lg font-semibold  sm:pl-3">
        Location Distribution
    </p>
    <DistributionTable
        title=" Location Distribution"
        tableHeaders={['Location', 'Count', 'Percentage']}
        tableData={locationGroups}
        chartData={locationGroupData}
        chartLabels={locationGroupLabels}
    />
</div>
<!--
<div class="py-4">
    <p class="  py-3 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-3">
        This section provides an overview of the basic analytics related to the tenant, including the total number of
        users, patient statistics, and registration/deregistration history.
    </p>
</div>

<div class="flex flex-col justify-center">
    <div class="grid grid-cols-1 justify-center rounded-lg">
        <p class="py-3 pl-4 pr-3 text-left text-lg font-semibold text-primary-500 dark:text-primary-100 sm:pl-3">
            Age Distribution
        </p>
        <div
            class="grid grid-cols-3 overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-full h-full gap-3"
        >
            <div class="px-4 sm:px-6 lg:px-8 col-span-2">
                <div class="flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full">
                                <thead>
                                    <tr class="w-[100%]">
                                        <th
                                            class="w-[30%] py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Age Group</th
                                        >
                                        <th
                                            class="w-[30%] py-3 ck pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Count</th
                                        >
                                        <th
                                            class="w-[40%] py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Percentage</th
                                        >
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each ageGroup as data}
                                        <tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition">
                                            <td
                                                style="width:10%;"
                                                class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 text-sm sm:pl-3"
                                                >{data.count}</td
                                            >
                                            <td
                                                style="width:10%;"
                                                class="whitespace-nowrap text-sm px-3 py-2 text-primary-500 dark:text-primary-100"
                                                >{data.age_group}</td
                                            >
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <div
                    class="flex col-span-3 overflow-x-auto justify-center items-center dark:border-surface-700 sm:px-4 pr-20"
                >
                    {#if ageGroupData}
                        <Doughnut
                            data={ageGroupData}
                            labels={ageGroupLabels}
                            title="Age Distribution"
                        />
                    {:else}
                        <div class="h-[400px] w-full p-4">
                            <p
                                style="color:{fontColor}"
                                class="justify-left items-center flex text-2xl"
                            >
                                Age Distribution
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
        <p class="py-3 pl-4 pr-3 text-left text-lg font-semibold text-primary-500 dark:text-primary-100 sm:pl-3">
            Gender Distribution
        </p>
        <div
            class="grid grid-cols-3 overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-full h-full gap-3"
        >
            <div class="px-4 sm:px-6 lg:px-8 col-span-2">
                <div class="flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full">
                                <thead>
                                    <tr class="w-[100%]">
                                        <th
                                            class="w-[30%] py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Age Group</th
                                        >
                                        <th
                                            class="w-[30%] py-3 ck pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Count</th
                                        >
                                        <th
                                            class="w-[40%] py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Percentage</th
                                        >
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each genderGroups as data}
                                        <tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition">
                                            <td
                                                style="width:10%;"
                                                class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 text-sm sm:pl-3"
                                                >{data.count}</td
                                            >
                                            <td
                                                style="width:10%;"
                                                class="whitespace-nowrap text-sm px-3 py-2 text-primary-500 dark:text-primary-100"
                                                >{data.gender}</td
                                            >
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <div
                    class="flex col-span-3 overflow-x-auto justify-center items-center dark:border-surface-700 sm:px-4 pr-20"
                >
                    {#if genderGroupData}
                        <Doughnut
                            data={genderGroupData}
                            labels={genderGroupLabels}
                            title="Gender Distribution"
                        />
                    {:else}
                        <div class="h-[400px] w-full p-4">
                            <p
                                style="color:{fontColor}"
                                class="justify-left items-center flex text-2xl"
                            >
                                Gender Distribution
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
        <div
            class="grid grid-cols-3 overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-full h-full gap-3"
        >
            <div class="px-4 sm:px-6 lg:px-8 col-span-2">
                <div class="flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full">
                                <thead>
                                    <tr class="w-[100%]">
                                        <th
                                            class="w-[30%] py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Age Group</th
                                        >
                                        <th
                                            class="w-[30%] py-3 ck pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Count</th
                                        >
                                        <th
                                            class="w-[40%] py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Percentage</th
                                        >
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each ethinicityGroups as data}
                                        <tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition">
                                            <td
                                                style="width:10%;"
                                                class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 text-sm sm:pl-3"
                                                >{data.count}</td
                                            >
                                            <td
                                                style="width:10%;"
                                                class="whitespace-nowrap text-sm px-3 py-2 text-primary-500 dark:text-primary-100"
                                                >{data.ethnicity}</td
                                            >
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <div
                    class="flex col-span-3 overflow-x-auto justify-center items-center dark:border-surface-700 sm:px-4 pr-20"
                >
                    {#if ethnicityGroupData}
                        <Doughnut
                            data={ethnicityGroupData}
                            labels={ethnicityGroupLabels}
                            title="Ethnicity Group Distribution"
                        />
                    {:else}
                        <div class="h-[400px] w-full p-4">
                            <p
                                style="color:{fontColor}"
                                class="justify-left items-center flex text-2xl"
                            >
                                Ethnicity Group Distribution
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
        <div
            class="grid grid-cols-3 overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-full h-full gap-3"
        >
            <div class="px-4 sm:px-6 lg:px-8 col-span-2">
                <div class="flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full">
                                <thead>
                                    <tr class="w-[100%]">
                                        <th
                                            class="w-[30%] py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Age Group</th
                                        >
                                        <th
                                            class="w-[30%] py-3 ck pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Count</th
                                        >
                                        <th
                                            class="w-[40%] py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Percentage</th
                                        >
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each raceGroups as data}
                                        <tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition">
                                            <td
                                                style="width:10%;"
                                                class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 text-sm sm:pl-3"
                                                >{data.count}</td
                                            >
                                            <td
                                                style="width:10%;"
                                                class="whitespace-nowrap text-sm px-3 py-2 text-primary-500 dark:text-primary-100"
                                                >{data.race}</td
                                            >
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <div
                    class="flex col-span-3 overflow-x-auto justify-center items-center dark:border-surface-700 sm:px-4 pr-20"
                >
                    {#if raceGroupData}
                        <Doughnut
                            data={raceGroupData}
                            labels={raceGroupLabels}
                            title="Race Group Distribution"
                        />
                    {:else}
                        <div class="h-[400px] w-full p-4">
                            <p
                                style="color:{fontColor}"
                                class="justify-left items-center flex text-2xl"
                            >
                                Race Group Distribution
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
        <div
            class="grid grid-cols-3 overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-full h-full gap-3"
        >
            <div class="px-4 sm:px-6 lg:px-8 col-span-2">
                <div class="flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full">
                                <thead>
                                    <tr class="w-[100%]">
                                        <th
                                            class="w-[30%] py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Age Group</th
                                        >
                                        <th
                                            class="w-[30%] py-3 ck pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Count</th
                                        >
                                        <th
                                            class="w-[40%] py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Percentage</th
                                        >
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each healthSystemsDistribution as data}
                                        <tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition">
                                            <td
                                                style="width:10%;"
                                                class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 text-sm sm:pl-3"
                                                >{data.count}</td
                                            >
                                            <td
                                                style="width:10%;"
                                                class="whitespace-nowrap text-sm px-3 py-2 text-primary-500 dark:text-primary-100"
                                                >{data.health_system}</td
                                            >
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <div
                    class="flex col-span-3 overflow-x-auto justify-center items-center dark:border-surface-700 sm:px-4 pr-20"
                >
                    {#if healthSystemGroupData}
                        <Doughnut
                            data={healthSystemGroupData}
                            labels={healthSystemGroupLabels}
                            title="Health System Distribution"
                        />
                    {:else}
                        <div class="h-[400px] w-full p-4">
                            <p
                                style="color:{fontColor}"
                                class="justify-left items-center flex text-2xl"
                            >
                                Health System Distribution
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
        <div
            class="grid grid-cols-3 overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-full h-full gap-3"
        >
            <div class="px-4 sm:px-6 lg:px-8 col-span-2">
                <div class="flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full">
                                <thead>
                                    <tr class="w-[100%]">
                                        <th
                                            class="w-[30%] py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Age Group</th
                                        >
                                        <th
                                            class="w-[30%] py-3 ck pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Count</th
                                        >
                                        <th
                                            class="w-[40%] py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Percentage</th
                                        >
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each hospitalDistribution as data}
                                        <tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition">
                                            <td
                                                style="width:10%;"
                                                class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 text-sm sm:pl-3"
                                                >{data.count}</td
                                            >
                                            <td
                                                style="width:10%;"
                                                class="whitespace-nowrap text-sm px-3 py-2 text-primary-500 dark:text-primary-100"
                                                >{data.hospital}</td
                                            >
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <div
                    class="flex col-span-3 overflow-x-auto justify-center items-center dark:border-surface-700 sm:px-4 pr-20"
                >
                    {#if hospitalGroupData}
                        <Doughnut
                            data={hospitalGroupData}
                            labels={hospitalGroupLabels}
                            title="Hospital Distribution"
                        />
                    {:else}
                        <div class="h-[400px] w-full p-4">
                            <p
                                style="color:{fontColor}"
                                class="justify-left items-center flex text-2xl"
                            >
                                Hospital Distribution
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
        <div
            class="grid grid-cols-3 overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-full h-full gap-3"
        >
            <div class="px-4 sm:px-6 lg:px-8 col-span-2">
                <div class="flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full">
                                <thead>
                                    <tr class="w-[100%]">
                                        <th
                                            class="w-[30%] py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Age Group</th
                                        >
                                        <th
                                            class="w-[30%] py-3 ck pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Count</th
                                        >
                                        <th
                                            class="w-[40%] py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Percentage</th
                                        >
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each survivorOrCaregiverDistribution as data}
                                        <tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition">
                                            <td
                                                style="width:10%;"
                                                class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 text-sm sm:pl-3"
                                                >{data.count}</td
                                            >
                                            <td
                                                style="width:10%;"
                                                class="whitespace-nowrap text-sm px-3 py-2 text-primary-500 dark:text-primary-100"
                                                >{data.caregiver_status}</td
                                            >
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <div
                    class="flex col-span-3 overflow-x-auto justify-center items-center dark:border-surface-700 sm:px-4 pr-20"
                >
                    {#if hospitalGroupData}
                        <Doughnut
                            data={survivorCareGiverGroupData}
                            labels={survivorCareGiverGroupLabels}
                            title="Survivor or Caregiver Distribution"
                        />
                    {:else}
                        <div class="h-[400px] w-full p-4">
                            <p
                                style="color:{fontColor}"
                                class="justify-left items-center flex text-2xl"
                            >
                                Survivor or Caregiver Distribution
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
        <div
            class="grid grid-cols-3 overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-full h-full gap-3"
        >
            <div class="px-4 sm:px-6 lg:px-8 col-span-2">
                <div class="flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full">
                                <thead>
                                    <tr class="w-[100%]">
                                        <th
                                            class="w-[30%] py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Age Group</th
                                        >
                                        <th
                                            class="w-[30%] py-3 ck pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Count</th
                                        >
                                        <th
                                            class="w-[40%] py-3 pl-4 pr-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
                                        >
                                            Percentage</th
                                        >
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each locationGroups as data}
                                        <tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition">
                                            <td
                                                style="width:10%;"
                                                class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 text-sm sm:pl-3"
                                                >{data.count}</td
                                            >
                                            <td
                                                style="width:10%;"
                                                class="whitespace-nowrap text-sm px-3 py-2 text-primary-500 dark:text-primary-100"
                                                >{data.location}</td
                                            >
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <div
                    class="flex col-span-3 overflow-x-auto justify-center items-center dark:border-surface-700 sm:px-4 pr-20"
                >
                    {#if locationGroupData === null}
                        <Doughnut
                            data={locationGroupData}
                            labels={locationGroupLabels}
                            title="Location Distribution"
                        />
                    {:else}
                        <div class="h-[400px] w-full p-4">
                            <p
                                style="color:{fontColor}"
                                class="justify-left items-left flex text-2xl"
                            >
                                Location Distribution
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
</div>
 <div class="flex justify-center items-center h-full gap-10 w-full">
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                {#if ageGroupData}
                    <Doughnut
                        data={ageGroupData}
                        labels={ageGroupLabels}
                        title="Age Distribution"
                    />
                {:else}
                    <div class="h-[400px] w-full p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            Age Distribution
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
                {#if genderGroupData}
                    <Doughnut
                        data={genderGroupData}
                        labels={genderGroupLabels}
                        title="Gender Distribution"
                    />
                {:else}
                    <div class="h-[400px] w-full p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            Gender Distribution
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
                {#if ethnicityGroupData}
                    <Doughnut
                        data={ethnicityGroupData}
                        labels={ethnicityGroupLabels}
                        title="Ethnicity Group Distribution"
                    />
                {:else}
                    <div class="h-[400px] w-full p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            Ethnicity Group Distribution
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
                {#if raceGroupData}
                    <Doughnut
                        data={raceGroupData}
                        labels={raceGroupLabels}
                        title="Race Group Distribution"
                    />
                {:else}
                    <div class="h-[400px] w-full p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            Race Group Distribution
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
                {#if healthSystemGroupData}
                    <Doughnut
                        data={healthSystemGroupData}
                        labels={healthSystemGroupLabels}
                        title="Health System Distribution"
                    />
                {:else}
                    <div class="h-[400px] w-full p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            Health System Distribution
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
                {#if hospitalGroupData}
                    <Doughnut
                        data={hospitalGroupData}
                        labels={hospitalGroupLabels}
                        title="Hospital Distribution"
                    />
                {:else}
                    <div class="h-[400px] w-full p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            Hospital Distribution
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
                {#if hospitalGroupData}
                    <Doughnut
                        data={survivorCareGiverGroupData}
                        labels={survivorCareGiverGroupLabels}
                        title="Survivor or Caregiver Distribution"
                    />
                {:else}
                    <div class="h-[400px] w-full p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-center flex text-2xl"
                        >
                            Survivor or Caregiver Distribution
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
                {#if locationGroupData === null}
                    <Doughnut
                        data={locationGroupData}
                        labels={locationGroupLabels}
                        title="Location Distribution"
                    />
                {:else}
                    <div class="h-[400px] w-full p-4">
                        <p
                            style="color:{fontColor}"
                            class="justify-left items-left flex text-2xl"
                        >
                            Location Distribution
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
        </div> -->
