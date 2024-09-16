<script lang="ts">
import { enhance } from '$app/forms';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";

import { onMount } from "svelte";
import { page } from '$app/stores';
import toast from 'svelte-french-toast';
import type { ActionData, PageServerData } from './$types';
import { invalidate } from '$app/navigation';
import { date } from 'zod';
import { derived } from 'svelte/store';
export let data: PageServerData;
export let form;

let respData = data;
console.log("userData...",respData.UserDetails);
let userData = respData.UserDetails.tenantName
let canceledDates = [];	
let selectedDates = [];
let startdate = '';
let enddate = '';

  onMount(() => {
  flatpickr("#datePicker", {
	mode: "multiple",
	minDate: "today",
	dateFormat: "Y-m-d",
	onChange: (selectedDatesArray) => 
	{
        selectedDates = selectedDatesArray.map(date => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        });
      }
    });
  });
 


console.log('Response Dates :', form?.data.resp);
canceledDates =  form?.data.resp;

const handleSubmit = (event) => {
    event.preventDefault();
    const hiddenInput = document.getElementById('hiddenDates');
    if (hiddenInput instanceof HTMLInputElement) {
      hiddenInput.value = JSON.stringify(selectedDates);
    }
	console.log("hiddenInput.value",selectedDates);
    event.target.submit();
  };
</script>
<!-- if tenant is GMU -->

<!-- <svelte:head>
	{#if userData && userData.includes('GGHN') }
  		<!-- <title>GGHN Appointment Follow-up</title>
  		<meta name="description" content="Appointment Upload" />
	{:else}
		<title>GMU Appointment Upload</title>
	{/if}
	  
</svelte:head> -->
<body>

	{#if userData && userData.includes('GGHN') }
	<form
		method="post"
		action="?/setReminderAction"
		class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
		
	>
		<table class="table">
			<thead class="!variant-soft-secondary">
				<tr>
					<th>Trigger Follow-Up Reminder </th>
				</tr>
			</thead>
			<tbody class="!bg-white dark:!bg-inherit">
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td> Add date*</td>
					<td>
						<input
							type="date"
							class="input" 
							name="date"
							required
						/>
						
					</td>
				</tr>
				
			</tbody>
		</table>
		<div class="flex gap-2 p-2 justify-end">
			<button type="submit" class="btn variant-filled-secondary">Set Reminder</button>
		</div>
	</form>

	<form
  method="post"
  action="?/setCancelAction"
  class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
  on:submit={handleSubmit}
>
  <table class="table">
    <thead class="!variant-soft-secondary">
      <tr>
        <th>Cancel Scheduled Follow-Up   </th>
      </tr>
    </thead>
    <tbody class="!bg-white dark:!bg-inherit">
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
        <td>Select dates for follow-up cancellation </td>
        <td>
          <input
            id="datePicker"
            type="button"
            class="button rounded-md border-2 border-secondary-100"
			placeholder="Click here to select date"
            required
            />
          <input
            type="hidden"
            id="hiddenDates"
            name="dates"
			required
          />
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex gap-2 p-2 justify-end">
    <button type="submit" disabled={selectedDates.length === 0 ? true : false} class="btn variant-filled-secondary">Submit Dates</button>
  </div>
</form>

<form
		method="post"
		action="?/viewCancellationAction"
		class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
		
	>
		<table class="table">
			<thead class="!variant-soft-secondary">
				<tr>
					<th>View Follow-up Cancellations</th>
				</tr>
			</thead>
			<tbody class="!bg-white dark:!bg-inherit">
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td> From date*</td>
					<td>
						<input
							type="date"
							class="input" 
							name="startdate"
							bind:value={startdate}
							required
						/>
						
					</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td> To date*</td>
					<td>
						<input
							type="date"
							class="input" 
							name="enddate"
							bind:value={enddate}
							required
						/>
						
					</td>
				</tr>
				
			</tbody>
		</table>
		<div class="flex gap-2 p-2 justify-end">
			<button type="submit" class="btn variant-filled-secondary">View Cancellation</button>
		</div>
	</form>
		{#if form?.data.resp}
		<div class="calendar">
			<!-- {#each canceledDates as date} -->
			{#each canceledDates.slice().sort((a, b) => new Date(a).getTime() - new Date(b).getTime()) as date}
				<div class = "date">
				{date.split('T')[0]}
			</div>
			{/each}
		</div>
		{/if}
		
	{:else}
	
        <div class="  flex h-96 flex-col justify-center items-center">
			
			<form
			  method="post"
			  action="?/uploadAppoinment"
			  use:enhance
			  enctype="multipart/form-data"
			  class="table-container mt-4 my-2 dark:!border-surface-700 "
  >
			  <table class="table w-2/3 mx-auto">
				<thead class="!variant-soft-secondary">
				<tr class="content-center">
				<th class="text-center font-bold">Upload Appointment follow-up pdf</th>
				</tr>
				</thead>
				<tbody class="!bg-white dark:!bg-inherit">
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				 <td class="text-center">
				  <input
				   type="file"
				   name="name"
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
		  <!-- </div> -->
		</div>
	  <!-- </div> -->
		<!-- </div> -->
		<!-- <footer class="w-full fixed bottom-0 bg-primary-500 text-center p-2">
		  <a href="https://reanfoundation.org" class="!text-white">&#xa9; 2022 REAN Foundation</a>
		</footer> -->
  	{/if}

</body>

<style>
	.calendar {
	  display: grid;
	  grid-template-columns: repeat(7, 1fr);
	}
	.date {
	  padding: 10px;
	  border: 1px solid #ccc;
	  text-align: center;
	}
	
  </style>
