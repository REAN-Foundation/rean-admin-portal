// src/routes/+page.server.ts
// import type { Actions } from './$types';
import { error, type RequestEvent, type ServerLoadEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { Helper } from '$lib/utils/helper';
import { Event } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import { writeFile } from 'node:fs/promises';
import toast, { Toaster } from 'svelte-french-toast';
import { uploadAppoinmentPdf } from "../../../../api/services/gmu/appointment-upload";
import { handleDateSubmission } from '../../../../api/services/gghn/appointment-set';

// //////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
  const tenantData = event.locals.sessionUser
  if (!tenantData) {
    throw error(403, 'Not found');
  }
  // const userRoles = await getUserRoleList(userRole);
  console.log("sessionUser..data..",tenantData)
  console.log("sessionUser..data..",tenantData.tenantName)
  return {
    UserDetails: tenantData
    // UserDetails:'GMU_admin'
  };
};
export const actions = {
  	//  export const actions = {
    setReminderAction: async (event: RequestEvent) => {
    const request = event.request;
    const userId = event.params.userId;
    const formData = await request.formData();
    const date = formData.get('date');
    console.log('in +page.server date is',date)
      if (typeof date === 'string') {
        const res = await handleDateSubmission(date);
        console.log("response.status",res.status)
        const response = await res.json();
        if (response.Status === "Success") 
        {
          throw redirect(303, `/users/${userId}/appointment-followup/summary-uploads`, successMessage(response.Message), event)
        }
      throw redirect(303, `/users/${userId}/appointment-followup/set-appointment`, errorMessage(response.Message), event)
      }
    },

    uploadAppoinment: async (event: RequestEvent) => {
            // const userId = event.params.userId;
        const request = event.request;
        // const sessionId = event.cookies.get('sessionId');
        const formData = await request.formData();
        const uploadedFile = formData?.get('name') as File;
        const fileName = uploadedFile.name;
            const newFileName = Helper.replaceAll(fileName, ' ', '_');
        const filePath = `./temp/${newFileName}`;

            console.log(uploadedFile)
        if (!fs.existsSync('./temp')) {
          fs.mkdirSync('./temp', { recursive: true });
          }

        await writeFile(filePath, Buffer.from(await uploadedFile?.arrayBuffer()));

        if (!fs.existsSync(filePath)) {
          console.log('File not created');
          throw redirect(303, `/open/appointment-uploads`, errorMessage('Unable to import appointment template.'), event);
        }

        const response = await uploadAppoinmentPdf(
                newFileName,
          filePath
        );

        fs.unlinkSync(filePath);
        console.log('&&&&&&',response)
            if (!response.body.success || response.status !== 200) {
                toast.success(response.body.message)
               }
               toast.error(response.body.message)


      }
    }


