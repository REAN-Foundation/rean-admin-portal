import type { RequestEvent } from '@sveltejs/kit';
import { deleteCourseContent } from '../../services/course.contents';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
    let response;
	try {
		console.log('Inside course content server endpoints');
		response = await deleteCourseContent(data.sessionId, data.courseContentId);
	} catch (err) {
        throw redirect(
			errorMessage('Error deleting module contents.'), 
			event
			);
	}
    throw redirect(
		successMessage(response.Message),
		event
		);	
};
