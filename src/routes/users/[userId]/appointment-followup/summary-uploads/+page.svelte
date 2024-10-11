<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import toast from 'svelte-french-toast';
    import type { ActionData } from './$types';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
    import Icon from '@iconify/svelte';
    export let data;
    let totalPatient = '';
    let notarrived = '';
    let repliedYes = '';
    let repliedNo = '';
    const tenant = data.AppointmentReport.tenant;
    const appointmentReport = data.AppointmentReport.data;
    const userId = $page.params.userId;
    console.log('*********************************');
    console.log(tenant);
    console.log('**********************************');
    console.log(appointmentReport);
    console.log('***********************************');
    let summary = appointmentReport['Summary'];
    const filedata = appointmentReport['File_data'];
    console.log("filedata", filedata)
    const statusReportRoute = `/users/${userId}/appointment-followup/summary-uploads`;
    const breadCrumbs = [{ name:'Status Report GGHN', path: statusReportRoute }];
    console.log(filedata);
    let itemsPerPage = 10;
    let retriveddata;
    let items = 10;
    type TableRow = {
        srNo: number;
        patientName: string;
        hospitalName: string;
        emrId: string;
        patientPhoneNo: string;
        patientStatus: string;
        appointmentTime: string;
        replied: string;
    };
    let numRows = appointmentReport['File_data'].length;
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
        tableData[rowNumber].patientPhoneNo = newPatientPhoneNo ? newPatientPhoneNo : 'Not Specified';
    }
    // function to add patient status
    function addPatientStatus(newPatientStatus: string, rowNumber: number): void {
        // Update the specified row with the new patient status
        tableData[rowNumber].patientStatus = newPatientStatus ? newPatientStatus : 'Not Specified';
    }
    // function to add appointment time
    function addAppointmentTime(newAppointmentTime: string, rowNumber: number): void {
        // Update the specified row with the new appointment time
        tableData[rowNumber].appointmentTime = newAppointmentTime ? newAppointmentTime : 'Not Specified';
    }
    // function to add replied
    function addReplied(newReplied: string, rowNumber: number): void {
        // Update the specified row with the new replied
        tableData[rowNumber].replied = newReplied;
    }
    onMount(() => {
        setTimeout(() => {
            for (let i = 0; i < appointmentReport['File_data'].length; i++) {
                addPatientName(`${filedata[i].name_of_patient}`, i);
                addHospitalName(`${filedata[i].facility_name}`, i);
                addEMRId(`${filedata[i].participant_code}`, i);
                addPatientPhoneNo(`${filedata[i].phone_number}`, i);
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
<BreadCrumbs crumbs={breadCrumbs} />
<div>
    <p class="text-lg text-right justify-end">Date {summary['Date']}</p>
</div>
<div class="w-full md:w-2/5 p-1 mb-2"> 
    <div class="flex justify-between items-center">
        <p class="text-lg">Total patient</p>
        <p class="text-lg bg-[#7165E3] text-white rounded px-3 py-1 w-24 h-12 text-center"> {summary['Total patient']}</p>
    </div>
    <div class="border-b-2 border-b-gray-300 mb-1"></div>
</div>
<div class="w-full md:w-2/5 p-1 mb-2"> 
    <div class="flex justify-between items-center">
        <p class="text-lg">Patient replied Yes</p>
        <p class="text-lg bg-[#7165E3] text-white rounded px-3 py-1 w-24 h-12 text-center"> {summary['Patient replied Yes']}</p>
    </div>
    <div class="border-b-2 border-b-gray-300 mb-1"></div>
</div>
<div class="w-full md:w-2/5 p-1 mb-2"> 
    <div class="flex justify-between items-center">
        <p class="text-lg">Patient replied No</p>
        <p class="text-lg bg-[#7165E3] text-white rounded px-3 py-1 w-24 h-12 text-center"> {summary['Patient replied No']}</p>
    </div>
    <div class="border-b-2 border-b-gray-300 mb-1"></div>
</div>
<div class="w-full md:w-2/5 p-1 mb-2"> 
    <div class="flex justify-between items-center">
        <p class="text-lg">Patient not replied</p>
        <p class="text-lg bg-[#7165E3] text-white rounded px-3 py-1 w-24 h-12 text-center"> {summary['Patient Not replied']}</p>
    </div>
    <div class="border-b-2 border-b-gray-300 mb-1"></div>
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
                        tabindex="0">{row.srNo}</td
                    >
                    <td
                        role="gridcell"
                        aria-colindex={2}
                        tabindex="0">{row.patientName}</td
                    >
                    <td
                        role="gridcell"
                        aria-colindex={3}
                        tabindex="0">{row.hospitalName}</td
                    >
                    <td
                        role="gridcell"
                        aria-colindex={4}
                        tabindex="0">{row.emrId}</td
                    >
                    <td
                        role="gridcell"
                        aria-colindex={5}
                        tabindex="0">{row.patientPhoneNo}</td
                    >
                    <td
                        role="gridcell"
                        aria-colindex={6}
                        tabindex="0">{row.patientStatus}</td
                    >
                    <td
                        role="gridcell"
                        aria-colindex={7}
                        tabindex="0">{row.appointmentTime}</td
                    >
                    <td
                        role="gridcell"
                        aria-colindex={8}
                        tabindex="0">{row.replied}</td
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
