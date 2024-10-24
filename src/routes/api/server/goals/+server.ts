// import type { RequestEvent } from '@sveltejs/kit';
// import { deleteGoal } from '../../services/reancare/goals';
// import { errorMessage, successMessage } from '$lib/utils/message.utils';
// import { redirect } from 'sveltekit-flash-message/server';

// //////////////////////////////////////////////////////////////

// export const DELETE = async (event: RequestEvent) => {
// 	const request = event.request;
// 	const data = await request.json();
// 	console.log('Inside goal server endpoints');
// 	let response;
// 	try{
// 		response =await deleteGoal(data.sessionId, data.goalId);
// 	}catch(error){
// 		throw redirect(
// 			errorMessage('Error deleting goal.'),
// 			event
// 			);
// 	}
// 	throw redirect(
// 		successMessage('Goal deleted successfully!'),
// 		event
// 		);
// };

import type { RequestEvent } from '@sveltejs/kit';
import { deleteGoal_ } from '../../services/reancare/goals';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {

	const sessionId = event.locals.sessionUser.sessionId; 

    const data = await event.request.json();

    const successRedirectUrl = event.request.headers.get('Success-Redirect-Url');
    console.log('Success-Redirect-Url', successRedirectUrl);

    console.log('Inside goal server endpoints');

    let response = await deleteGoal_(sessionId, data.goalId);

    if (response.Status == 'failure' || response.HttpCode !== 200) {
        throw redirect(errorMessage(response.Message), event);
    }

    if(!successRedirectUrl) {
        throw redirect(successMessage(response.Message), event);
        // console.log('Success-Redirect-Url inside if', successRedirectUrl);
        // throw redirect(303,`${successRedirectUrl }`,successMessage(response.Message), event);
    }

    throw redirect(303, successRedirectUrl ,successMessage(response.Message), event);
  
};
