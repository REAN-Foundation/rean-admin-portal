<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const userId = $page.params.userId;
	const tenantRoute = `/users/${userId}/tenants`;

	export let isVitalsAndLabRecordsChecked;
	export let isRemindersChecked;
	export let isMedicationManagementChecked;
	export let isDocumentManagementChecked;
	export let isScheduledAssessmentsChecked;
	export let isEHRIntegrationsChecked;
	export let isABDMIntegrationChecked;
	export let isNutritionChecked;
	export let isExerciseAndFitnessChecked;
	export let isDefaultCareplanChecked;
	export let isCustomCareplanChecked;
	export let isFHIRResourceStorageChecked;
    export let commonSettingOptions;
    export let edit;
    
    $: {
        commonSettingOptions.isVitalsAndLabRecordsChecked = isVitalsAndLabRecordsChecked;
        commonSettingOptions.isRemindersChecked = isRemindersChecked
        commonSettingOptions.isMedicationManagementChecked = isMedicationManagementChecked
        commonSettingOptions.isDocumentManagementChecked = isDocumentManagementChecked
        commonSettingOptions.isScheduledAssessmentsChecked = isScheduledAssessmentsChecked
        commonSettingOptions.isEHRIntegrationsChecked = isEHRIntegrationsChecked
        commonSettingOptions.isABDMIntegrationChecked = isABDMIntegrationChecked
        commonSettingOptions.isNutritionChecked = isNutritionChecked
        commonSettingOptions.isExerciseAndFitnessChecked = isExerciseAndFitnessChecked
        commonSettingOptions.isDefaultCareplanChecked = isDefaultCareplanChecked
        commonSettingOptions.isCustomCareplanChecked = isCustomCareplanChecked
        commonSettingOptions.isFHIRResourceStorageChecked = isFHIRResourceStorageChecked
    }
	
   function handleCareplanChange(event) {
    if (event.currentTarget.value === 'Default') {
        isDefaultCareplanChecked = true;
        isCustomCareplanChecked = false;
    }else if (event.currentTarget.value === 'Custom') {
        isDefaultCareplanChecked = false;
        isCustomCareplanChecked = true;
    }
    else {
        isDefaultCareplanChecked = false;
        isCustomCareplanChecked = false;
    }
   }
</script>

<form
	method="post"
	class="bg-white table-container my-2 border border-secondary-100 dark:!border-surface-700 overflow-hidden"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Common Setting</th>
				<th class="text-end">
					<a href={tenantRoute} class="btn px-0 w-8 h-8 variant-soft-secondary">
					</a>
				</th>
			</tr>
		</thead>
			<tbody class="!bg-white dark:!bg-inherit flex flex-col w-[1182px]">
				<div class="flex flex-row">
					<tr class="pr-10 !border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td>
                            {#if edit === true && isVitalsAndLabRecordsChecked === true}
                                <span class="tick text-green-500 ml-10">✔</span>
                            {:else}
							<input
								type="checkbox"
								name="vitalsAndLabRecords"
                                disabled = {edit}
                            	bind:checked={isVitalsAndLabRecordsChecked}
								class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
							/>
                            {/if}
						</td>
    					<td class="ml-4 w-[300px]">Vitals and Lab Records</td>
					</tr>
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-full">
						<div class="ml-16">
							<td>
                                {#if edit === true && isRemindersChecked === true}
                                    <span class="tick text-green-500 ml-10">✔</span>
                                {:else}
							        <input
                                        type="checkbox"
                                        name="reminders"
                                        disabled = {edit}
                                        bind:checked={isRemindersChecked}
                                        class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
								    />
						        {/if}
							</td>
							<td class="ml-4">Reminders</td>
						</div></tr
					>
				</div>
				<div class="flex flex-row">
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td>
                            {#if edit === true && isMedicationManagementChecked === true}
                                <span class="tick text-green-500 ml-10">✔</span>
                            {:else}
                            <input
                                type="checkbox"
                                name="medicationManagement"
                                disabled = {edit}
                                bind:checked={isMedicationManagementChecked}
                                class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                            {/if}
							
						</td>
						<td class="ml-4 w-[300px]">Medication Management</td>
					</tr>
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-full">
						<div class="ml-24">
							<td>
                                {#if edit === true && isDocumentManagementChecked === true}
                                    <span class="tick text-green-500 ml-10">✔</span>
                                {:else}
                                    <input
                                        type="checkbox"
                                        name="documentManagement"
                                        disabled = {edit}
                                        bind:checked={isDocumentManagementChecked}
                                        class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                    />
                                {/if}
                            
							</td>
							<td class="ml-4">Document Management</td>
						</div></tr
					>
				</div>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>
                        {#if edit === true && isScheduledAssessmentsChecked === true}
                            <span class="tick text-green-500 ml-10">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="scheduledAssessments"
                                disabled = {edit}
                                bind:checked={isScheduledAssessmentsChecked}
                                class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
					</td>
					<td class="ml-4">Scheduled Assessments</td>
				</tr>
				<div class="flex flex-row">
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td>
                            {#if edit === true && isEHRIntegrationsChecked === true}
                                <span class="tick text-green-500 ml-10">✔</span>
                            {:else}
                                <input
                                    type="checkbox"
                                    name="EHRIntegrations"
                                    disabled = {edit}
                                    bind:checked={isEHRIntegrationsChecked}
                                    class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                />
                            {/if}
                        
						</td>
						<td class="ml-4 w-[198px]">EHR Integrations</td>
					</tr>
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-full">
						<div class="ml-40">
							<td>
                                {#if edit === true && isABDMIntegrationChecked === true}
                                    <span class="tick text-green-500 ml-10">✔</span>
                                {:else}
                                    <input
                                        type="checkbox"
                                        name="ABDMIntegration"
                                        disabled = {edit}
                                        bind:checked={isABDMIntegrationChecked}
                                        class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                    />
                                {/if}
                            
							</td>
							<td class="ml-4">ABDM Integration</td>
						</div></tr
					>
				</div>
				<div class="flex flex-row">
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td>
                            {#if edit === true && isNutritionChecked === true}
                                <span class="tick text-green-500 ml-10">✔</span>
                            {:else}
                                <input
                                    type="checkbox"
                                    name="Nutrition"
                                    disabled = {edit}
                                    bind:checked={isNutritionChecked}
                                    class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                />
                            {/if}
                           
						</td>
						<td class="ml-4">Nutrition</td>
					</tr>
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-full">
						<div class="ml-56">
							<td>
                            {#if edit === true && isExerciseAndFitnessChecked === true}
                                <span class="tick text-green-500 ml-10">✔</span>
                            {:else}
                                <input
                                    type="checkbox"
                                    name="exerciseAndFitness"
                                    disabled = {edit}
                                    bind:checked={isExerciseAndFitnessChecked}
                                    class="ml-8 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                />
                            {/if}
								
							</td>
							<td class="ml-4">Exercise and Fitness</td>
						</div></tr
					>
				</div>
				<div class="flex flex-row">
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<div class="flex flex-col ml-10">
							<td>Careplans</td>
						</div>
					</tr>
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<div class="ml-10">
							<td>
                                {#if edit === true && isDefaultCareplanChecked === true}
                                    <span class="tick text-green-500 ml-10">✔</span>
                                {:else}
                                    <input
                                        type="radio"
                                        name="Careplans"
                                        value="Default"
                                        disabled = {edit}
                                        checked={isDefaultCareplanChecked}
                                        on:change={handleCareplanChange}
                                        class="ml-10 rounded-full radio radio-primary border-primary-200 hover:border-primary-400 radio-md"
                                    />
                                {/if}
								
							</td>
							<td>Default</td>
						</div>
					</tr>
					<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-3/4">
						<div class="ml-8">
							<td>
                                {#if edit === true && isCustomCareplanChecked === true}
                                    <span class="tick text-green-500 ml-10">✔</span>
                                {:else}
                                    <input
                                        type="radio"
                                        name="Careplans"
                                        value="Custom"
                                        disabled = {edit}
                                        checked={isCustomCareplanChecked}
                                        on:change={handleCareplanChange}
                                        class="ml-10 rounded-full radio radio-primary border-primary-200 hover:border-primary-400 radio-md"
                                    />
                                    {/if}
 							</td>
							<td>Custom</td>
						</div>
					</tr>
				</div>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>
                        {#if edit === true && isFHIRResourceStorageChecked === true}
                            <span class="tick text-green-500 ml-10">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="FHIRResourceStorage"
                                disabled = {edit}
                                bind:checked={isFHIRResourceStorageChecked}
                                class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
					</td>
					<td class="ml-4">FHIR Resource Storage</td>
				</tr>

		</tbody>
	</table>
</form>
