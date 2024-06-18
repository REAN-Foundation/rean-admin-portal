import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { deleteUser } from '$routes/api/services/reancare/user';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside user server endpoints');
	let response;
	try{
		response = await deleteUser(data.sessionId, data.userId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting user.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
