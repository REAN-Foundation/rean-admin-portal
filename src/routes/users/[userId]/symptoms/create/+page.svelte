<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import InputChip from '$lib/components/input-chips.svelte';
  import { enhance } from '$app/forms';
 
////////////////////////////////////////////////////////////////////////
  export let data;
	export let form;
	data.title = 'Clinical-Symptoms Create'
	const userId = $page.params.userId;
	let imageResourceId = undefined;
  let symptomImage;
	
    let errorMessage = {
        Text: 'Max file upload size 150 KB',
        Colour: 'border-b-surface-700'
    }
  const MAX_FILE_SIZE = 1024 * 150;
	const createRoute = `/users/${userId}/symptoms/create`;
	const symptomRoute = `/users/${userId}/symptoms`;

	const breadCrumbs = [
		{ name: 'Symptoms', path: symptomRoute },
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
	// 			'Content-Type': 'multipart/form-data',
	// 			Accept: 'application/json',
	// 			filename: filename
	// 		},
	// 		body: JSON.stringify(data)
	// 	});
	// 	console.log(Date.now().toString());
	// 	const response = await res.json();
	// 	if (response.Status === 'success' && response.HttpCode === 201) {
	// 		const imageUrl = response.Data.FileResources[0].url;
	// 		console.log('imageResourceId', imageUrl);
	// 		const imageResourceId_ = response.Data.FileResources[0].id;
	// 		console.log('ImageResource', imageResourceId_);
	// 		if (imageResourceId_) {
	// 			imageResourceId = imageResourceId_;
  //               return true;
	// 		}
	// 		console.log(imageResourceId);
	// 	} else {
	// 		showMessage(response.Message, 'error');
  //           return false;
	// 	}
	// };

	// const onFileSelected = async (e) => {
	// 	let f = e.target.files[0];
  //       const fileSize = f.size;
  //       if (fileSize > MAX_FILE_SIZE) {
  //           errorMessage.Text = "File should be less than 150 KB";
  //           errorMessage.Colour = 'text-error-500'
  //           symptomImage.value = null;
  //           return;
  //       }
  //       errorMessage.Text = 'Please wait file upload is in progress';
  //       errorMessage.Colour = 'text-error-500';
  //       console.log(`File size: ${fileSize} bytes`);
	// 	const filename = f.name;
	// 	let reader = new FileReader();
	// 	// reader.readAsDataURL(f);
	// 	reader.onload = async (e) => {
	// 		fileinput = e.target.result;
	// 		const isFileUploaded = await upload(e.target.result, filename);
  //           if (isFileUploaded) {
  //               errorMessage.Text = "File uploaded successfully";
  //               errorMessage.Colour = 'text-success-500'
  //               return;
  //           }
  //           errorMessage.Text = 'Error in file upload';
  //           errorMessage.Colour = 'text-error-500'
  //           symptomImage.value = null;
  //           return;
	// 	};
	// };

const onFileSelected = async (e) => {
    let file = e.target.files[0];
    const fileSize = file.size;
    if (fileSize > MAX_FILE_SIZE) {
      errorMessage.Text = "File should be less than 150 KB";
      errorMessage.Colour = 'text-error-500';
      symptomImage.value = null;
      return;
    }

    errorMessage.Text = 'Please wait, file upload is in progress';
    errorMessage.Colour = 'text-error-500';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', file.name);

    try {
      const res = await fetch(`/api/server/file-resources/upload`, {
			// 	headers: {
			// 	'Content-Type': 'application/json',
			// 	Accept: 'application/json',
			// },
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const response = await res.json();
			
      if (response.Status === 'success' && response.HttpCode === 201) {
				const imageUrl = response.Data.FileResources[0].url;
				console.log('imageResourceId', imageUrl);
				const imageResourceId_ = response.Data.FileResources[0].id;
				console.log('ImageResource', imageResourceId_);
				if (imageResourceId_) {
					imageResourceId = imageResourceId_;
					errorMessage.Text = "File uploaded successfully";
					errorMessage.Colour = 'text-success-500';
									return true;
				}
				console.log(imageResourceId);
      
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

	function handleSubmit() {
	  isSubmitting = true;
    } 
	$:isSubmitting = false ;

	$:if(form){
		isSubmitting = false;	
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
  enctype="multipart/form-data"
	action="?/createSymptomAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
	on:submit|preventDefault={handleSubmit}
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Symptom</th>
				<th class="text-end">
					<a href={symptomRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Symptom *</td>
				<td>
					<input
						type="text"
						name="symptom"
						required
						placeholder="Enter symptom here..."
						class="input w-full {form?.errors?.symptom ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.symptom}
						<p class="text-error-500 text-xs">{form?.errors?.symptom[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Description</td>
				<td>
					<textarea name="description" placeholder="Enter description here..." class="textarea" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Tags</td>
				<td>
					<InputChip chips="variant-filled-error rounded-2xl" name="tags" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Language *</td>
				<td>
					<input
						type="text"
						name="language"
						required
						placeholder="Enter language here..."
						class="input w-full {form?.errors?.language ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.language}
						<p class="text-error-500 text-xs">{form?.errors?.language[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Image *</td>
				<td>
					<input
						name="fileinput"
						type="file"
						required
						class="true input w-full"
						placeholder="Image"
                        bind:this={symptomImage}
						on:change={async (e) => await onFileSelected(e)}
					/>
                    {#if errorMessage}
                        <p class= {`${errorMessage.Colour}`}>{errorMessage.Text}</p>
                    {/if}
					<input type="hidden" name="imageResourceId" value={imageResourceId} />
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary" disabled={isSubmitting}>
			{isSubmitting ? 'Submitting...' : 'Submit'}
		</button>
	</div>
</form>
