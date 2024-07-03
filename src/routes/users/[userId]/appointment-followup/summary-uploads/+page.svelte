<script lang="ts">
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import toast from 'svelte-french-toast';
    import type { ActionData } from './$types';
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
    
    // console.log(filedata[0].Appointment_time)
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
  
</script>

    <div>
        <h1 class="text-2xl text-center">Summary of Appointment {tenant}</h1>
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
<div class="flex justify-center mt-4 overflow-auto">
    <table class="bg-white text-center">
        <tr class="border-black rounded-2xl">
            <th class="bg-[#7165E3] text-white border px-2 py-2 font-normal">Sr.no</th>
            <th class="bg-[#7165E3] text-white border px-2 sm:px-16 py-2 font-normal">Patient Name</th>
            <th class="bg-[#7165E3] text-white border px-2 sm:px-16 py-2 font-normal">Hospital Name</th>
            <th class="bg-[#7165E3] text-white border px-2 sm:px-16 py-2 font-normal">EMRID</th>
            <th class="bg-[#7165E3] text-white border px-2 sm:px-14 py-2 font-normal">Phone No</th
            >
            <th class="bg-[#7165E3] text-white border px-2 sm:px-14 py-2 font-normal">Status</th>
            <th class="bg-[#7165E3] text-white border px-2 sm:px-14 py-2 font-normal">Appointment Time</th>
            
            <th class="bg-[#7165E3] text-white border px-2 sm:px-14 py-2 font-normal">Replied</th>
        </tr>
        {#each tableData as { srNo, patientName, hospitalName, emrId, patientPhoneNo, patientStatus, appointmentTime, replied }}
            <tr>
                <td class="border px-2 py-2">{srNo}</td>
                <td class="border px-2 py-2 text-left">{patientName}</td>
                <td class="border px-2 py-2 text-left">{hospitalName}</td>
                <td class="border px-2 sm:px-8 py-2 text-left">{emrId}</td>
                <td class="border px-2 sm:px-8 py-2">{patientPhoneNo}</td>
                <td class="border px-2 sm:px-8 py-2">{patientStatus}</td>
                  <!--As appointment date is same to all and we donot have specific time-->
                <td class="border px-2 sm:px-8 py-2">{ appointmentTime}</td>
                <td class="border px-2 sm:px-8 py-2">{replied}</td>
            </tr>
        {/each}
    </table>
</div>




