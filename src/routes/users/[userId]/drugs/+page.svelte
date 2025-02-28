<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import date from 'date-and-time';
	import type { PageServerData } from './$types';
    import { invalidate } from '$app/navigation';
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
    let promise;
	let retrivedDrugs;
	$: drugs = data.drugs.Items;
	const userId = $page.params.userId;
	const drugRoute = `/users/${userId}/drugs`;
	const editRoute = (id) => `/users/${userId}/drugs/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/drugs/${id}/view`;
	const createRoute = `/users/${userId}/drugs/create`;

	const breadCrumbs = [{ name: 'Drugs', path: drugRoute }];

	let drugName = undefined;
	let genericName = undefined;
	let sortBy = 'DrugName';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	$: totalDrugsCount = data.drugs.TotalCount;
	let isSortingName = false;
	let isSortingGenericName = false;
	let items = 10;

    $: {
        if (drugName || genericName) {
            paginationSettings.page = 0;
        }
    }

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalDrugsCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	async function searchDrug(model) {
        let url = `/api/server/drugs/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (drugName) url += `&drugName=${model.drugName}`;
		if (genericName) url += `&genericName=${model.genericName}`;
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const searchResult = await res.json();
        totalDrugsCount = searchResult.TotalCount;
        drugs = searchResult.Items.map((item, index) => ({ ...item, index: index + 1 }));
	}

	$:{
		drugs = drugs.map((item, index) => ({ ...item, index: index + 1 }));
        paginationSettings.size = totalDrugsCount;
		retrivedDrugs = drugs.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
        );
	}
	$: if (browser)
		promise = searchDrug({
			drugName: drugName,
			genericName: genericName,
			itemsPerPage: itemsPerPage,
			pageIndex: offset,
			sortOrder: sortOrder,
			sortBy: sortBy
		});

	function onPageChange(e: CustomEvent): void {
		let pageIndex = e.detail;
        itemsPerPage = items * (pageIndex + 1);
	}

	function onAmountChange(e: CustomEvent): void {
        if (drugName || genericName) {
            drugs = [];
        }
        paginationSettings.page = 0;
        offset = 0;
        itemsPerPage = e.detail * (paginationSettings.page + 1);
 		items = itemsPerPage;
	}

	function sortTable(columnName) {
		isSortingName = false;
		isSortingGenericName = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'DrugName') {
			isSortingName = true;
		} else if (columnName === 'GenericName') {
			isSortingGenericName = true;
		}
		sortBy = columnName;
	}

	function resetSearch() {
		drugName = undefined;
		genericName = undefined;
		paginationSettings.page = 0;
  }

	const handleDrugDelete = async (id) => {
		const drugId = id;
		await Delete({
			sessionId: data.sessionId,
			drugId
		});
        drugName = undefined;
	    genericName = undefined;
		invalidate('app:drugs')
	};

	async function Delete(model) {
        await fetch(`/api/server/drugs`, {
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
				name="drugName"
				placeholder="Search by name"
				bind:value={drugName}
				class="input w-full"
		/>
		{#if drugName}
				<button
						type="button"
						on:click={() => { drugName = ''}}
						class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-0 cursor-pointer"
				>
						<Icon icon="material-symbols:close" class="text-lg" />
				</button>
		{/if}
	</div>
	<div class="relative w-auto grow">
		<input
				type="text"
				name="genericName"
				placeholder="Search by generic name"
				bind:value={genericName}
				class="input w-full"
		/>
		{#if genericName}
				<button
						type="button"
						on:click={() => { genericName = ''}}
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
					<button on:click={() => sortTable('DrugName')}>
						Name {isSortingName ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>
					<button on:click={() => sortTable('GenericName')}>
						Generic Name {isSortingGenericName ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>Ingredients</th>
				<th>Created Date</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
            {#await promise}
				<tr>
                    <td colspan="7">Loading...</td>
        		</tr>
            {:then data}
             {#if retrivedDrugs.length <= 0 }
				<tr>
                   <td colspan="6">No records found</td>
        		</tr>
			 {:else}
				{#each retrivedDrugs as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>
								{row.DrugName !== null && row.DrugName !== "" ? Helper.truncateText(row.DrugName, 20) : 'Not specified'}
							</a>
						</td>
						<td role="gridcell" aria-colindex={3} tabindex="0">
							{row.GenericName !== null && row.GenericName !== "" ? Helper.truncateText(row.GenericName, 40) : 'Not specified'}
						</td>
						<td role="gridcell" aria-colindex={4} tabindex="0">
							{row.Ingredients !== null && row.Ingredients !== "" ? Helper.truncateText(row.Ingredients, 40) : 'Not specified'}
						</td>
						<td role="gridcell" aria-colindex={5} tabindex="0">
							{date.format(new Date(row.CreatedAt), 'DD-MMM-YYYY')}</td
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
									on:click|preventDefault={() => confirmThis(handleDrugDelete, row.id)}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a drug? </span>
							</Confirm>
						</td>
					</tr>
				{/each}
             {/if}   
            {/await}
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
