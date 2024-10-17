<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import toast from 'svelte-french-toast';
    import type { ActionData } from './$types';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
    import Icon from '@iconify/svelte';
    import { browser } from '$app/environment';
    import { date } from 'zod';
    import { invalidateAll } from '$app/navigation';
////////////////////////////////////////////////////////////////////////////////

    export let data;
    let reply = undefined;
    // $: isLoading = false;
    let retriveddata;
    const tenant = data.AppointmentReport.tenant;
    const appointmentReport = data.AppointmentReport.data;
    const userId = $page.params.userId;
    console.log('*********************************');
    console.log(tenant);
    console.log('**********************************');
    console.log(appointmentReport);
    console.log('***********************************');
    let summary = appointmentReport['Summary'];
    console.log('report',appointmentReport['File_data'])
    let filedata = appointmentReport['File_data'];
    console.log("filedata",filedata)
    const statusReportRoute = `/users/${userId}/appointment-followup/summary-uploads`;
    const breadCrumbs = [{ name:'Status Report GGHN', path: statusReportRoute }];
    console.log(filedata);
    let itemsPerPage = 10;
    
    let items = 10;
 
    let patientCount = appointmentReport['File_data'].length;
    let paginationSettings = {
        page: 0,
        limit: 10,
        size: patientCount,
        amounts: [10, 20, 30, 50]
    } satisfies PaginationSettings;
    
    function onPageChange(e: CustomEvent): void {
        let pageIndex = e.detail;
        itemsPerPage = items * (pageIndex + 1);
    }
    function onAmountChange(e: CustomEvent): void {
        itemsPerPage = e.detail * (paginationSettings.page + 1);
        items = itemsPerPage;
    }
    // if (retriveddata.length > 0) {
    //         isLoading = false;
    //     }
    
       
    $: {reply;
        filedata = filedata.map((item,index) => ({ ...item, index: index + 1 }))
        paginationSettings.size = patientCount;
        retriveddata = filedata.slice(
            paginationSettings.page * paginationSettings.limit,
            paginationSettings.page * paginationSettings.limit + paginationSettings.limit
        );
    }
        $: if (browser)
		searchReplies({
			reply: reply,
			date:summary['Date'],
            clientname:tenant
		
		});


    async function searchReplies(model) {
    console.log("model--------",model);
		let url = `/api/server/gghn/search?`;
		url += `clientname=${tenant}`;
		url += `&date=${summary['Date']}`;
		if (reply) url += `&reply=${reply}`;
		const res = await fetch(url, {
			method: 'GET',
            headers: { 'content-type': 'application/json' }
		});
		const searchResult = await res.json();
        console.log('Search', searchResult)
      	patientCount = searchResult.Summary;
        filedata = searchResult.File_data;
        retriveddata = filedata
        
        console.log("retriveddata",retriveddata);
		if (retriveddata > 0) {
            // isLoading = false;
        }
	}
  
</script>
<BreadCrumbs crumbs={breadCrumbs} />
<div>
    <p class="text-lg text-right justify-end">Date {summary['Date']}</p>
</div>
<div class="w-full md:w-2/5 p-1 mb-2"> 
    <div class="flex justify-between items-center">
        <p class="text-lg">Total patient</p>
        <p class=" bg-[#7165E3] text-white rounded px-3 py-1 w-24 h-12 text-center text-2xl pt-2"> {summary['Total patient']}</p>
    </div>
    <div class="border-b-2 border-b-gray-300 mb-1"></div>
</div>
<div class="w-full md:w-2/5 p-1 mb-2"> 
    <div class="flex justify-between items-center">
        <p class="text-lg">Patient replied Yes</p>
        <p class="text-2xl bg-[#7165E3] text-white rounded px-3 py-1 w-24 h-12 text-center pt-2"> {summary['Patient replied Yes']}</p>
    </div>
    <div class="border-b-2 border-b-gray-300 mb-1"></div>
</div>
<div class="w-full md:w-2/5 p-1 mb-2"> 
    <div class="flex justify-between items-center">
        <p class="text-lg">Patient replied No</p>
        <p class="text-2xl bg-[#7165E3] text-white rounded px-3 py-1 w-24 h-12 text-center pt-2"> {summary['Patient replied No']}</p>
    </div>
    <div class="border-b-2 border-b-gray-300 mb-1"></div>
</div>
<div class="w-full md:w-2/5 p-1 mb-2"> 
    <div class="flex justify-between items-center">
        <p class="text-lg">Patient not replied</p>
        <p class="text-2xl bg-[#7165E3] text-white rounded px-3 py-1 w-24 h-12 text-center pt-2"> {summary['Patient Not replied']}</p>
    </div>
    <div class="border-b-2 border-b-gray-300 mb-1"></div>
</div>

<div class="flex flex-wrap gap-2 mt-1">
	<div class="relative w-auto grow">
		<input
				type="text"
				name="type"
				placeholder="Search by reply"
				bind:value={reply}
				class="input w-full"
		/>
		{#if reply}
				<button
						type="button"
						on:click={() => { reply = '';}}
						class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-0 cursor-pointer"
				>
						<Icon icon="material-symbols:close" class="text-lg" />
				</button>
		{/if}
</div>
</div>
<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
    <table
        class="table"
        role="grid"
    >
        <thead class="!variant-soft-secondary">
            <tr>
                <th data-sort="index">Sr.no</th>
                <th>Patient Name</th>
                <th>Hospital Name</th>
                <th>EMRID</th>
                <th>Phone No</th>
                <th>Status</th>
                <th>Appointment Time</th>
                <th>Replied</th>
            </tr>
        </thead>
        <tbody class="!bg-white dark:!bg-inherit">
            {#each retriveddata as row}
                <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                    <td
                        role="gridcell"
                        aria-colindex={1}
                        tabindex="0">{row.index}</td
                    >
                    <td
                        role="gridcell"
                        aria-colindex={2}
                        tabindex="0">{row.name_of_patient ? row.name_of_patient : 'Unspecified'}</td
                    >
                    <td
                        role="gridcell"
                        aria-colindex={3}
                        tabindex="0">{row.facility_name ? row.facility_name : 'Unspecified' }</td
                    >
                    <td
                        role="gridcell"
                        aria-colindex={4}
                        tabindex="0">{row.participant_code ? row.participant_code : 'Unspecified'}</td
                    >
                    <td
                        role="gridcell"
                        aria-colindex={5}
                        tabindex="0">{row.phone_number ? row.phone_number : 'Unspecified'}</td
                    >
                    <td
                        role="gridcell"
                        aria-colindex={6}
                        tabindex="0">{row.patient_status ? row.patient_status :'Unspecified'}</td
                    >
                    <td
                        role="gridcell"
                        aria-colindex={7}
                        tabindex="0">{row.appointment_time ? row.appointment_time : 'Unspecified'}</td
                    >
                    <td
                        role="gridcell"
                        aria-colindex={8}
                        tabindex="0">{row.patient_replied ? row.patient_replied :  'Unspecified'}</td
                    >
                </tr>
            {/each}
        </tbody>
    </table>
</div>
<div class="w-full variant-soft-secondary rounded-lg p-2">
    <Paginator
        bind:settings={paginationSettings}
        on:page={onPageChange}
        on:amount={onAmountChange}
        buttonClasses=" text-primary-500"
        regionControl="bg-surface-100 rounded-lg btn-group text-primary-500 border border-primary-200"
        controlVariant="rounded-full text-primary-500 "
        controlSeparator="fill-primary-400"
    />
</div>
