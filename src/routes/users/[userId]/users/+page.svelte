<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
  import { invalidate } from '$app/navigation';
  import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
  import toast from 'svelte-french-toast';
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
    let retrivedUsers;
	$: users = data.users.Items;
  console.log('retrivedUsers@', data.users.Items);
	const userId = $page.params.userId;
	const userRoute = `/users/${userId}/users`;
	const editRoute = (id) => `/users/${userId}/users/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/users/${id}/view`;
	const createRoute = `/users/${userId}/users/create`;

	const breadCrumbs = [{ name: 'Users', path: userRoute }];

	let firstName = undefined;
	let email = undefined;
	let phone = undefined;
	let sortBy = 'FirstName';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	$: totalUsersCount = data.users.TotalCount;
	let isSortingName = false;
	let isSortingCode = false;
	let isSortingEmail = false;
	let isSortingPhone = false;
	let items = 10;
    let selectedRoles = data.selectedRoles;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalUsersCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

    $: {
        if (phone || email) {
            paginationSettings.page = 0;
        }
    }

    // const tmp = LocalStorageUtils.getItem('personRoles');
    // const personRoles = JSON.parse(tmp);
    // personRoles?.map((x) => {
    //     if (x.RoleName === "System admin" || 
    //         x.RoleName === "System user"  ||
    //         x.RoleName === "Tenant admin" ||
    //         x.RoleName === "Tenant user") {
    //             selectedRoles.push(x.id);
    //         }});
   
    $: console.log("selectedRole", selectedRoles);
    async function searchUser(model) {
      console.log(model);
      let url = `/api/server/users/search?`;
      if (sortOrder) url += `sortOrder=${sortOrder}`;
      else url += `sortOrder=ascending`;
      if (sortBy) url += `&sortBy=${sortBy}`;
      if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
      if (offset) url += `&pageIndex=${offset}`;
      if (firstName) url += `&firstName=${firstName}`;
      if (email) url += `&email=${email}`;
      if (phone) url += `&phone=${phone}`;
      if (selectedRoles.length > 0) url += `&roleIds=${selectedRoles}`;
      console.log('URL: ' + url);
      const res = await fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
      });
      const searchResult = await res.json();
      console.log('URL  : ' + url)
      console.log('Response: ' + JSON.stringify(searchResult));
      totalUsersCount = searchResult.TotalCount;
      users = searchResult.Items.map((item, index) => ({ ...item, index: index + 1 }));
	}

	$: {
		  users = users.map((item, index) => ({ ...item, index: index + 1 }));
      paginationSettings.size = totalUsersCount;
      retrivedUsers = users.slice(
      paginationSettings.page * paginationSettings.limit,
      paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
    }

	$: if (browser)
		searchUser({
			firstName: firstName,
			email: email,
			phone: phone,
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
		itemsPerPage = e.detail * (paginationSettings.page + 1);
		items = itemsPerPage;
	}

	function sortTable(columnName) {
		isSortingName = false;
		isSortingCode = false;
		isSortingEmail = false;
		isSortingPhone = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'First Name') {
			isSortingName = true;
		} else if (columnName === 'Email') {
			isSortingEmail = true;
		} else if (columnName === 'Phone') {
			isSortingPhone = true;
		}
		sortBy = columnName;
	}

	const handleUserDelete = async (id) => {
		const userId = id;
		await Delete({
			sessionId: data.sessionId,
			userId
		});
        invalidate('app:users');
	};

	async function Delete(model) {
    await fetch(`/api/server/users`, {
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
		name="firstName"
		placeholder="Search by contact number"
		bind:value={phone}
		class="input w-auto grow"
	/>
	<input
		type="text"
		name="email"
		placeholder="Search by email"
        bind:value={email}
		class="input w-auto grow"
	/>
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid">
		<thead class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th>
					<button on:click={() => sortTable('FirstName')}>
						First Name {isSortingName ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>
					<button on:click={() => sortTable('LastName')}>
						Last Name {isSortingCode ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th data-sort="Phone">Contact Number</th>
				<th>Email</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedUsers.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
				{#each retrivedUsers as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={!row.IsPermitted ? null : viewRoute(row.id)}>{Helper.truncateText(row.Person.FirstName, 20)} </a>
						</td>
						<td role="gridcell" aria-colindex={4} tabindex="0">
                            {row.Person.LastName || 'Not specified'}
                        </td>
						<td role="gridcell" aria-colindex={4} tabindex="0"
							>{row.Person.Phone || 'Not specified'}
                        </td
						>
						<td role="gridcell" aria-colindex={4} tabindex="0"
							>{row.Person.Email || 'Not specified'}</td
						>
						<td>
              <button on:click={() => {
                if (!row.IsPermitted) {
                  toast.error('Permission denied: Only resource owner & system admin are allowed to view & edit.')
                }
              }}>
							<a href={!row.IsPermitted ? null : editRoute(row.id)} class="btn p-2 -my-1 hover:variant-soft-primary">
								<Icon icon="material-symbols:edit-outline" class="text-lg" />
							</a>
            </button>
						</td>
						<td>
							<Confirm
								confirmTitle="Delete"
								cancelTitle="Cancel"
								let:confirm={confirmThis}
							>
								<button
									on:click|preventDefault={() => {
                    if (!row.IsPermitted) {
                      toast.error('Permission denied: Only resource owner & system admin are allowed to delete')
                    } else {
                      confirmThis(handleUserDelete, row.id)}
                    }
                  }
   								class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a user? </span>
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
