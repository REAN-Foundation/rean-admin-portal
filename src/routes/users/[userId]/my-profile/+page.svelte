<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';
  import { enhance } from '$app/forms';
	import Image from '$lib/components/image.svelte';

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
	let imageUrl = data.user.Person.ProfileImageURL ?? undefined;
	let imageResourceId = data.user.Person.ImageResourceId ?? undefined;

	console.log("user", data.user)
  let profileImage;
  let errorMessage = {
        Text: 'Max file upload size 150 KB',
        Colour: 'border-b-surface-700'
    }
  const MAX_FILE_SIZE = 1024 * 150;

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

	const onFileSelected = async (e) => {
    let file = e.target.files[0];
    const fileSize = file.size;
    if (fileSize > MAX_FILE_SIZE) {
      errorMessage.Text = "File should be less than 150 KB";
      errorMessage.Colour = 'text-error-500';
      profileImage.value = null;
      return;
    }

    errorMessage.Text = 'Please wait, file upload is in progress';
    errorMessage.Colour = 'text-error-500';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', file.name);

    try {
      const res = await fetch(`/api/server/file-resources/upload`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const response = await res.json();
			
      if (response.Status === 'success' && response.HttpCode === 201) {
        errorMessage.Text = "File uploaded successfully";
        errorMessage.Colour = 'text-success-500';
				const imageResourceId_ = response.Data.FileResources[0].id;
				console.log('ImageResource', imageResourceId_);
				if (imageResourceId_) {
					imageResourceId = imageResourceId_;
					return true;
				}
				console.log("imageResourceId" , imageResourceId);
      
      } else {
        errorMessage.Text = response.Message;
        errorMessage.Colour = 'text-error-500';
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      errorMessage.Text = 'Error uploading file: ' + error.message;
      errorMessage.Colour = 'text-error-500';
    }
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/updateProfileAction"
	enctype="multipart/form-data"
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
                        required
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
				<td class="align-top">Profile Image *</td>
				<td>
					{#if imageUrl === undefined}
						<input
							name="fileinput"
							type="file"
							required
							class="true input w-full"
							placeholder="Image"
							on:change={async (e) => await onFileSelected(e)}
						/>
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={imageUrl} w="24" h="24" />
						<input
							name="fileinput"
							type="file"
							class="true input w-full"
              bind:this={profileImage}
							placeholder="Image"
							on:change={async (e) => await onFileSelected(e)}
						/>
							{#if errorMessage}
									<p class= {`${errorMessage.Colour}`}>{errorMessage.Text}</p>
							{/if}
					{/if}
					<input type="hidden" name="imageResourceId" value={imageResourceId} />
					{#if form?.errors?.imageResourceId}
						<p class="text-error-500 text-xs">{form?.errors?.imageResourceId[0]}</p>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
