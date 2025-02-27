<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import Icon from '@iconify/svelte';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
    import { invalidate } from '$app/navigation';
    import toast from 'svelte-french-toast';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	$: isLoading = false;
	$: assessmentNodes = data.assessmentNodes.Items;
    let retrivedAssessmentNodes;
	const userId = $page.params.userId;
	const templateId = $page.params.templateId;
	const assessmentRoute = `/users/${userId}/assessment-templates`;
	const assessmentNodeRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes`;
	const editRoute = (id) =>
		`/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${id}/edit`;
	const viewRoute = (id) =>
		`/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${id}/view`;
	const createRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/create`;

	const breadCrumbs = [
		{ name: 'Assessments', path: assessmentRoute },
		{ name: 'Assessment-Nodes', path: assessmentNodeRoute }
	];

	let title = undefined;
	let nodeType = undefined;
	let sortBy = 'Title';
    let tags = undefined;
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	$: totalAssessmentNodesCount = data.assessmentNodes.TotalCount;
	let isSortingTitle = false;
	let isSortingNodeType = false;
	let items = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalAssessmentNodesCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	$: {
        if (title || nodeType || tags) {
            paginationSettings.page = 0;
        }
    }

	async function searchNode(model) {
		templateId;
		let url = `/api/server/assessments/assessment-nodes/search?templateId=${templateId}&`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;
		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (title) url += `&title=${model.title}`;
		if (nodeType) url += `&nodeType=${model.nodeType}`;
        if (tags) url += `&tags=${tags}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		totalAssessmentNodesCount = response.TotalCount;
		assessmentNodes = response.map((item, index) => ({ ...item, index: index + 1 }));
		if (totalAssessmentNodesCount > 0) {
            isLoading = false;
        }
	}

	$: {
        assessmentNodes = assessmentNodes.map((item, index) => ({ ...item, index: index + 1 }));
		paginationSettings.size = data.assessmentNodes.TotalCount;
        retrivedAssessmentNodes = assessmentNodes.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
	if (retrivedAssessmentNodes.length > 0) {
            isLoading = false;
        }
    }
	$: if (browser)
		searchNode({
			title: title,
			nodeType: nodeType,
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
		if (title || nodeType || tags) {
            isLoading = true;
            assessmentNodes = [];
        }
		itemsPerPage = e.detail;
		items = itemsPerPage;
	}

	function sortTable(columnName) {
		isSortingTitle = false;
		isSortingNodeType = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'Title') {
			isSortingTitle = true;
		} else if (columnName === 'NodeType') {
			isSortingNodeType = true;
		}
		sortBy = columnName;
	}

	const handleAssessmentNodeDelete = async (id) => {
		const assessmentNodeId = id;
		console.log('assessmentNodeId', assessmentNodeId);
		const response = await Delete({
			sessionId: data.sessionId,
			assessmentTemplateId: templateId,
			assessmentNodeId
		});
        if (response.Status === 'success') {
                toast.success(response.Message)
                invalidate('app:assessment-nodes');
            } 
        else 
            {
                toast.error(response.Message)
                invalidate('app:assessment-nodes');
            }
		
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/assessments/assessment-nodes`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
        return await response.json();
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<div class="relative w-auto grow">
        <input
            type="text"
            name="title"
            placeholder="Search by title"
            bind:value={title}
            class="input w-full"
        />
        {#if title}
            <button
                type="button"
                on:click={() => { title = ''}}
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-0 cursor-pointer"
            >
                <Icon icon="material-symbols:close" class="text-lg" />
            </button>
        {/if}
    </div>
    <div class="relative w-auto grow">
        <input
            type="text"
            name="type"
            placeholder="Search by node type"
            bind:value={nodeType}
            class="input w-full"
        />
        {#if nodeType}
            <button
                type="button"
                on:click={() => { nodeType = ''}}
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
				<th>Id</th>
				<th>
					<button on:click={() => sortTable('Title')}>
						Title {isSortingTitle ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>
					<button on:click={() => sortTable('NodeType')}>
						Node Type {isSortingNodeType ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>Query Response Type</th>
				<th>Tags</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedAssessmentNodes.length <= 0 }
				<tr>
					<td colspan="6">{isLoading ? 'Loading...' : 'No records found'}</td>
				</tr>
			{:else}
				{#each retrivedAssessmentNodes as row, rowIndex}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td>{row.index}</td>
						<td>
							<a href={viewRoute(row.id)}> {row.Title}</a>
						</td>
						<td>{row.NodeType}</td>
						<td>{row.QueryResponseType ? row.QueryResponseType : 'N/A'}</td>
						<td>{row.Tags.length >0 ? row.Tags : 'Not specified'}</td>
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
									on:click|preventDefault={() => confirmThis(handleAssessmentNodeDelete, row.id)}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete this assessment node? Associated children nodes will also be deleted.</span>
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
