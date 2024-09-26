<script lang="ts">
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import toast from 'svelte-french-toast';
    import type { ActionData } from './$types';
    import {
		Paginator, type PaginationSettings,
	} from '@skeletonlabs/skeleton';

    export let data
    let totalPatient ='';
    let notarrived ='';
    let repliedYes ='';
    let repliedNo = '';
    const tenant = data.AppointmentReport.tenant
    const appointmentReport = data.AppointmentReport.data;
    console.log(appointmentReport)
    let summary = appointmentReport['Summary'];
    let filedata = appointmentReport['File_data'];
    let itemsPerPage = 10;
    let retriveddata;
    let items = 10;
    
    type TableRow = {
        srNo: number;
        patientName: string;
        hospitalName: string;
        emrId: string
        patientPhoneNo: string;
        patientStatus: string;
        appointmentTime: string;
        replied: string;
    };

    let numRows = appointmentReport['File_data'].length;;
    let tableData: TableRow[] = Array.from({ length: numRows }, (_, i) => ({
        srNo: i + 1,
        patientName: '',
        hospitalName: '',
        emrId: '',
        patientPhoneNo: '',
        patientStatus: '',
        appointmentTime: '',
        replied: ''
    }));
 
    // function to add patient name
    function addPatientName(newPatientName: string, rowNumber: number): void {
        // Update the specified row with the new patient name
        tableData[rowNumber].patientName = newPatientName ? newPatientName : 'Not Specified';
    }
    function addHospitalName(newHospitalName: string, rowNumber: number): void {
        // Update the specified row with the new patient name
        tableData[rowNumber].hospitalName = newHospitalName ? newHospitalName : 'Not Specified';
    }
    function addEMRId(newEMRId: string, rowNumber: number): void {
        // Update the specified row with the new patient name
        tableData[rowNumber].emrId = newEMRId ? newEMRId : 'Not Specified';
    }
    // function to add patient phone number
    function addPatientPhoneNo(newPatientPhoneNo: string, rowNumber: number): void {
        // Update the specified row with the new phone number
        tableData[rowNumber].patientPhoneNo =  newPatientPhoneNo ? newPatientPhoneNo : 'Not Specified';
    }
    // function to add patient status
    function addPatientStatus(newPatientStatus: string, rowNumber: number): void {
        // Update the specified row with the new patient status
        tableData[rowNumber].patientStatus = newPatientStatus ? newPatientStatus :'Not Specified' ;
    }
    // function to add appointment time
    function addAppointmentTime(newAppointmentTime: string, rowNumber: number): void {
        // Update the specified row with the new appointment time
        tableData[rowNumber].appointmentTime = newAppointmentTime ?  newAppointmentTime : 'Not Specified';
    }
    // function to add replied
    function addReplied(newReplied: string, rowNumber: number): void {
        // Update the specified row with the new replied
        tableData[rowNumber].replied = newReplied;
    }
    onMount(() => {
        setTimeout(() => {
                    for (let i = 0; i < appointmentReport['File_data'].length; i++) {
                        addPatientName(`${filedata[i].name_of_patient}`,i);
                        addHospitalName(`${filedata[i].facility_name}`,i)
                        addEMRId(`${filedata[i].participant_code}`,i)
                        addPatientPhoneNo(`${filedata[i].phone_number}`,i);
                        addPatientStatus(`${filedata[i].patient_status}`, i);
                        addAppointmentTime(`${filedata[i].appointment_time}`, i);
                        addReplied(`${filedata[i].patient_replied}`, i);
                     }
                }, 1000); 
            });

    let paginationSettings = {
		page: 0,
		limit: 10,
		size: numRows,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;
  
	$: {
		// symptoms = symptoms.map((item, index) => ({ ...item, index: index + 1 }));
		paginationSettings.size = numRows;
		retriveddata = tableData.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
	}

    
	function onPageChange(e: CustomEvent): void {
		let pageIndex = e.detail;
        itemsPerPage = items * (pageIndex + 1);
	}

	function onAmountChange(e: CustomEvent): void {
		itemsPerPage = e.detail * (paginationSettings.page + 1);
		items = itemsPerPage;
	}

</script>

    <div>
        <h1 class="text-2xl text-center">Status Report {tenant}</h1>
    </div>
       <div>
    <p class="text-lg text-right justify-end ">Date {summary['Date']}</p>
    </div>

    
  

<!-- Start -->
<div class="mt-8 mx-auto w-2/5 p-1">
    <div class="flex justify-between items-center">
        <p class="text-lg block">Total patient </p>
        <p class="text-lg block bg-[#7165E3] text-white rounded px-3 py-1"> {summary['Total patient']}</p>
    </div>
    <div class="border-b-2 border-b-gray-300 mb-1"></div>
</div>
<div class=" mx-auto w-2/5 p-1">
    <div class="flex justify-between items-center">
        <p class="text-lg block">Patient replied Yes </p>
        <p class="text-lg block bg-[#7165E3] text-white rounded px-3 py-1"> {summary['Patient replied Yes']}</p>
    </div>
    <div class="border-b-2 border-b-gray-300 mb-1"></div>
</div>
<div class=" mx-auto w-2/5 p-1">
    <div class="flex justify-between items-center">
        <p class="text-lg block">Patient replied No </p>
        <p class="text-lg block bg-[#7165E3] text-white rounded px-3 py-1">{summary['Patient replied No']}</p>
    </div>
    <div class="border-b-2 border-b-gray-300 mb-1"></div>
</div>
<div class=" mx-auto w-2/5 p-1">
    <div class="flex justify-between items-center">
        <p class="text-lg block">Patient not replied </p>
        <p class="text-lg block bg-[#7165E3] text-white rounded px-3 py-1"> {summary['Patient Not replied']}</p>
    </div>
    <div class="border-b-2 border-b-gray-300 mb-1"></div>
</div>
<!-- The Svelte component -->
<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid" >
		<thead class="!variant-soft-secondary">
        <tr class="border-black rounded-2xl">
            <th class="bg-[#7165E3] text-white border px-1 py-1 font-normal">Sr.no</th>
            <th class="bg-[#7165E3] text-white border px-1 sm:px-8 py-1 font-normal">Patient Name</th>
            <th class="bg-[#7165E3] text-white border px-1 sm:px-8 py-1 font-normal">Hospital Name</th>
            <th class="bg-[#7165E3] text-white border px-1 sm:px-8 py-1 font-normal">EMRID</th>
            <th class="bg-[#7165E3] text-white border px-1 sm:px-8 py-1 font-normal">Phone No</th
            >
            <th class="bg-[#7165E3] text-white border px-1 sm:px-8 py-1 font-normal">Status</th>
            <th class="bg-[#7165E3] text-white border px-1 sm:px-8 py-1 font-normal">Appointment Time</th>
            
            <th class="bg-[#7165E3] text-white border px-1 sm:px-8 py-1 font-normal">Replied</th>
        </tr>
    </thead>
    <tbody class="!bg-white dark:!bg-inherit">
        <!-- {#each tableData as { srNo, patientName, hospitalName, emrId, patientPhoneNo, patientStatus, appointmentTime, replied }} -->
        {#each retriveddata as row}
        <tr>
                <td class="border px-1 py-1 text-center">{row.srNo}</td>
                <td class="border px-1 py-1 ">{row.patientName}</td>
                <td class="border px-1 py-1 ">{row.hospitalName}</td>
                <td class="border px-1 sm:px-8 py-1 ">{row.emrId}</td>
                <td class="border px-1 sm:px-8 py-1">{row.patientPhoneNo}</td>
                <td class="border px-1 sm:px-8 py-1">{row.patientStatus}</td>
                  <!--As appointment date is same to all and we donot have specific time-->
                <td class="border px-1 sm:px-8 py-1">{row.appointmentTime}</td>
                <td class="border px-1 sm:px-8 py-1">{row.replied}</td>
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
		regionControl = 'bg-surface-100 rounded-lg btn-group text-primary-500 border border-primary-200'
		controlVariant = 'rounded-full text-primary-500 '
		controlSeparator = 'fill-primary-400'
		/>
</div>

