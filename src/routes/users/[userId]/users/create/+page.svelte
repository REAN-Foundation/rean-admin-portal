<script lang="ts">
  import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
  import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
  import type { PageServerData } from '../$types.ts';
	import PasswordInput from '$lib/components/input/password.input.svelte';

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let form;
  export let data: PageServerData;
  let userRoles = data.UserRoles;
	const userId = $page.params.userId;
  let selectedUserRoleId = undefined;
	const createRoute = `/users/${userId}/users/create`;
	const userRoute = `/users/${userId}/users`;

	const breadCrumbs = [
		{ name: 'Users', path: userRoute },
		{ name: 'Create', path: createRoute }
	];

	// const upload = async (imgBase64, filename) => {
	// 	const data = {};
	// 	console.log(imgBase64);
	// 	const imgData = imgBase64.split(',');
	// 	data['image'] = imgData[1];
	// 	console.log(JSON.stringify(data));
	// 	const res = await fetch(`/api/server/file-resources/upload`, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Accept: 'application/json',
	// 			filename: filename
	// 		},
	// 		body: JSON.stringify(data)
	// 	});
	// 	console.log(Date.now().toString());
	// 	const response = await res.json();
	// 	if (response.Status === 'success' && response.HttpCode === 201) {
	// 		// const imageUrl_ = response.Data.FileResources[0].Url;
	// 		console.log('imageUrl', imageUrl);
	// 		const imageResourceId_ = response.Data.FileResources[0].id;
	// 		console.log('imageResourceId_', imageUrl);
	// 		if (imageResourceId_) {
	// 			imageResourceId = imageResourceId_;
	// 		}
	// 	} else {
	// 		showMessage(response.Message, 'error');
	// 	}
	// };

	// const onFileSelected = async (e) => {
	// 	let f = e.target.files[0];
	// 	const filename = f.name;
	// 	let reader = new FileReader();
	// 	reader.readAsDataURL(f);
	// 	reader.onload = async (e) => {
	// 		fileinput = e.target.result;
	// 		await upload(e.target.result, filename);
	// 	};
	// };
	
    function getRoleIdByRoleName(event) {
        const selectedUserRole = event.target.value;
        const tmp = LocalStorageUtils.getItem('personRoles');
        const personRoles = JSON.parse(tmp);
				console.log ('personRoles', personRoles)
        const selectedRole = personRoles?.find((x) => x.RoleName === selectedUserRole);
        if (selectedRole) {
            selectedUserRoleId = selectedRole.id;
        }
  }
  
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/createUserAction"
    enctype="multipart/form-data"
	class= "table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create User</th>
				<th class="text-end">
					<a href={userRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>First Name *</td>
				<td>
					<input
						type="text"
						name="firstName"
                        required
                        value={form?.data?.firstName ?? ''}
						placeholder="Enter first name here..."
						class="input w-full {form?.errors?.firstName ? 'border-error-300' : 'border-primary-200'}"
					/>
					{#if form?.errors?.firstName}
						<p class="text-error-500 text-xs">{form?.errors?.firstName[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Last Name *</td>
				<td>
					<input
						type="text"
						name="lastName"
                        required
                        value={form?.data?.lastName ?? ''}
						placeholder="Enter last name here..."
						class="input w-full {form?.errors?.lastName ? 'border-error-300' : 'border-primary-200'}"
					/>
					{#if form?.errors?.lastName}
						<p class="text-error-500 text-xs">{form?.errors?.lastName[0]}</p>
					{/if}
				</td>
			</tr>
			<!-- <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Contact Number *</td>
				<td>
					<input
						type="text"
						name="phone"
						required
						placeholder="Enter phone here..."
						class="input w-full {form?.errors?.phone ? 'border-error-300' : 'border-primary-200'}"
					/>
					{#if form?.errors?.phone}
						<p class="text-error-500 text-xs">{form?.errors?.phone[0]}</p>
					{/if}
				</td>
			</tr> -->
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Contact Number *</td>
				<td class="flex gap-2">
					<select
						name="countryCode"
                        value={form?.data?.countryCode ?? '+1'}
						class="select select-primary w-20 lg:w-20 md:w-20 sm:w-18 min-[320px]:w-12"
					>
						<option>+1</option>
						<option>+91</option>
					</select>
					<input
						type="text"
						name="phone"
                        value={form?.data?.phone ?? ''}
                        pattern="[0-9]*"
                        required
						placeholder="Enter contact number here..."
						class="input {form?.errors?.phone ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.phone}
						<p class="text-error-500 text-xs">{form?.errors?.phone[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Email *</td>
				<td>
					<input
						type="email"
						name="email"
                        value={form?.data?.email ?? ''}
						placeholder="Enter email here..."
                        required
						class="input w-full {form?.errors?.email ? 'border-error-300' : 'border-primary-200'}"
					/>
					{#if form?.errors?.email}
						<p class="text-error-500 text-xs">{form?.errors?.email[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Role *</td>
				<td>
					<select
						name="role"
						class="select w-full"
                        required
                        value=""
                        on:change={getRoleIdByRoleName}
						placeholder="Select role here..."
					>
            {#each userRoles as role}
            <option value={`${role.Value}`}>{role.Title}</option>
            {/each}
					</select>
          <input type="hidden" name="selectedUserRoleId" bind:value={selectedUserRoleId} />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Password *</td>
				<td>
					<!-- <input
						type="password"
						name="password"
						placeholder="Enter password here..."
						class="input w-full {form?.errors?.password
							? 'border-error-300'
							: 'border-primary-200'}"
					/> -->
						<PasswordInput/>
                        {#if form?.errors?.password}
						    <p class="text-error-500 text-xs">{form?.errors?.password[0]}</p>
                        {:else}
                            <p class="border-b-surface-700">The password should be at least 8 characters long and must contain at least 1 capital letter, 1 small letter, 1 digit, and 1 special character.</p>
                        {/if}
					<!-- {#if form?.errors?.password} -->
						<!-- <p class="border-b-surface-700">Password should be of minimum 8 characters & contain at least 1 capital letter , 1 digit & 1 special character</p> -->
					<!-- {/if} -->
				</td>
			</tr>
			<!-- <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Image</td>
				<td>
					<input
						name="fileinput"
						type="file"
						class="true input w-full"
						placeholder="Image"
						on:change={async (e) => await onFileSelected(e)}
					/>
					<input type="hidden" name="imageResourceId" bind:value={imageResourceId} />
				</td>
			</tr> -->
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
