<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import {
		Paginator,
		type PaginationSettings
	} from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
  import { invalidate } from '$app/navigation';
  import { browser } from '$app/environment';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	  $: isLoading = false;
    $: labRecords = data.labRecordTypes.Items;
    let retrivedLabRecords;
		const userId = $page.params.userId;
		const createRoute = `/users/${userId}/lab-records/create`;
		const editRoute = (id) => `/users/${userId}/lab-records/${id}/edit`;
		const viewRoute = (id) => `/users/${userId}/lab-records/${id}/view`;
		const labRecordTypesRoute = `/users/${userId}/lab-records`;
		const breadCrumbs = [{ name: 'Lab Records', path: labRecordTypesRoute }];

    let typeName = undefined;
		let displayName = undefined;
    let sortBy = 'TypeName';
    let sortOrder = 'ascending';
    let itemsPerPage = 10;
    let offset = 0;
    $: totalLabRecordsCount = data.labRecordTypes.TotalCount;
    let isSortingTypeName = false;
    let isSortingDisplayName = false;
    let items = 10;

		let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalLabRecordsCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

    $:{
        if (typeName || displayName) {
            paginationSettings.page = 0;
        }
    }
	async function searchLabRecords(model) {
		let url = `/api/server/lab-record-types/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (typeName) url += `&typeName=${typeName}`;
		if (displayName) url += `&displayName=${displayName}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const searchResult = await res.json();
		totalLabRecordsCount = searchResult.TotalCount;
		labRecords = searchResult.Items.map((item, index) => ({ ...item, index: index + 1 }));
		if (totalLabRecordsCount > 0) {
            isLoading = false;
        }
	}

	$: {
		labRecords = labRecords.map((item, index) => ({ ...item, index: index + 1 }));
		paginationSettings.size = totalLabRecordsCount;
		retrivedLabRecords = labRecords.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
	if (retrivedLabRecords.length > 0) {
            isLoading = false;
        }
    }
	$: if (browser)
		searchLabRecords({
			typeName: typeName,
			displayName: displayName,
			itemsPerPage: itemsPerPage,
			pageIndex: offset,
			sortOrder: sortOrder,
			sortBy: sortBy
		});

	function onPageChange(e: CustomEvent): void {
		isLoading = true;
		let pageIndex = e.detail;
		itemsPerPage = items * (pageIndex + 1);
	}

	function onAmountChange(e: CustomEvent): void {
		if (typeName || displayName) {
            isLoading = true;
            labRecords = [];
        }
		itemsPerPage = e.detail * (paginationSettings.page + 1);
		items = itemsPerPage;
	}

	function sortTable(columnName) {
		isSortingTypeName = false;
		isSortingDisplayName = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'TypeName') {
			isSortingTypeName = true;
		} else if (columnName === 'DisplayName') {
			isSortingDisplayName = true;
		}
		sortBy = columnName;
	}

	const handleLabRecordTypeDelete = async (id) => {
			const labRecordTypeId = id;
			await Delete({
			sessionId: data.sessionId,
			labRecordTypeId: labRecordTypeId
		});
		invalidate('app:lab-records')
	};

	async function Delete(model) {
       await fetch(`/api/server/lab-record-types`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<div class="relative w-auto grow">
		<input
			type="text"
			name="typeName"
			placeholder="Search by type name"
			bind:value={typeName}
			class="input w-full"
		/>
		{#if typeName}
				<button
						type="button"
						on:click={() => { typeName = '';}}
						class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-0 cursor-pointer"
				>
						<Icon icon="material-symbols:close" class="text-lg" />
				</button>
		{/if}
	</div>
	<div class="relative w-auto grow">
		<input 
				type="text"
				name="displayName"
				placeholder="Search by display name"
				bind:value={displayName}
				class="input w-full"
		/>
		{#if displayName}
				<button
						type="button"
						on:click={() => { displayName = '';}}
						class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-0 cursor-pointer"
				>
						<Icon icon="material-symbols:close" class="text-lg" />
				</button>
		{/if}
	</div>
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid" >
		<thead class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th>
					<button on:click={() =>sortTable('TypeName')}>
						Type Name {isSortingTypeName ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
                         
					</button>
				</th>
				<th>
					<button on:click={()=>sortTable('DisplayName')}>
						Display Name {isSortingDisplayName ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>Minimum</th>
				<th>Maximum</th>
				<th>Unit</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedLabRecords.length <= 0 }
				<tr>
					<td colspan="8">{isLoading ? 'Loading...' : 'No records found'}</td>
				</tr>
			{:else}
				{#each retrivedLabRecords as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>{Helper.truncateText(row.TypeName, 20)} </a>
						</td>
						<td role="gridcell" aria-colindex={3} tabindex="0"
							>{row.DisplayName !== null && row.DisplayName !== "" ? Helper.truncateText(row.DisplayName, 20) : 'Not specified'}
						</td>
						<td role="gridcell" aria-colindex={4} tabindex="0">{row.NormalRangeMin !== null ? row.NormalRangeMin : 'Not specified'}</td>
						<td role="gridcell" aria-colindex={5} tabindex="0">{row.NormalRangeMax !== null ? row.NormalRangeMax : 'Not specified'}</td>
						<td role="gridcell" aria-colindex={6} tabindex="0">{row.Unit !== null && row.Unit !== '' ? row.Unit : 'Not specified'}</td>
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
									on:click|preventDefault={() =>
									confirmThis(handleLabRecordTypeDelete, row.id)
									}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a lab record? </span> 							</Confirm>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<div class="w-full variant-soft-secondary rounded-lg p-2">
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
