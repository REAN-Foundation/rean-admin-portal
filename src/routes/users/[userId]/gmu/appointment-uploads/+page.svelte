<script lang="ts">
	import { enhance } from "$app/forms";
    import { invalidate } from "$app/navigation";
    import { page } from '$app/stores';
    import type { ActionData } from "./$types";
    import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';


    export let form: ActionData;
    $: {
        if (form?.Status) {
            if (form.Status=== 'success') {
                toast.success(form.Message)
            }
            if (form.Status=== 'failure') {
                toast.error(form.Message)
            }
            invalidate('app:appointment-upload');
        }
    }
</script>
<svelte:head>
  <title>GMU Appointment Upload</title>
  <meta name="description" content="Appointment Upload" />
</svelte:head>
<body>
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
</body>


