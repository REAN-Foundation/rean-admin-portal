<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';
  import { enhance } from '$app/forms';

	//////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	let firstName = data.user.Person.FirstName;
	let lastName = data.user.Person.LastName;
	let phone = data.user.Person.Phone;
	let email = data.user.Person.Email;
	let roleId = data.user.Role.id;
	let splitPhoneNumber = phone.split('-');
	let [countryCode, phoneNumber] = splitPhoneNumber;

	//Original data
	let _firstName = firstName;
	let _lastName = lastName;
	let _email = email;
	let _countryCode = countryCode;
	let _phoneNumber = phoneNumber;

	console.log("phone",phone)
	function handleReset() {
		firstName = _firstName;
		lastName = _lastName;
		email = _email;
		countryCode =_countryCode;
		phoneNumber = _phoneNumber;
	}

	const userId = $page.params.userId;
	const userRoute = `/users/${userId}/home`;

	const breadCrumbs = [
		{
			name: 'My Profile',
			path: ''
		},
	];

</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/updateProfileAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>My Profile</th>
				<th class="text-end">
					<a href={userRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
		<input type="text" hidden name="roleId" bind:value={roleId}>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>First Name *</td>
				<td>
					<input
						type="text"
						name="firstName"
						bind:value={firstName}
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
						placeholder="Enter last name here..."
						class="input w-full {form?.errors?.lastName ? 'border-error-300' : 'border-primary-200'}"
					/>
					{#if form?.errors?.lastName}
						<p class="text-error-500 text-xs">{form?.errors?.lastName[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Contact Number *</td>
				<td class="flex gap-2">
					<select
						name="countryCode"
						bind:value={countryCode}
						class="select select-primary w-20 lg:w-20 md:w-20 sm:w-18 min-[320px]:w-12 "
					>
						<option>+1</option>
						<option>+91</option>
					</select>
					<input
						type="text"
						name="phone"
						bind:value={phoneNumber}
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
						bind:value={email}
						placeholder="Enter email here..."
						class="input"
					/>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
