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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let goalTypes = data.goalTypes;
    let retrivedGoalTypes;
	
	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/goals/create`;
	const editRoute = (id) => `/users/${userId}/goals/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/goals/${id}/view`;
	const goalRoute = `/users/${userId}/goals`;

	const breadCrumbs = [{ name: 'Goals', path: goalRoute }];

	let sortOrder = false;
	let itemsPerPage = 10;
    let items = 10;
    let type = "Type";

    sort(sortOrder)
	$:{
		goalTypes = data.goalTypes;
		sort(sortOrder)
		goalTypes = goalTypes.map((item, index) => ({ ...item, index: index + 1 }));
	}

    function sort(sortOrder: boolean, isOrdeApplied: boolean = false){
        if (isOrdeApplied) {
            type = `Type ${sortOrder ? '▲' : '▼'}`
        }
		goalTypes = goalTypes.sort((a, b) => {
			let fa = a.Type.toLowerCase(),
				fb = b.Type.toLowerCase();
			if (fa < fb) {
				return !sortOrder ? -1 : 1;
			}
			if (fa > fb) {
				return !sortOrder ? 1 : -1;
			}
			return 0;
		});
	}
	let paginationSettings = {
		page: 0,
		limit: 10,
		size: data.goalTypes.length,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

    $:{
        goalTypes = goalTypes.map((item, index) => ({ ...item, index: index + 1 }));
        paginationSettings.size = data.goalTypes.length;
        retrivedGoalTypes = goalTypes.slice(
        paginationSettings.page * paginationSettings.limit,
        paginationSettings.page * paginationSettings.limit + paginationSettings.limit
    );
    }

    function onPageChange(e: CustomEvent): void {
		let pageIndex = e.detail;
		itemsPerPage = items * (pageIndex + 1);
	}

	function onAmountChange(e: CustomEvent): void {
		itemsPerPage = e.detail;
		items = itemsPerPage;
	}

	const handleGoalDelete = async (id) => {
		const goalId = id;
		console.log('goalId', goalId);
		await Delete({
			sessionId: data.sessionId,
			goalId: goalId
		});
		invalidate('app:goals');
	};

	async function Delete(model) {
	}
</script> 

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<a href={createRoute} class="btn variant-filled-secondary ml-auto">Add New</a>
</div>
<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid" >
		<thead class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th>
                    <button on:click={() =>sort(sortOrder=!sortOrder?true:false, true) }>
                        {type}
                   </button>
                </th>
				<th data-sort="Tags">Tags</th>
				<th>Created Date</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if goalTypes.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
				{#each goalTypes as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>{Helper.truncateText(row.Type, 20)} </a>
						</td>
						<td role="gridcell" aria-colindex={3} tabindex="0">{row.Tags.length > 0 ? row.Tags : 'Not specified'}</td>
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
									on:click|preventDefault={() => confirmThis(handleGoalDelete, row.id)}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a goal? </span>
							</Confirm>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<div class="w-full variant-soft-secondary rounded-lg p-2">
	<div >
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
