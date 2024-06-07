// src/routes/+page.server.ts
import type { Actions } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { handleDateSubmission } from '../../../../api/server/gghn/appointment-date/+server';
// //////////////////////////////////////


export const actions = {
	createDrugAction1: async (event: RequestEvent) => {
	const request = event.request;
    const formData = await request.formData();
    const date = formData.get('date');
    console.log('in +page.server date is',date)
    if (typeof date === 'string') {
     const response = await handleDateSubmission(date);
     console.log("response.status",response.status)
     if (response.status !== 201) {
      return {
          Status: 'failure',
         
         }
        }
      return {
      Status: 'success',
      
      }
    }
  }
};
