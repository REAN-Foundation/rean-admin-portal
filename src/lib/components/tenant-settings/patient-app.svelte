<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const userId = $page.params.userId;
	const tenantRoute = `/users/${userId}/tenants`;

    export let isTerrachecked = false;
	export let isSenseSemichecked = false;
	export let isGamificationAndAwardschecked = false;
	export let isCommunityAndUserGroupschecked = false;
	export let isDefaultchecked = false;
	export let isCustomchecked = false;
	export let isCoursesAndLearningJourneyschecked = false;
	export let isAppointmentsAndVisitschecked = false;
    export let edit;
    export let patientAppSettingOptions;
    $: console.log('IS EDIT ALLOWED ',edit)
    
    $: {
        patientAppSettingOptions.isTerrachecked = isTerrachecked;
        patientAppSettingOptions.isSenseSemichecked = isSenseSemichecked;
        patientAppSettingOptions.isGamificationAndAwardschecked = isGamificationAndAwardschecked;
        patientAppSettingOptions.isCommunityAndUserGroupschecked = isCommunityAndUserGroupschecked;
        patientAppSettingOptions.isDefaultchecked = isDefaultchecked;
        patientAppSettingOptions.isCustomchecked = isCustomchecked;
        patientAppSettingOptions.isCoursesAndLearningJourneyschecked = isCoursesAndLearningJourneyschecked;
        patientAppSettingOptions.isAppointmentsAndVisitschecked = isAppointmentsAndVisitschecked;
    }

    function handlePatientReportOptionChange(event) {
    if (event.currentTarget.value === 'Default') {
        isDefaultchecked = true;
        isCustomchecked = false;
    }else if (event.currentTarget.value === 'Custom') {
        isDefaultchecked = false;
        isCustomchecked = true;
    }
    else {
        isDefaultchecked = false;
        isCustomchecked = false;
    }
   }

</script>

<form
	method="post"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700 overflow-hidden"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Patient App</th>
				<th class="text-end">
					<a href={tenantRoute} class="btn px-0 w-8 h-8 variant-soft-secondary">
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit flex flex-col w-[1183px]">
			<div class="flex flex-row">
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<div class="flex flex-col ml-10">
						<td class="w-[200px]">Device Integration</td>
					</div>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>
                        {#if edit === true && isTerrachecked === true}
                            <span class="tick text-green-500 ml-10">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="terra"
                                disabled = {edit}
                                bind:checked={isTerrachecked} 
                                class="ml-12 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
					</td>
					<td class="">Terra</td>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-3/4">
					<td>
                        {#if edit === true && isSenseSemichecked === true}
                            <span class="tick text-green-500 ml-10">✔</span>
                        {:else}
						<input
							type="checkbox"
							name="senseSemi"
                            disabled = {edit}
							bind:checked={isSenseSemichecked} 
							class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
						/>
                        {/if}                        
					</td>
					<td class="">SenseSemi</td>
				</tr>
			</div>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
                    {#if edit === true && isGamificationAndAwardschecked === true}
                        <span class="tick text-green-500 ml-10">✔</span>
                    {:else}
                        <input
                            type="checkbox"
                            name="gamificationAndAwards"
                            disabled = {edit}
                            bind:checked={isGamificationAndAwardschecked} 
                            class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                        />
                    {/if}                           
				</td>
				<td class="ml-4">Gamification and Awards</td>
			</tr>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
                    {#if edit === true && isCommunityAndUserGroupschecked === true}
                        <span class="tick text-green-500 ml-10">✔</span>
                    {:else}
					<input
						type="checkbox"
						name="communityAndUserGroups"
                        disabled = {edit}
						bind:checked={isCommunityAndUserGroupschecked} 
						class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
					/>
                    {/if}                               
				</td>
				<td class="ml-4">Community and User Groups</td>
			</tr>
			<div class="flex flex-row">
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<div class="flex flex-col ml-10">
						<td class=" w-[150px]">Patient Reports</td>
					</div>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>
                        {#if edit === true && isDefaultchecked === true}
                            <span class="tick text-green-500 ml-10">✔</span>
                        {:else}
                        <input
                            type="radio"
                            name="patientReports"
                            value="Default"
                            disabled = {edit}
                            checked={isDefaultchecked}
                            on:change={handlePatientReportOptionChange}
                            class="ml-24 rounded-full radio radio-primary border-primary-200 hover:border-primary-400 radio-md"
                        />
                    {/if}                                
					</td>
					<td class="">Default</td>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-3/4">
					<td>
                        {#if edit === true && isCustomchecked === true}
                            <span class="tick text-green-500 ml-10">✔</span>
                        {:else}
						<input
							type="radio"
							name="patientReports"
                            value="Custom"
                            disabled = {edit}
                            checked={isCustomchecked}
							on:change={handlePatientReportOptionChange}
							class="ml-10 radio rounded-full radio-primary border-primary-200 hover:border-primary-400 radio-md"
						/>
                        {/if}                          
					</td>
					<td class="">Custom</td>
				</tr>
			</div>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
                    {#if edit === true && isCoursesAndLearningJourneyschecked === true}
                        <span class="tick text-green-500 ml-10">✔</span>
                    {:else}
                        <input
                            type="checkbox"
                            name="coursesAndLearningJourneys"
                            disabled = {edit}
                            bind:checked={isCoursesAndLearningJourneyschecked} 
                            class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                        />
                    {/if}   

				</td>
				<td class="ml-4">Courses & Learning Journeys</td>
			</tr>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
                    {#if edit === true && isAppointmentsAndVisitschecked === true}
                        <span class="tick text-green-500 ml-10">✔</span>
                    {:else}
                        <input
                            type="checkbox"
                            name="appointmentsAndVisits"
                            disabled = {edit}
                            bind:checked={isAppointmentsAndVisitschecked} 
                            class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                        />
                    {/if}                      
				</td>
				<td class="ml-4">Appointments and Visits</td>
			</tr>
		</tbody>
	</table>
</form>
