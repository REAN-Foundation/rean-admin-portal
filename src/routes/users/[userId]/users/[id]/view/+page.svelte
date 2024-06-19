<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';
	
	//////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let firstName = data.user.Person.FirstName;
	let lastName = data.user.Person.LastName;
	let phone = data.user.Person.Phone;
	let email = data.user.Person.Email;
	let role = data.user.Role.RoleName;
	// let imageUrl = data.user.ImageUrl;
	const userId = $page.params.userId;
	const id = $page.params.id;
	const editRoute = `/users/${userId}/users/${id}/edit`;
	const viewRoute = `/users/${userId}/users/${id}/view`;
	const userRoute = `/users/${userId}/users`;

	const breadCrumbs = [
		{
			name: 'Users',
			path: userRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex w-full flex-wrap justify-end gap-2">
	<a href={editRoute} class="btn variant-filled-secondary">
		<Icon icon="material-symbols:edit-outline" />
		<span>Edit</span>
	</a>
</div>

<div class="table-container my-2 border border-secondary-100 dark:border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View User</th>
				<th class="text-end">
					<a href={userRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>First Name</td>
				<td>{firstName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Last Name</td>
				<td>{lastName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Contact Number</td>
				<td>{phone}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Email</td>
				<td>{email}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Role</td>
				<td>{role}</td>
			</tr>
			<!-- <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Image</td>
				<td>
					{#if imageUrl == 'undefined' || imageUrl == null}
						Not specified
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={imageUrl} w="24" h="24" />
					{/if}
				</td>
			</tr> -->
		</tbody>
	</table>
</div>
