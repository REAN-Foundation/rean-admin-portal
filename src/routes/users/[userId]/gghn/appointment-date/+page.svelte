<script lang="ts">
import { enhance } from '$app/forms';
import { page } from '$app/stores';
    import toast from 'svelte-french-toast';
    import type { ActionData } from './$types';
    import { invalidate } from '$app/navigation';
    import { date } from 'zod';



export let form: ActionData;
    $: {
        if (form?.Status) {
            if (form.Status=== 'success') {
                toast.success(form.Status)
            }
            if (form.Status=== 'failure') {
                toast.error(form.Status)
            }
            invalidate('app:appointment-upload');
        }
    }
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
						class="input" 
						name="date"
						placeholder="YYYY-MM-D"
						required
					/>
					
				</td>
			</tr>
			
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
