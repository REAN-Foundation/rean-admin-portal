<script lang="ts">
    import { onMount } from 'svelte';
    export let data
    let totalPatient ='';
    let arrivedPatient = '';
    let notarrived ='';
    let repliedYes ='';
    let repliedNo = '';
    const appointmentReport = data.AppointmentReport;
    console.log(appointmentReport)
    let summary = appointmentReport['Summary'];
    let filedata = appointmentReport['File_data'];
    
    // console.log(filedata[0].Appointment_time)
    type TableRow = {
        srNo: number;
        patientName: string;
        patientPhoneNo: string;
        patientStatus: string;
        appointmentTime: string;
        replied: string;
    };
    let numRows = appointmentReport['File_data'].length;;
    let tableData: TableRow[] = Array.from({ length: numRows }, (_, i) => ({
        srNo: i + 1,
        patientName: '',
        patientPhoneNo: '',
        patientStatus: '',
        appointmentTime: '',
        replied: ''
    }));
 
    // function getSummary () {
    //     if (!enteredDate){
    //         console.log(enteredDate);
    //         let fileDate = convertDateFormat(enteredDate)
    //         console.log(fileDate)
    //     }
    // }

    // function convertDateFormat(dateString: string): string {
    // const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date());
    // return format(parsedDate, 'yyyy-MM-dd');
    // }

    // function to add patient name
    function addPatientName(newPatientName: string, rowNumber: number): void {
        // Update the specified row with the new patient name
        tableData[rowNumber].patientName = newPatientName;
    }
    // function to add patient phone number
    function addPatientPhoneNo(newPatientPhoneNo: string, rowNumber: number): void {
        // Update the specified row with the new phone number
        tableData[rowNumber].patientPhoneNo = newPatientPhoneNo;
    }
    // function to add patient status
    function addPatientStatus(newPatientStatus: string, rowNumber: number): void {
        // Update the specified row with the new patient status
        tableData[rowNumber].patientStatus = newPatientStatus;
    }
    // function to add appointment time
    function addAppointmentTime(newAppointmentTime: string, rowNumber: number): void {
        // Update the specified row with the new appointment time
        tableData[rowNumber].appointmentTime = newAppointmentTime;
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
                        addPatientPhoneNo(`${filedata[i].phone_number}`,i);
                        addPatientStatus(`${filedata[i].patient_status}`, i);
                        addAppointmentTime(`${filedata[i].appointment_time}`, i);
                        addReplied(`${filedata[i].patient_replied}`, i);
                     }
                }, 1000); 
            });
           
</script>

    <div>
        <h1 class="text-2xl text-center">Summary of Appointment FollowUp PDF</h1>
    </div>
    <div>
    <p class="text-lg text-right">Date:{summary['Date']}</p>
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
        <p class="text-lg block">Arrived patient </p>
        <p class="text-lg block bg-[#7165E3] text-white rounded px-3 py-1"> {summary['Arrived patient']}</p>
    </div>
    <div class="border-b-2 border-b-gray-300 mb-1"></div>
</div>
<div class=" mx-auto w-2/5 p-1">
    <div class="flex justify-between items-center">
        <p class="text-lg block">Patient not arrived </p>
        <p class="text-lg block bg-[#7165E3] text-white rounded px-3 py-1"> {summary['Patient not arrived']}</p>
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
<!-- The Svelte component -->
<div class="flex justify-center mt-4 overflow-auto">
    <table class="bg-white text-center">
        <tr class="border-black rounded-2xl">
            <th class="bg-[#7165E3] text-white border px-4 py-2 font-normal">Sr.no</th>
            <th class="bg-[#7165E3] text-white border px-2 sm:px-16 py-2 font-normal">Patient name</th>
            <th class="bg-[#7165E3] text-white border px-2 sm:px-14 py-2 font-normal">Phone No</th
            >
            <th class="bg-[#7165E3] text-white border px-2 sm:px-14 py-2 font-normal">Status</th>
            <th class="bg-[#7165E3] text-white border px-2 sm:px-14 py-2 font-normal">Appointment Time</th
            >
            <th class="bg-[#7165E3] text-white border px-2 sm:px-14 py-2 font-normal">Replied</th>
        </tr>
        {#each tableData as { srNo, patientName, patientPhoneNo, patientStatus, appointmentTime, replied }}
            <tr>
                <td class="border px-2 py-2">{srNo}</td>
                <td class="border px-2 sm:px-8 py-2 text-left">{patientName}</td>
                <td class="border px-2 sm:px-8 py-2">{patientPhoneNo}</td>
                <td class="border px-2 sm:px-8 py-2">{patientStatus}</td>
                <td class="border px-2 sm:px-8 py-2">{appointmentTime}</td>
                <td class="border px-2 sm:px-8 py-2">{replied}</td>
            </tr>
        {/each}
    </table>
</div>




