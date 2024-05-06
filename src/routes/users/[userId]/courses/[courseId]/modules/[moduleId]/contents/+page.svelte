<script lang="ts">
    import { browser } from '$app/environment';
    import { invalidate } from '$app/navigation';
    import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { page } from '$app/stores';
    import Icon from '@iconify/svelte';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    export let data: PageServerData;
	$: modules = data.courseContent.Items;
    let retrivedCourseContent;
	const userId = $page.params.userId;
	const courseId = $page.params.courseId;
    const moduleId = $page.params.moduleId;
    $: console.log('courseId: ' + courseId);
	const moduleRoute = `/users/${userId}/courses/${courseId}/modules`;
	const createRoute = `/users/${userId}/courses/${courseId}/modules/create`;
    const contentRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents`
	const breadCrumbs = [
        {
            name: 'Courses',
            path: `/users/${userId}/courses/${courseId}/view`
        },
        { 
            name: 'Modules', 
            path: moduleRoute 
        },
        {
            name: 'Content', 
            path: contentRoute 
        },
    ];
	let title = undefined;
    let durationInMins = undefined;
	let sortBy = 'Title';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	let totalModuleCount = data.courseContent.TotalCount;
	let isSortingName = false;
	let items = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalModuleCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	async function searchCourseContents(model) {
		let url = `/api/server/course-contents/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (title) url += `&title=${model.title}`;
        url += `&courseId=${courseId}`;
        if (durationInMins) url += `&durationInMins=${model.durationInMins}`
        url += `&moduleId=${moduleId}`
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		console.log('response: ' + response);
        modules = response.map((item, index) => ({ ...item, index: index + 1 }));
	}

	$:  {
        modules = modules.map((item, index) => ({ ...item, index: index + 1 }));
        paginationSettings.size = data.courseContent.TotalCount;
        retrivedCourseContent = modules.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
    }
	$: if (browser)
	searchCourseContents({
			title: title,
            durationInMins: durationInMins,
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
		itemsPerPage = e.detail;
		items = itemsPerPage;
	}

	const handleModuleContentDelete = async (id) => {
		const courseContentId = id;
		await Delete({
			sessionId: data.sessionId,
			courseContentId
		});
		invalidate('app:courses-modules-contents');
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/course-contents`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input type="text" bind:value={title} placeholder="Search by title" class="input w-auto grow" />
	<input type="text" bind:value={durationInMins} placeholder="Search by duration" class="input w-auto grow" />
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Id</th>
				<th>Title</th>
				<th>Description</th>
				<th>Duration</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
            {#if retrivedCourseContent.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
			{#each retrivedCourseContent as row, rowIndex}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>{rowIndex + 1}</td>
					<!-- <td>{row.Name}</td> -->
                    <td>
                        <a href="/users/{userId}/courses/{courseId}/modules/{moduleId}/contents/{row.id}/view">{row.Title} </a>
                    </td>
					<td>{row.Description ?? 'Not specified'}</td>
					<td>{row.DurationInMins ?? 'Not specified'}</td>
					<td>
						<a
							href= "/users/{userId}/courses/{courseId}/modules/{row.id}/edit"
							class="btn p-2 -my-1 hover:variant-soft-primary"
						>
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
								on:click|preventDefault={() => confirmThis(handleModuleContentDelete, row.id)}
								class="btn p-2 -my-1 hover:variant-soft-error"
							>
								<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
							</button>

							<span slot="title">Delete</span>
							<span slot="description">Are you sure you want to delete a module?</span>
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
