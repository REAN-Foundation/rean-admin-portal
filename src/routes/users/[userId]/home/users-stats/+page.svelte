<script lang="ts">
	import type { PageServerData } from './$types';
	import UsersStats from '$lib/components/users-stats/users-stats.svelte';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;

	let maritalStatusWiseUsers;
	let genderWiseUsers;
	let ageWiseUsers;
    // let countryWiseUsers;
	let usersCount = data.overallUsersData;
	let majorAilment = data.majorAilment;
	let addictionDistribution = data.addictionDistribution;
	let deviceDetailWiseUsers = data.deviceDetailWiseUsers;
	let years =  data.years;

	$: genderWiseUsers;
	$: ageWiseUsers;	

	genderWiseUsers = data.genderWiseUsers;
	ageWiseUsers = data.ageWiseUsers;
    // countryWiseUsers = data.countryWiseUsers;
	maritalStatusWiseUsers = data.maritalStatusWiseUsers;
	let selectedYear;

    const selectAgeWiseUsersDividionYearly = (e) => {
		selectedYear = e.currentTarget.value;
        const yearWiseAgeDetails:any[] = data.yearWiseAgeDetails;
        const ageDetail= yearWiseAgeDetails.filter(e => e.Year == selectedYear);
		if (ageDetail.length > 0) {
            ageWiseUsers = ageDetail[0].AgeDetails
        }
   	};

   const selectGenderWiseUsersDividionYearly = (e) => {
		selectedYear = e.currentTarget.value;
        const yearWiseGenderDetails = data.yearWiseGenderDetails;
        const genderDetail= yearWiseGenderDetails.filter(e => e.Year == selectedYear);
		if (genderDetail.length > 0) {
            genderWiseUsers = genderDetail[0].GenderDetails
        }
	};

    const selectMaritalSatusDistributionYearly = (e) => {
		selectedYear = e.currentTarget.value;
		console.log('selected year', selectedYear);
        const yearWiseMaritalDetails = data.yearWiseMaritalDetails;
        const maritalDetail= yearWiseMaritalDetails.filter(e => e.Year == selectedYear);
		if (maritalDetail.length > 0) {
            maritalStatusWiseUsers = maritalDetail[0].MaritalDetails;
        }
	};

    const selectMajorAilmentDistributionYearly = (e) => {
		selectedYear = e.currentTarget.value;
		console.log('selected year', selectedYear);
        const yearWiseMajorAilmentDistributionDetails = data.yearWiseMajorAilmentDistributionDetails;
        const majorAilmentDistributionDetail= yearWiseMajorAilmentDistributionDetails.filter(e => e.Year == selectedYear);
		if (majorAilmentDistributionDetail.length > 0) {
            majorAilment = majorAilmentDistributionDetail[0].AilmentDetails
        }
	};
	
    const selectAddictionDistributionYearly = (e) => {
		selectedYear = e.currentTarget.value;
		console.log('selected year', selectedYear);
        const yearWiseAddictionDistributionDetails = data.yearWiseAddictionDistributionDetails;
        const addictionDistributionDetail= yearWiseAddictionDistributionDetails.filter(e => e.Year == selectedYear);
		if (addictionDistributionDetail.length > 0) {
            addictionDistribution = addictionDistributionDetail[0].AdditionDetails
        }
	};

</script>

<UsersStats
  {years}
	{ageWiseUsers}
	{genderWiseUsers}
	{maritalStatusWiseUsers}

	{majorAilment}
	{addictionDistribution}
	{usersCount}
	{deviceDetailWiseUsers}
	on:selectAgeWiseUsersDividionYearly={async (e) => {
		await selectAgeWiseUsersDividionYearly(e.detail.year);
	}}
	on:selectGenderWiseUsersDividionYearly={async (e) => {
		await selectGenderWiseUsersDividionYearly(e.detail.year);
	}}
	on:selectMaritalStatusDistributionYearly={async (e) => {
		await selectMaritalSatusDistributionYearly(e.detail.year);
	}}
	on:selectMajorAilmentDistributionYearly={async (e) => {
		await selectMajorAilmentDistributionYearly(e.detail.year);
	}}
	on:selectAddictionDistributionYearly={async (e) => {
		await selectAddictionDistributionYearly(e.detail.year);
	}}
/>

<!-- on:selectObesityDistributionYearly={async (e) => {
	await selectObesityDistributionYearly(e.detail.year);
}} -->
