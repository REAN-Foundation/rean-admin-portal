// import type { RequestEvent } from '@sveltejs/kit';
// // import { redirect } from 'sveltekit-flash-message/server';
// import { errorMessage, successMessage } from '$lib/utils/message.utils';
// import { deleteGoal_ } from '$routes/api/services/reancare/goals';
// import { redirect } from '@sveltejs/kit';
// //////////////////////////////////////////////////////////////

// export const DELETE = async (event: RequestEvent) => {
//     console.log('Inside goal server endpoints');

//     const sessionId = event.locals.sessionUser.sessionId;
//     const userId = event.locals.sessionUser.userId;

//     const goalId = event.params.id;
//     const url =  `/users/${userId}/home`;

//     const successRedirectUrl = event.request.headers.get('Success-Redirect-Url');
//     console.log('Success-Redirect-Url', successRedirectUrl);

//     let response = await deleteGoal_(sessionId, goalId);

//     // redirect(307,successMessage(response.Message));
//     // if (response.Status == 'failure' || response.HttpCode !== 200) {
//     //     throw redirect(errorMessage(response.Message), event);
//     // }

//     throw redirect(307,url);
//     // if (successRedirectUrl) {
//     //     // throw redirect(successMessage(response.Message), event);
//     //     console.log('Success-Redirect-Url inside if', successRedirectUrl);
//     //    redirect(303, successRedirectUrl, successMessage(response.Message), event);
//     // }
//     // throw redirect(successMessage(response.Message), event);
//     // return new Response(JSON.stringify(response));
// };

import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';
import { deleteGoal_ } from '$routes/api/services/reancare/goals';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {

	const sessionId = event.locals.sessionUser.sessionId; 

    const goalId = event.params.id;

    console.log('Inside goal server endpoints');

    let response = await deleteGoal_(sessionId, goalId);

    if (response.Status == 'failure' || response.HttpCode !== 200) {
        throw redirect(errorMessage(response.Message), event);
    }

    throw redirect(successMessage(response.Message), event);
  
};