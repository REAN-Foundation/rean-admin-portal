<script lang="ts">
	import { browser } from '$app/environment';
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
	$: isLoading = false;
	$: knowledgeNuggets = data.knowledgeNuggets.Items;
    let retrivedKnowledgeNuggets;
	const userId = $page.params.userId;
	const knowledgeNuggetRoute = `/users/${userId}/knowledge-nuggets`;
	const editRoute = (id) => `/users/${userId}/knowledge-nuggets/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/knowledge-nuggets/${id}/view`;
	const createRoute = `/users/${userId}/knowledge-nuggets/create`;

	const breadCrumbs = [{ name: 'Knowledge Nuggets', path: knowledgeNuggetRoute }];

	let topicName = undefined;
	let tags = undefined;
	let sortBy = 'TopicName';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	$: totalKnowledgeNuggetsCount = data.knowledgeNuggets.TotalCount;
	let isSortingName = false;
	let isSortingTags = false;
	let items = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalKnowledgeNuggetsCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

    $:{
        if (topicName || tags) {
            paginationSettings.page = 0;
        }
    }
	async function searchKnowledgeNugget(model) {
    console.log(model);
		let url = `/api/server/knowledge-nuggets/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (topicName) url += `&topicName=${topicName}`;
		if (tags) url += `&tags=${tags}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const searchResult = await res.json();
        totalKnowledgeNuggetsCount = searchResult.TotalCount;
		knowledgeNuggets = searchResult.Items.map((item, index) => ({ ...item, index: index + 1 }));
		if (totalKnowledgeNuggetsCount > 0) {
            isLoading = false;
        }
	}

	$: {
        knowledgeNuggets = knowledgeNuggets.map((item, index) => ({ ...item, index: index + 1 }));
		paginationSettings.size = totalKnowledgeNuggetsCount;
        retrivedKnowledgeNuggets = knowledgeNuggets.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
	if (retrivedKnowledgeNuggets.length > 0) {
            isLoading = false;
        }
    }
	$: if (browser)
		searchKnowledgeNugget({
			topicName: topicName,
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
		if (topicName || tags) {
            isLoading = true;
            knowledgeNuggets = [];
        }
		itemsPerPage = e.detail * (paginationSettings.page + 1);
		items = itemsPerPage;
	}

	function sortTable(columnName) {
		isSortingName = false;
		isSortingTags = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'TopicName') {
			isSortingName = true;
		} else if (columnName === 'Tags') {
			isSortingTags = true;
		}
		sortBy = columnName;
	}

	const handleKnowledgeNuggetDelete = async (id) => {
		const knowledgeNuggetId = id;
		await Delete({
			sessionId: data.sessionId,
			knowledgeNuggetId
		});
		invalidate('app:knowledge-nuggests');
	};

	async function Delete(model) {
		await fetch(`/api/server/knowledge-nuggets`, {
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
				name="topicName"
				placeholder="Search by name"
				bind:value={topicName}
				class="input w-full"
		/>
		{#if topicName}
				<button
						type="button"
						on:click={() => { topicName = '';}}
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
	<!-- <input
		type="text"
		name="topicName"
		placeholder="Search by topic name"
		bind:value={topicName}
		class="input w-auto grow"
	/>
	<input 
		type="text"
		name="tags"
		placeholder="Search by tags" bind:value={tags}
		class="input w-auto grow"
	/> -->
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid">
		<thead class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th>
					<button on:click={() => sortTable('TopicName')}>
					 Name {isSortingName ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
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
			{#if retrivedKnowledgeNuggets.length <= 0 }
				<tr>
					<td colspan="6">{isLoading ? 'Loading...' : 'No records found'}</td>
				</tr>
			{:else}
				{#each retrivedKnowledgeNuggets as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>{Helper.truncateText(row.TopicName, 20)}</a>
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
									on:click|preventDefault={() => confirmThis(handleKnowledgeNuggetDelete, row.id)}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a knowledge nugget? </span>
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
