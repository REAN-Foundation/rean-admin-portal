<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';
    import { enhance } from '$app/forms';
    import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	
	//////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	let firstName = data.user.Person.FirstName;
	let lastName = data.user.Person.LastName;
	let phone = data.user.Person.Phone;
	let email = data.user.Person.Email;
	let role = data.user.Role.RoleName;
	// let imageUrl = data.user.ImageUrl;
	// $: avatarSource = imageUrl;
	let splitPhoneNumber = phone.split('-');
	//Original data
	let _firstName = firstName;
	let _lastName = lastName;
	let _role = role;
	let _phone = phone;
	let _email = email;
	// let _imageUrl = imageUrl;
	let selectedUserRoleId = data.user.Role.id;

	console.log("phone",phone)
	function handleReset() {
		firstName = _firstName;
		lastName = _lastName;
		role = _role;
		phone = _phone;
		email = _email;
		// imageUrl = _imageUrl
	}

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
			name: 'Edit',
			path: editRoute
		}
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
	// 		const imageUrl_ = response.Data.FileResources[0].Url;
	// 		console.log('imageUrl_', imageUrl_);
	// 		if (imageUrl_) {
	// 			imageUrl = imageUrl_;
	// 		}
	// 		console.log(imageUrl);
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
	// 		avatarSource = e.target.result;
	// 		await upload(e.target.result, filename);
	// 	};
	// };
	function getRoleIdByRoleName(event) {
        const selectedUserRole = event.target.value;
        const tmp = LocalStorageUtils.getItem('personRoles');
        const personRoles = JSON.parse(tmp);
        const selectedRole = personRoles?.find((x) => x.RoleName === selectedUserRole);
        if (selectedRole) {
            selectedUserRoleId = selectedRole.id;
        }
  }
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/updateUserAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit User</th>
				<th class="text-end">
					<a href={viewRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
						bind:value={firstName}
						required
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
						bind:value={lastName}
						required
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
						bind:value={phone}
						placeholder="Enter phone here..."
						class="input"
					/>
				</td>
			</tr> -->
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Contact Number *</td>
				<td class="flex gap-2">
					<select
						name="countryCode"
						bind:value={splitPhoneNumber[0]}
						class="select select-primary w-20 lg:w-20 md:w-20 sm:w-18 min-[320px]:w-12 "
					>
						<option>+1</option>
						<option>+91</option>
					</select>
					<input
						type="text"
						name="phone"
                        required
                        pattern="[0-9]*"
						bind:value={splitPhoneNumber[1]}
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
                        required
						bind:value={email}
						placeholder="Enter email here..."
						class="input"
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
						name="roleId"
						class="select w-full"
						placeholder="Select role here..."
            disabled
						bind:value={role}
						on:change={getRoleIdByRoleName}
					>
                    <option value="Tenant admin">Tenant Admin</option>
                    <option value="Tenant user">Tenant User</option>
                    <option value="System user">System User</option>
                    <option value="System admin">System Admin</option>
					</select>
					<input type="hidden" name="selectedUserRoleId" bind:value={selectedUserRoleId} />
				</td>
			</tr>
			<!-- <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Password</td>
				<td>
					<input
						type="password"
						name="password"
						bind:value={password}
						placeholder="Enter password here..."
						class="input w-full {form?.errors?.password
							? 'border-error-300'
							: 'border-primary-200'}"
					/>
					{#if form?.errors?.password}
						<p class="text-error-500 text-xs">{form?.errors?.password[0]}</p>
					{/if}
				</td>
			</tr>	 -->
			<!-- <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Image</td>
				<td>
					{#if imageUrl === 'undefined'}
						<input
							name="fileinput"
							type="file"
							class="true input w-full"
							placeholder="Image"
							on:change={async (e) => await onFileSelected(e)}
						/>
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg mb-2" source={imageUrl} w="24" h="24" />
						<input
							name="fileinput"
							type="file"
							class="true input w-full"
							placeholder="Image"
							on:change={async (e) => await onFileSelected(e)}
						/>
					{/if}
					<input type="hidden" name="imageUrl" value={imageUrl} />
				</td>
			</tr>	 -->
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
