<script lang="ts">
    import Doughnut from '../basic-stats/components/doughnut.svelte';

    export let data;

    let DummyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let DummyLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

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
                    return label ? label : 'Unknown';
                });
        }
    }
</script>

<div class="flex flex-col justify-center">
    <div class="grid grid-cols-1 justify-center rounded-lg py-8 gap-8">
        <div class="flex justify-center items-center h-full gap-10 w-full">
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                {#if ageGroupData}
                    <Doughnut
                        data={ageGroupData}
                        labels={ageGroupLabels}
                        title="Age Group Wise Data"
                    />
                {:else}
                    <Doughnut
                        data={DummyData}
                        labels={DummyLabels}
                        title="Age Group Wise Data (Data Not Available)"
                    />
                {/if}
            </div>

            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                {#if genderGroupData}
                    <Doughnut
                        data={genderGroupData}
                        labels={genderGroupLabels}
                        title="Gender Group Wise Data"
                    />
                {:else}
                    <Doughnut
                        data={DummyData}
                        labels={DummyLabels}
                        title="Gender Group Wise Data (Data Not Available)"
                    />
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
                        title="Ethnicity Group Wise Data"
                    />
                {:else}
                    <Doughnut
                        data={DummyData}
                        labels={DummyLabels}
                        title="Ethnicity Group Wise Data (Data Not Available)"
                    />
                {/if}
            </div>

            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                {#if raceGroupData}
                    <Doughnut
                        data={raceGroupData}
                        labels={raceGroupLabels}
                        title="Race Group Wise Data"
                    />
                {:else}
                    <Doughnut
                        data={DummyData}
                        labels={DummyLabels}
                        title="Race Group Wise Data (Data Not Available)"
                    />{/if}
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
                    <Doughnut
                        data={DummyData}
                        labels={DummyLabels}
                        title="Health System Distribution (Data Not Available)"
                    />
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
                    <Doughnut
                        data={DummyData}
                        labels={DummyLabels}
                        title="Hospital Distribution (Data Not Available)"
                    />
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
                    <Doughnut
                        data={DummyData}
                        labels={DummyLabels}
                        title="Survivor or Caregiver Distribution (Data Not Available)"
                    />
                {/if}
            </div>
            <div
                class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
            >
                {#if locationGroupData}
                    <Doughnut
                        data={locationGroupData}
                        labels={locationGroupLabels}
                        title="Location Group"
                    />
                {:else}
                    <Doughnut
                        data={locationGroupData}
                        labels={locationGroupLabels}
                        title="Location Group (Data Not Available)"
                    />
                {/if}
            </div>
        </div>
    </div>
</div>
