<script lang="ts">
	import { enhance } from "$app/forms";
  import { page } from '$app/stores';
  import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';

  const userId = $page.params.userId;

  const importRoute = `/users/${userId}/careplan/careplans/import`;
	const careplanRoutes = `/users/${userId}/careplan/careplans`;

  const breadCrumbs = [
		{ name: 'Careplans', path: careplanRoutes },
		{ name: 'Import', path: importRoute }
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />
<form
	method="post"
	action="?/importCareplan"
  use:enhance enctype="multipart/form-data"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700 "
>
<table class="table">
  <thead class="!variant-soft-secondary">
    <tr class="content-center">
      <th class="text-center">Import Careplan</th>
    </tr>
  </thead>
  <tbody class="!bg-white dark:!bg-inherit">
    <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
      <td class="text-center">
      <input 
      type="file" 
      name="file" 
      required
      class="true input w-[50%]"
      />
      </td>
    </tr>
    
    <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
      <td class="text-center">
        <button type="submit" class="btn variant-filled-secondary">Upload</button>
      </td>
    </tr>
   </tbody>
</form>

