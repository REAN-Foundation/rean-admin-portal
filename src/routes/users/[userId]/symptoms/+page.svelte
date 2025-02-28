<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import {
		Paginator, type PaginationSettings,
	} from '@skeletonlabs/skeleton';
	import date from 'date-and-time';
	import type { PageServerData } from './$types';
    import { invalidate } from '$app/navigation';
    import { db } from '$lib/utils/local.db';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	$: isLoading = false;
	let retrivedSymptoms;
	$: symptoms = data.symptoms;

	const userId = $page.params.userId;
	const symptomRoute = `/users/${userId}/symptoms`;
	const editRoute = (id) => `/users/${userId}/symptoms/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/symptoms/${id}/view`;
	const createRoute = `/users/${userId}/symptoms/create`;

	const breadCrumbs = [{ name: 'Symptoms', path: symptomRoute }];

	let symptom = undefined;
	let tags = undefined;
	let sortBy = 'Symptom';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	$: totalSymptomsCount = data.symptomsCount;
	let isSortingSymptom = false;
	let isSortingTags = false;
	let items = 10;

    $: {
        if (symptom || tags) {
            paginationSettings.page = 0;
        }
    }

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalSymptomsCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;


	async function searchSymptom(model) {
		let url = `/api/server/symptoms/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (symptom) url += `&symptom=${model.symptom}`;
		if (tags) url += `&tags=${model.tags}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const searchResult = await res.json();
        totalSymptomsCount = searchResult.TotalCount;
        symptoms = searchResult.Items;;
		if (totalSymptomsCount > 0) {
			isLoading = false;
		}
	}

	$: {
		symptoms = symptoms.map((item, index) => ({ ...item, index: index + 1 }));
		paginationSettings.size = totalSymptomsCount;
		retrivedSymptoms = symptoms.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
	if (retrivedSymptoms.length > 0){
		isLoading = false;
	}
	}

	$: if (browser)
		searchSymptom({ 
			symptom, 
			tags,
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
		if (symptom || tags) {
            isLoading = true;
            symptoms = [];
        }
		itemsPerPage = e.detail * (paginationSettings.page + 1);
		items = itemsPerPage;
	}

	function sortTable(columnName) {
		isSortingSymptom = false;
		isSortingTags = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'Symptom') {
			isSortingSymptom = true;
		} else if (columnName === 'Tags') {
			isSortingTags = true;
		}
		sortBy = columnName;
	}
	
	const handleSymptomDelete = async (id,imageResourceId) => {
		const symptomId = id;
		console.log(`ImageUrl : ${imageResourceId}`);
		// if (imageResourceId) {
    //     // await db.imageCache.where({ srcUrl: imageUrl}).delete();
		// 		await db.imageCache.where({ srcUrl: getImageUrl(imageResourceId)}).delete();
    //     console.log(`Removed cached image for ${imageResourceId}`);
    // }
		await Delete({
			sessionId: data.sessionId,
			symptomId: symptomId,
			// ImageUrl : imageUrl 
		});
		invalidate('app:symptoms');
	};

	async function Delete(model) {
		await fetch(`/api/server/symptoms`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}

	// function getImageUrl(id:string):string{
	// 	return data.backendUrl+`/file-resources/${id}/download?disposition=inline`
	// }

	async function getImageUrl(id: string): Promise<string> {
  const cachedImage = await db.imageCache.where({ srcUrl: `/file-resources/${id}/download?disposition=inline` }).first();
  if (cachedImage) {
    return cachedImage.srcUrl;
  }
  return `${data.backendUrl}/file-resources/${id}/download?disposition=inline`;
}
	
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<div class="relative w-auto grow">
		<input
			type="text"
			name="symptom"
			placeholder="Search by symptom"
			bind:value={symptom}
			class="input w-full"
		/>
		{#if symptom}
				<button
						type="button"
						on:click={() => { symptom = '';}}
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
						on:click={() => { tags = '';}}
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
					<button on:click={() => sortTable('Symptom')}>
						Symptom {isSortingSymptom ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>
					<button on:click={() => sortTable('Tags')}>
						Tags {isSortingTags ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>Image</th>
				<th>Created Date</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedSymptoms.length <= 0 }
				<tr>
					<td colspan="7">{isLoading ? 'Loading...' : 'No records found'}</td>
				</tr>
			{:else}
				{#each retrivedSymptoms as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>{Helper.truncateText(row.Symptom, 20)}</a>
						</td>
						<td role="gridcell" aria-colindex={3} tabindex="0">{row.Tags.length > 0 ? row.Tags : 'Not specified'}</td>
						<!-- <td role="gridcell" aria-colindex="{4}" tabindex="0">
							{#if row.ImageResourceId === undefined || row.ImageResourceId===null}
							Not specified
							{:else}
							<Image cls="flex h-8 w-8 rounded-lg" source="{getImageUrl(row.ImageResourceId)}" w="24" h="24" />
							{/if}
						</td> -->
						<!-- <td role="gridcell" aria-colindex="{4}" tabindex="0">
							{#if row.ImageUrl === undefined || row.ImageUrl===null}
							Not specified
							{:else}
							<Image cls="flex h-8 w-8 rounded-lg" source="{row.ImageUrl}" w="24" h="24" />
							{/if}
							</td> -->
							<td role="gridcell" aria-colindex="{4}" tabindex="0">
								{#if row.ImageResourceId === undefined || row.ImageResourceId === null}
									Not specified
								{:else}
									{#await getImageUrl(row.ImageResourceId) then imageUrl}
										<Image cls="flex rounded-lg" source="{imageUrl}" w="24" h="24" />
									{:catch error}
										<p>Error loading image</p>
									{/await}
								{/if}
							</td>
						<td role="gridcell" aria-colindex={5} tabindex="0">
							{date.format(new Date(row.CreatedAt), 'DD-MMM-YYYY')}
						</td>
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
									on:click|preventDefault={() => confirmThis(handleSymptomDelete, row.id, row.imageResourceId)}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title">Delete</span>
								<span slot="description">Are you sure you want to delete a symptom?</span>
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
