<script lang="ts">
    import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import InputChip from '$lib/components/input-chips.svelte';

	////////////////////////////////////////////////////////////////////////////////

	export let form;
	export let data;
	data.title = 'Clinical-Assessments Create'
	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/assessment-templates/create`;
	const assessmentsRoutes = `/users/${userId}/assessment-templates`;

	const breadCrumbs = [
		{ name: 'Assessments', path: assessmentsRoutes },
		{ name: 'Create', path: createRoute }
	];

	function handleSubmit() {
	  isSubmitting = true;
    } 
	$:isSubmitting = false ;

	$:if(form){
		isSubmitting = false;	
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/createAssessmentAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
	on:submit|preventDefault={handleSubmit}
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Assessment Template</th>
				<th class="text-end">
					<a href={assessmentsRoutes} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Title *</td>
				<td>
					<input
						type="text"
						name="title"
						required
						placeholder="Enter title here..."
						class="input w-full {form?.errors?.title ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.title}
						<p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Description</td>
				<td>
					<textarea name="description" placeholder="Enter description here..." class="input" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Type *</td>
				<td>
					<select required class="select w-full" name="type" placeholder="Select type here..." value="">
						<option>Daily Update</option>
						<option>Symptoms</option>
						<option>Survey</option>
						<option>Protocol</option>
						<option>Custom</option>
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Provider</td>
				<td>
					<input type="text" name="provider" placeholder="Enter provider here" class="input" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Provider Assessment Code</td>
				<td>
					<input
						type="text"
						name="providerAssessmentCode"
						placeholder="Enter provider assessment code here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Serve List Node Children At Once</td>
				<td>
					<input
						type="checkbox"
						name="serveListNodeChildrenAtOnce"
						class="checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md ml-2"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Scoring Applicable</td>
				<td>
					<input
						type="checkbox"
						name="scoringApplicable"
						class="checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md ml-2"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Tags</td>
				<td>
					<InputChip chips="variant-filled-error rounded-2xl" name="tags" />
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary" disabled={isSubmitting}>
			{isSubmitting ? 'Submitting...' : 'Submit'}
		</button>
	</div>
</form>
