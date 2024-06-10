import { getReminderById } from '$routes/api/services/careplan/assets/reminder';
import { logLoadingError } from '../../../../../../../api/error.logging';
import type { PageServerLoad } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const reminderId = event.params.id;
		const response = await getReminderById(sessionId, reminderId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const reminder = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			reminder,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retrieving reminder: ${error.message}`);
		logLoadingError('PageServerLoad', event, error.message);
		throw redirect(303, '/');
	}
};
