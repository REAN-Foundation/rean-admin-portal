<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import {
		Paginator, type PaginationSettings,
	} from '@skeletonlabs/skeleton';
	import date from 'date-and-time';
	import type { PageServerData } from './$types';
    import { invalidate } from '$app/navigation';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	$: personTypes = data.personRoleTypes;
    console.log('PersonRoleTypes', personTypes);
	let retrivedTypes;
    const userId = $page.params.userId;
	const createRoute = `/users/${userId}/person-role-types/create`;
	const editRoute = (id) => `/users/${userId}/person-role-types/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/person-role-types/${id}/view`;
	const personRoleTypesRoute = `/users/${userId}/person-role-types`;

	const breadCrumbs = [{ name: 'Person-Roles', path: personRoleTypesRoute }];

    let totalPersonRoleCount = data.personRoleTypes.length
    let items = 10;
    let itemsPerPage = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalPersonRoleCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

    $:{
        personTypes = personTypes.map((item, index) => ({ ...item, index: index + 1 }));
        paginationSettings.size = data.personRoleTypes.length;
        retrivedTypes = personTypes.slice(
        paginationSettings.page * paginationSettings.limit,
        paginationSettings.page * paginationSettings.limit + paginationSettings.limit
    );
    }

	const handlePersonRoleTypeDelete = async (id) => {
		const personRoleTypeId = id;
		console.log('personRoleTypeId', personRoleTypeId);
		await Delete({
			sessionId: data.sessionId,
			personRoleTypeId: personRoleTypeId
		});
        invalidate('app:person-role-types');
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/person-role-types`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}

    function onPageChange(e: CustomEvent): void {
		let pageIndex = e.detail;
		itemsPerPage = items * (pageIndex + 1);
	}

	function onAmountChange(e: CustomEvent): void {
		itemsPerPage = e.detail;
		items = itemsPerPage;
	}
</script> 

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<a href={createRoute} class="btn variant-filled-secondary ml-auto">Add New</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid">
		<thead class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th data-sort="RoleName">Role Name</th>
				<th>Description</th>
				<th data-sort="CreatedAt">Created Date</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedTypes.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
				{#each retrivedTypes as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td>{row.index}</td>
						<td>
							<a href={viewRoute(row.id)}>{Helper.truncateText(row.RoleName, 20)} </a>
						</td>
						<td>{row.Description !== null ? Helper.truncateText(row.Description, 40) : 'Not specified'} </td>
						<td>{date.format(new Date(row.CreatedAt), 'DD-MMM-YYYY')}</td>
						<td>
							<a href={editRoute(row.id)} class="btn p-2 -my-1 hover:variant-soft-primary">
								<Icon icon="material-symbols:edit-outline" class="text-lg" />
							</a>
						</td>
						<td>
							<Confirm
								confirmTitle="Delete"
								cancelTitle="Cancel"
								let:confirm={confirmThis}
							>
								<button
									on:click|preventDefault={() => confirmThis(handlePersonRoleTypeDelete, row.id)}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a person role type? </span>
							</Confirm>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<div class="w-full variant-soft-secondary rounded-lg p-2">
	<!-- <div class="invisible"> -->
        <div>
		<Paginator
			bind:settings={paginationSettings}
            on:page={onPageChange}
		    on:amount={onAmountChange}
			buttonClasses=" text-primary-500"
            regionControl = 'bg-surface-100 rounded-lg btn-group text-primary-500 border border-primary-200'
            controlVariant = 'rounded-full text-primary-500 '
            controlSeparator = 'fill-primary-400'
		/>
	</div>
</div>
