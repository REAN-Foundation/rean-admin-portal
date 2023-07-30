<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import {
		Paginator,
		createDataTableStore,
		dataTableHandler,
		tableA11y,
		tableInteraction
	} from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let badges = data.badges;
	let badgeCategories = data.badgeCategories;
	let index = Number;
	badges = badges.map((item, index) => ({ ...item, index: index + 1 }));

	const dataTableStore = createDataTableStore(badges, {
		search: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});

	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/gamification/badges/create`;
	const editRoute = (id) => `/users/${userId}/gamification/badges/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/gamification/badges/${id}/view`;
	const badgeRoute = `/users/${userId}/gamification/badges`;

	const breadCrumbs = [{ name: 'Badges', path: badgeRoute }];

	let name = undefined;
	let categoryId = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	async function searchBadge(model) {
		let url = `/api/server/gamification/badges/search?`;
		// if (sortOrder) url += `sortOrder=${sortOrder}`;
		// else url += `sortOrder=ascending`;

		// if (sortBy) url += `&sortBy=${sortBy}`;
		// if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		// if (pageIndex) url += `&pageIndex=${pageIndex}`;
		if (name) url += `&name=${name}`;
		console.log('url', url);
		if (categoryId == 'Category') {
			url;
		} else {
			url += `&categoryId=${categoryId}`;
			console.log('url', url);
		}
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});

		const response = await res.json();
		badges = response.map((item, index) => ({ ...item, index: index + 1 }));
		console.log('badges', badges);
		dataTableStore.updateSource(badges);
	}

	$: if (browser) searchBadge({ name: name, categoryId: categoryId });

	dataTableStore.subscribe((model) => dataTableHandler(model));

	const handleBadgeDelete = async (e, id) => {
		const badgeId = id;
		console.log('badgeId', badgeId);
		await Delete({
			sessionId: data.sessionId,
			badgeId: badgeId
		});
		window.location.href = badgeRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/gamification/badges`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input
		type="text"
		name="name"
		placeholder="Search by name"
		bind:value={name}
		class="input w-auto grow"
	/>
	<select class="select w-auto grow" bind:value={categoryId}>
		<option disabled selected>Category</option>
		{#each badgeCategories as category}
			<option value={category.id}>{category.Name}</option>
		{/each}
	</select>
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid" use:tableInteraction use:tableA11y>
		<thead on:click={(e) => dataTableStore.sort(e)} on:keypress class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th data-sort="Name">Name</th>
				<th data-sort="Name">Category</th>
				<th>Description</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#each $dataTableStore.filtered as row}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
					<td role="gridcell" aria-colindex={2} tabindex="0">
						<a href={viewRoute(row.id)}>{Helper.truncateText(row.Name, 20)} </a>
					</td>
					<td role="gridcell" aria-colindex={3} tabindex="0">{row.Category.Name}</td>
					<td role="gridcell" aria-colindex={4} tabindex="0">{row.Description}</td>
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
							on:delete={(e) => {
								handleBadgeDelete(e, row.id);
							}}
						>
							<button
								on:click|preventDefault={() => confirmThis(handleBadgeDelete, row.id)}
								class="btn p-2 -my-1 hover:variant-soft-error"
							>
								<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
							</button>
							<span slot="title"> Delete </span>
							<span slot="description"> Are you sure you want to delete a badge? </span>
						</Confirm>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<div class="w-full variant-soft-secondary rounded-lg p-2">
	{#if $dataTableStore.pagination}
		<Paginator
			bind:settings={$dataTableStore.pagination}
			buttonClasses="btn-icon bg-surface-50 dark:bg-surface-900"
		/>
	{/if}
</div>