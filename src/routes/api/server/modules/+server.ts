import type { RequestEvent } from '@sveltejs/kit';
import { deleteModule } from '../../services/modules';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
    let response;
	try {
		console.log('Inside module server endpoints');
		response = await deleteModule(data.sessionId, data.moduleId);		
	} catch (err) {
		throw redirect(
			errorMessage('Error deleting course module.'), 
			event
			);
	}
    throw redirect(
		successMessage(response.Message),
		event
		);	
};
