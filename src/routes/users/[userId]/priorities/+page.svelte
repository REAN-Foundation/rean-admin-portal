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
	import date from 'date-and-time';
	import type { PageServerData } from './$types';
  import { invalidate } from '$app/navigation';
  import { browser } from '$app/environment';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	  $: isLoading = false;
    $: priorityTypes = data.priorityTypes.Items;
    let retrivedretrivedPriorityTypes;
		const userId = $page.params.userId;
		const createRoute = `/users/${userId}/priorities/create`;
		const editRoute = (id) => `/users/${userId}/priorities/${id}/edit`;
		const viewRoute = (id) => `/users/${userId}/priorities/${id}/view`;
		const priorityRoute = `/users/${userId}/priorities`;

		const breadCrumbs = [{ name: 'Priorities', path: priorityRoute }];

    let type = undefined;
		let tags = undefined;
    let sortBy = 'Type';
    let sortOrder = 'ascending';
    let itemsPerPage = 10;
    let offset = 0;
    $: totalPriorityTypesCount = data.priorityTypes.TotalCount;
    let isSortingType = false;
    let isSortingTags = false;
    let items = 10;

		let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalPriorityTypesCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

    $:{
        if (type || tags) {
            paginationSettings.page = 0;
        }
    }
	async function searchPriorityType(model) {
    console.log("model--------",model);
		let url = `/api/server/priorities/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (type) url += `&type=${type}`;
		if (tags) url += `&tags=${tags}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const searchResult = await res.json();
		totalPriorityTypesCount = searchResult.TotalCount;
		priorityTypes = searchResult.Items.map((item, index) => ({ ...item, index: index + 1 }));
		if (totalPriorityTypesCount > 0) {
            isLoading = false;
        }
	}

	$: {
		priorityTypes = priorityTypes.map((item, index) => ({ ...item, index: index + 1 }));
		paginationSettings.size = totalPriorityTypesCount;
		retrivedretrivedPriorityTypes = priorityTypes.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
	if (retrivedretrivedPriorityTypes.length > 0) {
            isLoading = false;
        }
    }
	$: if (browser)
		searchPriorityType({
			type: type,
			tags: tags,
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
		if (type || tags) {
            isLoading = true;
            priorityTypes = [];
        }
		itemsPerPage = e.detail * (paginationSettings.page + 1);
		items = itemsPerPage;
	}

	function sortTable(columnName) {
		isSortingType = false;
		isSortingTags = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'Type') {
			isSortingType = true;
		} else if (columnName === 'Tags') {
			isSortingTags = true;
		}
		sortBy = columnName;
	}

	const handlePriorityDelete = async (id) => {
		const priorityId = id;
		console.log('priorityId', priorityId);
		await Delete({
			sessionId: data.sessionId,
			priorityId: priorityId
		});
		invalidate('app:priorities');
	};

	async function Delete(model) {
       await fetch(`/api/server/priorities`, {
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
				name="type"
				placeholder="Search by type"
				bind:value={type}
				class="input w-full"
		/>
		{#if type}
				<button
						type="button"
						on:click={() => { type = '';}}
						class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-0 cursor-pointer"
				>
						<Icon icon="material-symbols:close" class="text-lg" />
				</button>
		{/if}
</div>

<div class="relative w-auto grow">
		<input 
				type="text"
				name="tags"
				placeholder="Search by tags"
				bind:value={tags}
				class="input w-full"
		/>
		{#if tags}
				<button
						type="button"
						on:click={() => { tags = ''}}
						class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-0 cursor-pointer"
				>
						<Icon icon="material-symbols:close" class="text-lg" />
				</button>
		{/if}
</div>
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid">
		<thead class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th>
					<button on:click={() => sortTable('Type')}>
					 Type {isSortingType ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>
					<button on:click={() => sortTable('Tags')}>
						Tags {isSortingTags ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>Created Date</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedretrivedPriorityTypes.length <= 0 }
				<tr>
					<td colspan="6">{isLoading ? 'Loading...' : 'No records found'}</td>
				</tr>
			{:else}
				{#each retrivedretrivedPriorityTypes as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>{Helper.truncateText(row.Type, 20)}</a>
						</td>
						<td role="gridcell" aria-colindex={3} tabindex="0">{row.Tags.length >0 ? row.Tags : 'Not specified'}</td>
						<td role="gridcell" aria-colindex={4} tabindex="0"
							>{date.format(new Date(row.CreatedAt), 'DD-MMM-YYYY')}</td
						>
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
									on:click|preventDefault={() => confirmThis(handlePriorityDelete, row.id)}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a priority? </span>
							</Confirm>
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

