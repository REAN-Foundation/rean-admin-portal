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
import { uploadAppoinmentPdf, uploadFileForTesting } from "../../../../api/services/gmu/appointment-upload";
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
    UserDetails: tenantData,
    title:'Appointment Followup-Set Reminders'
    };
};
export const actions = {
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
          throw redirect(successMessage("Your reminders are getting schedule! Please check the Status report in few minutes."), event)
        }
      throw redirect(errorMessage(response.Message), event)
      }
    },

    // uploadAppoinment: async (event: RequestEvent) => {
    //     const userId = event.params.userId;
    //     const request = event.request;
    //     const formData = await request.formData();
    //     const uploadedFile = formData?.get('name') as File;
    //     const fileName = uploadedFile.name;
    //         const newFileName = Helper.replaceAll(fileName, ' ', '_');
    //     const filePath = `./temp/${newFileName}`;

    //         console.log("upload info",uploadedFile)

    //     if(uploadedFile.type !== 'application/pdf')
    //       {
    //         throw redirect(errorMessage('Invalid Document!'), event)
    //       }  
    //     else{
    //       //524,288 bytes is 512 KB size of pdf is resistricted to less than or equal to it
    //           console.log("size of file",uploadedFile.size)
    //           // 
    //           if (uploadedFile.size > 524288) 
    //           {
    //             throw redirect(errorMessage('File should be less than 512 KB'), event)
    //           } 
    //           else
    //           {  
    //             console.log("valid pdf size")
    //             if (!fs.existsSync('./temp')) {
    //               fs.mkdirSync('./temp', { recursive: true });
    //               }

    //             await writeFile(filePath, Buffer.from(await uploadedFile?.arrayBuffer()));

    //             if (!fs.existsSync(filePath)) {
    //               console.log('File not created');
    //               throw redirect(successMessage('Unable to import appointment template.'), event);
    //             }

    //             const response = await uploadAppoinmentPdf(
    //               newFileName,
    //               filePath
    //             );

    //             fs.unlinkSync(filePath);
    //             console.log('&&&&&&',response)
    //                 if (!response.body.success || response.status !== 200) {
    //                   throw redirect(successMessage(response.body.success), event);
    //                   }
    //                   throw redirect(errorMessage(response.body.success), event)
    //           }          
    //         }
    //   },

    uploadAppoinment: async (event: RequestEvent) => {
      const tenantData = event.locals.sessionUser;
      const tenantCode = event.locals.sessionUser?.tenantCode;
      const userId = event.params.userId;
      const request = event.request;
      const formData = await request.formData();
      const uploadedFile = formData?.get('name') as File;
    
      const fileName = uploadedFile.name;
      const newFileName = Helper.replaceAll(fileName, ' ', '_');
      // const filePath = `./temp/${newFileName}`;

      // Get today's date in YYYYMMDD format
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0].replace(/-/g, ''); // "20250419"

      // Insert tenantCode and date before the file extension
      const extensionIndex = newFileName.lastIndexOf('.');
      // const baseName = newFileName.substring(0, extensionIndex);
      const extension = newFileName.substring(extensionIndex);

      // const finalFileName = `${baseName}_${tenantCode}_${formattedDate}${extension}`;
      const finalFileName = `${tenantCode}_${formattedDate}${extension}`;
      const filePath = `./temp/${finalFileName}`;
      const fileType = uploadedFile.type;
      const fileSize = uploadedFile.size;
    
      console.log("Upload Info", {
        name: finalFileName,
        type: fileType,
        size: fileSize,
        tenantCode: tenantData.tenantCode,
      });
    
      // Tenant GMU requires only PDFs under 512 KB
      if (tenantData.tenantName.includes('GMU')) {
        if (fileType !== 'application/pdf') {
          throw redirect(errorMessage('Invalid Document! Only PDFs allowed.'), event);
        }
    
        if (fileSize > 524288) {
          throw redirect(errorMessage('File should be less than 512 KB'), event);
        }
    
        console.log("Valid PDF size for GMU");
      } else {
        // Other tenants – allow Excel files under 1 MB
        const allowedExcelTypes = [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel'
        ];
    
        if (!allowedExcelTypes.includes(fileType)) {
          throw redirect(errorMessage('Invalid Document! Only Excel files allowed.'), event);
        }
    
        if (fileSize > 1048576) {
          throw redirect(errorMessage('Excel file should be less than 1 MB'), event);
        }
    
        console.log("Valid Excel file for other tenant");
      }
    
      // Ensure temp directory exists
      if (!fs.existsSync('./temp')) {
        fs.mkdirSync('./temp', { recursive: true });
      }
    
      // Save file to disk
      await writeFile(filePath, Buffer.from(await uploadedFile.arrayBuffer()));
    
      // Check if file was saved correctly
      if (!fs.existsSync(filePath)) {
        console.log('File not created');
        throw redirect(successMessage('Unable to import appointment template.'), event);
      }
    
      // Upload
      const response = await uploadAppoinmentPdf(finalFileName, filePath);
      // const response = await uploadFileForTesting(newFileName, filePath);
      // Delete temp file
      fs.unlinkSync(filePath);
    
      // Handle response
      console.log('Upload response:', response);
      if (!response.body.success || response.status !== 200) {
        throw redirect(errorMessage(response.body.message), event);
      }
    
      throw redirect(successMessage('Document uploaded successfully.'), event);
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
          console.log('Received start date:', startdate);
          console.log('Received end date:', enddate);
          canceldate = await viewCancelDates(startdate,enddate,sessionId!,tenantId!,tenantName);
          console.log("canceldates...",canceldate)
          if (canceldate.length === 0)
            {
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
 


