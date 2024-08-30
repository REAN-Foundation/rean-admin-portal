// src/routes/+page.server.ts
// import type { Actions } from './$types';
import { error, type RequestEvent, type ServerLoadEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { Helper } from '$lib/utils/helper';
import { Event } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import { writeFile } from 'node:fs/promises';
import toast, { Toaster } from 'svelte-french-toast';
import { uploadAppoinmentPdf } from "../../../../api/services/gmu/appointment-upload";
import { addCancellationDateSubmission, handleDateSubmission, viewCancelDates } from '../../../../api/services/gghn/appointment-set';
import { redirect } from 'sveltekit-flash-message/server';
import { any } from 'zod';

// //////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
  const tenantData = event.locals.sessionUser;
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
              throw redirect(successMessage(response.body.success), event);
               }
               throw redirect(errorMessage(response.body.success), event)


      },
      setCancelAction: async (event: RequestEvent) => {
          const request = event.request;
          const sessionId = event.locals.sessionUser.sessionId;
          const tenantId =  event.locals.sessionUser.tenantId;
          const tenantName = event.locals.sessionUser.tenantName;
          const userId = event.params.userId; 
          if (!sessionId || !tenantId || !tenantName) {
            toast.error('Authentication error');
          }
          const formData = await request.formData();
          const dates = formData.get('dates');
          if (dates) {
            const parsedDates = JSON.parse(dates.toString());
            console.log('Received dates:', parsedDates);
            let res;
            let unscheduled:any[] = []
            for (const date of parsedDates) {
              res = await addCancellationDateSubmission(date,sessionId!,tenantId!,tenantName);
              if(res.Status !== 'success'){
                unscheduled.push(date)
                // throw redirect(errorMessage(res.Message), event);
              }
            }
            console.log(typeof unscheduled)
            console.log("unscheduled.lenght",unscheduled.length);
            if (unscheduled.length === 0)
              {
                let message = `Cancellation scheduled`
                throw redirect(successMessage(message), event)
               }
              else{
                let note = `Follow-up cancellation was already done for ${unscheduled} and for remaining dates cancellation scheduled successfully!`
                throw redirect(successMessage(note), event)
              }
          }
    },
    viewCancellationAction: async (event: RequestEvent) => {
      const request = event.request;
       let canceldate = [];
      //  let datestring ='';
      const sessionId = event.locals.sessionUser.sessionId;
          const tenantId =  event.locals.sessionUser.tenantId;
          const tenantName = event.locals.sessionUser.tenantName;
          const userId = event.params.userId; 
          if (!sessionId || !tenantId || !tenantName) {
            toast.error('Authentication error');
          }
          const formData = await request.formData();
          const startdate = formData.get('startdate');
          const enddate = formData.get('enddate');
          // const startDate = new Date(formstartdate);
          // const endDate = new Date(formenddate);
          console.log('Received start date:', startdate);
          console.log('Received end date:', enddate);
          canceldate = await viewCancelDates(startdate,enddate,sessionId!,tenantId!,tenantName);
          console.log("canceldates...",canceldate)
          if (canceldate.length === 0)
            {
              // throw redirect(errorMessage(unscheduleDates), event)
              let message = `No cancel dates for the stated interval`
              throw redirect(errorMessage(message), event);
            }
            else {
          return {
            data: {
              cancellationSet: true, 
              resp: canceldate
              } 
           };
          }
    
  },
}
 


