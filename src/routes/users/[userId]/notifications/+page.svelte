<!-- <script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import date from 'date-and-time';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let notifications = data.notification.Items;

	const userId = $page.params.userId;
	const notificationRoute = `/users/${userId}/notifications`;
	const editRoute = (id) => `/users/${userId}/notifications/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/notifications/${id}/view`;
	const createRoute = `/users/${userId}/notifications/create`;

	const breadCrumbs = [{ name: 'Notifications', path: notificationRoute }];

	let title = undefined;
	let type = undefined;
	let sortBy = 'Title';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	let totalNotificationsCount = data.notification.TotalCount;
	let isSortingTitle = false;
	let isSortingType = false;
	let items = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalNotificationsCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	async function searchNotification(model) {
    console.log(model);
		let url = `/api/server/notifications/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (title) url += `&title=${title}`;
		if (type) url += `&type=${type}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		notifications = response.map((item, index) => ({ ...item, index: index + 1 }));
	}

	$: retrivedNotifications = notifications.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	$: if (browser)
		searchNotification({
			title: title,
			type: type,
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

	function sortTable(columnName) {
		isSortingTitle = false;
		isSortingType = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'Title') {
			isSortingTitle = true;
		} else if (columnName === 'Type') {
			isSortingType = true;
		}
		sortBy = columnName;
	}

	const handleNotificationDelete = async (id) => {
		const notificationId = id;
		await Delete({
			sessionId: data.sessionId,
			notificationId
		});
		window.location.href = notificationRoute;
	};

	async function Delete(model) {
		await fetch(`/api/server/notifications`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script> -->
<!-- 
<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input
		type="text"
		name="title"
		placeholder="Search by title"
		bind:value={title}
		class="input w-auto grow"
	/>
	<input
		type="text"
		name="type"
		placeholder="Search by type"
		bind:value={type}
		class="input w-auto grow"
	/>
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div> -->
<!-- 
<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid">
		<thead class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th>
					<button on:click={() => sortTable('Title')}>
						Title {isSortingTitle ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th data-sort="index">Body</th>
				<th>
					<button on:click={() => sortTable('Type')}>
						Type {isSortingType ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>Created Date</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedNotifications.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
				{#each retrivedNotifications as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>{Helper.truncateText(row.Title, 20)}</a>
						</td>
						<td role="gridcell" aria-colindex={3} tabindex="0"
							>{row.Body !== null ? Helper.truncateText(row.Body, 40) : 'Not specified'}</td
						>
						<td role="gridcell" aria-colindex={4} tabindex="0">{row.Type}</td>
						<td role="gridcell" aria-colindex={5} tabindex="0"
							>{date.format(new Date(row.SentOn), 'DD-MMM-YYYY')}</td
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
									on:click|preventDefault={() => confirmThis(handleNotificationDelete, row.id)}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a notification? </span>
							</Confirm>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div> -->
<!-- 
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
</div> -->

<script lang="ts">
    import { enhance } from '$app/forms';
    import { afterNavigate } from '$app/navigation';
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import { NotificationTopics, NotificationTypes } from '$lib/types/notification.topics.js';
    import { showMessage } from '$lib/utils/message.utils';
    import Icon from '@iconify/svelte';

    ////////////////////////////////////////////////////////////////////////////////////

    export let form;
    const userId = $page.params.userId;

    const createRoute = `/users/${userId}/notifications/create`;
    const notificationRoute = `/users/${userId}/notifications`;

    const breadCrumbs = [
        { name: 'Notifications', path: notificationRoute, home: true }
        // { name: 'Create', path: createRoute }
    ];

	let topic: string, title: string, body: string, url: string;
	
	const init = () => {
		topic = 'All_Users';
		title = '';
		body = '';
		url = '';
	}

	init();

	afterNavigate(({from, to}) => {
		init();
	});

</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
    method="post"
    action="?/createNotificationAction"
    class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
    use:enhance
>
    <table class="table">
        <thead class="!variant-soft-secondary">
            <tr>
                <th>Send Notification</th>
                <th class="text-end">
                    <a
                        href={notificationRoute}
                        class="btn p-2 -my-2 variant-soft-secondary"
                    >
                        <Icon
                            icon="material-symbols:close-rounded"
                            class="text-lg"
                        />
                    </a>
                </th>
            </tr>
        </thead>
        <tbody class="!bg-white dark:!bg-inherit">
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Topic *</td>
                <td>
                    <select
                        class="select w-full"
                        name="topic"
                        placeholder="Select topic here..."
						bind:value={topic}
                    >
                        {#each Object.entries(NotificationTopics) as [key, value]}
                            <option
                                value={key}
                                selected={key === 'All_Users'}>{value}</option
                            >
                        {/each}
                    </select>
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Title *</td>
                <td>
                    <input
                        type="text"
                        name="title"
                        required
						bind:value={title}
                        placeholder="Enter title here..."
                        class="input w-full {form?.errors?.title ? 'border-error-300 text-error-500' : ''}"
                        minlength="2"
                        maxlength="50"
                    />
                    {#if form?.errors?.title}
                        <p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
                    {/if}
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td class="align-top">Body *</td>
                <td>
                    <textarea
                        name="body"
                        placeholder="Enter body here..."
                        class="textarea"
                        required
						bind:value={body}
                        minlength="2"
                        maxlength="150"
                    />
                </td>
            </tr>
            <!-- <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Type *</td>
				<td>
					<select class="select w-full" name="type" placeholder="Select type here...">
						{#each Object.entries(NotificationTypes) as [key, value]}
							<option value={key} selected={key === 'General'}>{value}</option>
						{/each}
					</select>
				</td>
			</tr> -->
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Url</td>
                <td>
                    <input
                        type="url"
                        name="url"
                        class="input w-full"
						bind:value={url}
                    />
                </td>
            </tr>
        </tbody>
    </table>
    <div class="flex p-2 justify-end">
        <button
            type="submit"
            class="btn variant-filled-secondary">Submit</button
        >
    </div>
</form>
