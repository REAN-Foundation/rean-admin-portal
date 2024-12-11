<script lang="ts">
    import DistributionTable from '$lib/components/analytics/DistributionTable.svelte';
    ///////////////////////////////////////////////////////////////////////////////////////////
    export let data;

    const ageGroup = data.basicStatistics.PatientDemographics.AgeGroups;
    const genderGroups = data.basicStatistics.PatientDemographics.GenderGroups;
    const locationGroups = data.basicStatistics.PatientDemographics.LocationGroups;
    const ethinicityGroups = data.basicStatistics.PatientDemographics.EthnicityGroups;
    const raceGroups = data.basicStatistics.PatientDemographics.RaceGroups;
    const healthSystemsDistribution = data.basicStatistics.PatientDemographics.HealthSystemDistribution;
    const hospitalDistribution = data.basicStatistics.PatientDemographics.HospitalDistribution;
    const survivorOrCaregiverDistribution =
        data.basicStatistics.PatientDemographics.SurvivorOrCareGiverDistribution;

    //     if (data.basicStatistics.PatientDemographics) {
    //     if (data.basicStatistics.PatientDemographics.AgeGroups) {
    //         ageGroup = data.basicStatistics.PatientDemographics.AgeGroups.map((x) => x.count);
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

    if (data.basicStatistics.PatientDemographics) {
        if (data.basicStatistics.PatientDemographics.AgeGroups) {
            ageGroupData = data.basicStatistics.PatientDemographics.AgeGroups.map((x) => x.count);
            ageGroupLabels = data.basicStatistics.PatientDemographics.AgeGroups.map((x) => {
                const label = x.age_group;
                return label ? label : 'Unknown';
            });
        }

        if (data.basicStatistics.PatientDemographics.GenderGroups) {
            genderGroupData = data.basicStatistics.PatientDemographics.GenderGroups.map((x) => x.count);
            genderGroupLabels = data.basicStatistics.PatientDemographics.GenderGroups.map((x) => {
                const label = x.gender;
                return label ? label : 'Unknown';
            });
        }

        if (data.basicStatistics.PatientDemographics.LocationGroups) {
            locationGroupData = data.basicStatistics.PatientDemographics.LocationGroups.map((x) => x.count);
            locationGroupLabels = data.basicStatistics.PatientDemographics.LocationGroups.map((x) => {
                const label = x.location;
                return label ? label : 'Unknown';
            });
        }

        if (data.basicStatistics.PatientDemographics.EthnicityGroups) {
            ethnicityGroupData = data.basicStatistics.PatientDemographics.EthnicityGroups.map(
                (x) => x.count
            );
            ethnicityGroupLabels = data.basicStatistics.PatientDemographics.EthnicityGroups.map((x) => {
                const label = x.ethnicity;
                return label ? label : 'Unknown';
            });
        }

        if (data.basicStatistics.PatientDemographics.RaceGroups) {
            raceGroupData = data.basicStatistics.PatientDemographics.RaceGroups.map((x) => x.count);
            raceGroupLabels = data.basicStatistics.PatientDemographics.RaceGroups.map((x) => {
                const label = x.race;
                return label ? label : 'Unknown';
            });
        }

        if (data.basicStatistics.PatientDemographics.HealthSystemDistribution) {
            healthSystemGroupData = data.basicStatistics.PatientDemographics.HealthSystemDistribution.map(
                (x) => x.count
            );
            healthSystemGroupLabels = data.basicStatistics.PatientDemographics.HealthSystemDistribution.map(
                (x) => {
                    const label = x.health_system;
                    return label ? label : 'Unknown';
                }
            );
        }

        if (data.basicStatistics.PatientDemographics.HospitalDistribution) {
            hospitalGroupData = data.basicStatistics.PatientDemographics.HospitalDistribution.map(
                (x) => x.count
            );
            hospitalGroupLabels = data.basicStatistics.PatientDemographics.HospitalDistribution.map((x) => {
                const label = x.hospital;
                return label ? label : 'Unknown';
            });
        }

        if (data.basicStatistics.PatientDemographics.SurvivorOrCareGiverDistribution) {
            survivorCareGiverGroupData =
                data.basicStatistics.PatientDemographics.SurvivorOrCareGiverDistribution.map((x) => x.count);
            survivorCareGiverGroupLabels =
                data.basicStatistics.PatientDemographics.SurvivorOrCareGiverDistribution.map((x) => {
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

<div class="py-2 mt-8">
    <p class="  py-3 pl-4 pr-3 text-left text-sm sm:pl-3">
        Demographics provide an understanding of the user base by categorizing them into age, gender, location, and
        other key attributes. These groupings help identify user diversity and engagement patterns.
    </p>
</div>
<div class="flex flex-col justify-center">
    <p class="py-3 pl-4 pr-3 text-left text-lg font-semibold sm:pl-3">Age Distribution</p>
    <!-- <DistributionTable
        title="Age Distribution"
        tableHeaders={['Age Group', 'Count', 'Percentage']}
        tableData={ageGroup}
        chartData={ageGroupData}
        chartLabels={ageGroupLabels}
    /> -->
    <DistributionTable
        title="Age Distribution"
        tableHeaders={['Age Group', 'Count', 'Percentage']}
        tableData={ageGroup}
        labelKey="age_group"
        countKey="count"
    />
    <p class="py-3 pl-4 pr-3 pt-10 text-left text-lg font-semibold sm:pl-3">Gender Distribution</p>
    <!-- <DistributionTable
        title="Gender Distribution"
        tableHeaders={['Gender', 'Count', 'Percentage']}
        tableData={genderGroups}
        chartData={genderGroupData}
        chartLabels={genderGroupLabels}
    /> -->
    <DistributionTable
        title="Gender Distribution"
        tableHeaders={['Gender', 'Count', 'Percentage']}
        tableData={genderGroups}
        labelKey="gender"
        countKey="count"
    />
    <p class="py-3 pl-4 pr-3 pt-10 text-left text-lg font-semibold sm:pl-3">Ethnicity Distribution</p>
    <!-- <DistributionTable
        title="Ethnicity Distribution"
        tableHeaders={['Ethnicity', 'Count', 'Percentage']}
        tableData={ethinicityGroups}
        chartData={ethnicityGroupData}
        chartLabels={ethnicityGroupLabels}
    /> -->
    <DistributionTable
        title="Ethnicity Distribution"
        tableHeaders={['Ethnicity', 'Count', 'Percentage']}
        tableData={ethinicityGroups}
        labelKey="ethnicity"
        countKey="count"
    />
    <p class="py-3 pl-4 pr-3 pt-10 text-left text-lg font-semibold sm:pl-3">Survivor or Caregiver Distribution</p>
    <!-- <DistributionTable
        title="Survivor or Caregiver Distribution"
        tableHeaders={['Caregiver Status', 'Count', 'Percentage']}
        tableData={survivorOrCaregiverDistribution}
        chartData={survivorCareGiverGroupData}
        chartLabels={survivorCareGiverGroupLabels}
    /> -->
    <DistributionTable
        title="Survivor or Caregiver Distribution"
        tableHeaders={['Caregiver Status', 'Count', 'Percentage']}
        tableData={survivorOrCaregiverDistribution}
        labelKey="caregiver_status"
        countKey="count"
    />
    <p class="py-3 pl-4 pr-3 pt-10 text-left text-lg font-semibold sm:pl-3">Race Distribution</p>
    <!-- <DistributionTable
        title="Race Distribution"
        tableHeaders={['Race', 'Count', 'Percentage']}
        tableData={raceGroups}
        chartData={raceGroupData}
        chartLabels={raceGroupLabels}
    /> -->
    <DistributionTable
        title="Race Distribution"
        tableHeaders={['Race', 'Count', 'Percentage']}
        tableData={raceGroups}
        labelKey="race"
        countKey="count"
    />
    <p class="py-3 pl-4 pr-3 pt-10 text-left text-lg font-semibold sm:pl-3">Health System Distribution</p>
    <!-- <DistributionTable
        title="Health System Distribution"
        tableHeaders={['Health System', 'Count', 'Percentage']}
        tableData={healthSystemsDistribution}
        chartData={healthSystemGroupData}
        chartLabels={healthSystemGroupLabels}
    /> -->
    <DistributionTable
        title="Health System Distribution"
        tableHeaders={['Health System', 'Count', 'Percentage']}
        tableData={healthSystemsDistribution}
        labelKey="health_system"
        countKey="count"
    />
    <p class="py-3 pl-4 pr-3 pt-10 text-left text-lg font-semibold sm:pl-3">Hospital Distribution</p>
    <!-- <DistributionTable
        title="Hospital Distribution"
        tableHeaders={['Hospital', 'Count', 'Percentage']}
        tableData={hospitalDistribution}
        chartData={hospitalGroupData}
        chartLabels={hospitalGroupLabels}
    /> -->
    <DistributionTable
        title="Hospital Distribution"
        tableHeaders={['Hospital', 'Count', 'Percentage']}
        tableData={hospitalDistribution}
        labelKey="hospital"
        countKey="count"
    />
    <p class="py-3 pl-4 pr-3 pt-10 text-left text-lg font-semibold sm:pl-3">Location Distribution</p>
    <!-- <DistributionTable
        title=" Location Distribution"
        tableHeaders={['Location', 'Count', 'Percentage']}
        tableData={locationGroups}
        chartData={locationGroupData}
        chartLabels={locationGroupLabels}
    /> -->
    <DistributionTable
        title=" Location Distribution"
        tableHeaders={['Location', 'Count', 'Percentage']}
        tableData={locationGroups}
        labelKey="location"
        countKey="count"
    />
</div>
