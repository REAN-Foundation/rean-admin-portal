// src/routes/+page.server.ts
// import type { Actions } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { handleDateSubmission } from '../../../../api/server/gghn/appointment-date/+server';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
// //////////////////////////////////////


export const actions = {
	setReminderAction: async (event: RequestEvent) => {
	const request = event.request;
  const userId = event.params.userId;
  const formData = await request.formData();
  const date = formData.get('date');
  console.log('in +page.server date is',date)
    if (typeof date === 'string') {
     const res = await handleDateSubmission(date);
    //  const response = await res.json();
    //  console.log("response.status",res.status)
    //  if (res.status === 201) 
    //   {
    //     throw redirect(303, `/users/${userId}/gghn/summary-uploads`, successMessage("response.Message"), event)
    //   }
    throw redirect(303, `/users/${userId}/gghn/appointment-uploads`, successMessage("Reminder set!"), event)
    }
  }
};
