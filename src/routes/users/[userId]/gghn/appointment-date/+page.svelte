<script lang="ts">
import { enhance } from '$app/forms';
import { page } from '$app/stores';

export let form;
const userId = $page.params.userId;


</script>

<form
	method="post"
	action="?/createDrugAction1"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Date of Appointment</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td> Add date*</td>
				<td>
					<input
						type="text"
						class="input {form?.errors?.drugName ? 'border-error-300 text-error-500' : ''}"
						name="date"
						placeholder="YYYY-MM-D"
						required
					/>
					{#if form?.errors?.drugName}
						<p class="text-error-500 text-xs">{form?.errors?.drugName[0]}</p>
					{/if}
				</td>
			</tr>
			
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
