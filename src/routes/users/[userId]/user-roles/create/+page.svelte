<script lang="ts">
  import { applyAction, deserialize, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
    import type { ActionResult } from '@sveltejs/kit';
    import toast from 'svelte-french-toast';

	///////////////////////////////////////////////////////////////////
	
	export let form;
	export let data;
	data.title ='Administration-User Roles Create'
	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/user-roles/create`;
	const personRoleTypesRoute = `/users/${userId}/user-roles`;

	const breadCrumbs = [
		{
			name: 'User Roles',
			path: personRoleTypesRoute,
			home: true
		},
		{
			name: 'Create',
			path: createRoute
		}
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
	action="?/createPersonRoleTypeAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
	on:submit|preventDefault={handleSubmit}
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create User Role</th>
				<th class="text-end">
					<a href={personRoleTypesRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Role Name *</td>
				<td>
					<input
						type="text"
						name="roleName"
						required
						placeholder="Enter role name here..."
						class="input w-full {form?.errors?.roleName ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.roleName}
						<p class="text-error-500 text-xs">{form?.errors?.roleName[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Description</td>
				<td>
					<textarea name="description" placeholder="Enter description here..." class="textarea" />
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary" disabled={isSubmitting}>
			{isSubmitting ? 'Submitting...' : 'Submit'}
		</button>
	</div>
</form>
