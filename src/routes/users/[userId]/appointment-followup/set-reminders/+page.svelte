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
	// let userData = data.tenantName;
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
 
// {//converts to UTC
// 	  selectedDates = selectedDatesArray.map(date => date.toISOString().split('T')[0]);
// 	}
//   });
// });


console.log('Response Dates :', form?.data.resp);
canceledDates =  form?.data.resp;

const handleSubmit = (event) => {
    event.preventDefault();
    const hiddenInput = document.getElementById('hiddenDates');
    if (hiddenInput instanceof HTMLInputElement) {
      hiddenInput.value = JSON.stringify(selectedDates);
    }
    event.target.submit();
  };
</script>
<!-- if tenant is GMU -->

<svelte:head>
	{#if userData && userData.includes('GGHN') }
  		<title>GGHN Appointment Follow-up</title>
  		<meta name="description" content="Appointment Upload" />
	{:else}
		<title>GMU Appointment Upload</title>
	{/if}
	  
</svelte:head>
<body>

	{#if userData && userData.includes('GGHN') }
	<form
		method="post"
		action="?/setReminderAction"
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
							type="date"
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
        <th>Cancel Appointment follow-up</th>
      </tr>
    </thead>
    <tbody class="!bg-white dark:!bg-inherit">
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
        <td>Select dates for follow-up cancellation</td>
        <td>
          <input
            id="datePicker"
            type="text"
            class="input"
            placeholder="YYYY-MM-DD"
            required
            readonly
          />
          <input
            type="hidden"
            id="hiddenDates"
            name="dates"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex gap-2 p-2 justify-end">
    <button type="submit" class="btn variant-filled-secondary">Submit Dates</button>
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
					<td> Start date*</td>
					<td>
						<input
							type="date"
							class="input" 
							name="startdate"
							placeholder="YYYY-MM-D"
							bind:value={startdate}
							required
						/>
						
					</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td> End date*</td>
					<td>
						<input
							type="date"
							class="input" 
							name="enddate"
							placeholder="YYYY-MM-D"
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
			{#each canceledDates as date}
				<div class = "date">
				{date.split('T')[0]}
			</div>
			{/each}
		</div>
		{/if} 
	{:else}
	<!-- <div class="nav h-12 w-full " />
  	<div class="w-full h-full" id="background-image"> -->
    <!-- <div class=" h-full w-full"> -->
      <!-- <div class="h-10 w-screen shadow-xl mb-4 bg-[#7165E3]" /> -->
      <!-- <div class="h-full w-full px-3"> -->
        <div class="  flex h-96 flex-col justify-center items-center">
			<!-- <img
			  class="ct-image w-36 mt-14 mb-7"
			  alt="logo"
			  src="https://www.reanfoundation.org/wp-content/uploads/2021/10/REAN-Foundation-brand-Logo.png"
			/> -->
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
	.date.canceled {
	  text-decoration: line-through;
	  color: red;
	}
  </style>
