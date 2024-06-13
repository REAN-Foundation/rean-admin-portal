<script>
  import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Icon from '@iconify/svelte';

  /////////////////////////////////////////////////////////////////////

	export let form;
	const userId = $page.params.userId;
  const homeRoute = `/users/${userId}/home`;
	const changePasswordRoute = `/users/${userId}/change-password`;

	const breadCrumbs = [
		{ name: 'Change Password', path: changePasswordRoute }
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
  method="post"
  action="?/changePasswordAction"
  class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
  use:enhance
>
  <table class="table">
    <thead class="!variant-soft-secondary">
      <tr>
        <th>Change Password</th>
				<th class="text-end">
					<a href={homeRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
      </tr>
    </thead>
    <tbody class="!bg-white dark:!bg-inherit">
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
        <td>Old Password *</td>
        <td>
          <input
            type="password"
            name="oldPassword"
            placeholder="Enter old password here..."
            class="input w-full {form?.errors?.oldPassword ? 'border-error-300 text-error-500' : ''}"
          />
          {#if form?.errors?.oldPassword}
            <p class="text-error-500 text-xs">{form?.errors?.oldPassword[0]}</p>
          {/if}
        </td>
      </tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
        <td>New Password *</td>
        <td>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter new password here..."
            class="input w-full {form?.errors?.newPassword ? 'border-error-300 text-error-500' : ''}"
          />
          {#if form?.errors?.newPassword}
            <p class="text-error-500 text-xs">{form?.errors?.newPassword[0]}</p>
          {/if}
        </td>
      </tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
        <td>Confirm New Password *</td>
        <td>
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm new password here..."
            class="input w-full {form?.errors?.confirmNewPassword ? 'border-error-300 text-error-500' : ''}"
          />
          {#if form?.errors?.confirmNewPassword}
            <p class="text-error-500 text-xs">{form?.errors?.confirmNewPassword[0]}</p>
          {/if}
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex gap-2 p-2 justify-end">
    <button type="submit" class="btn variant-filled-secondary">Submit</button>
  </div>
</form>