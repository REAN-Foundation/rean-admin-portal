import type { ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchEventTypes } from '$routes/api/services/gamification/event.types';
import { errorMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const sessionId = event.cookies.get('sessionId');
    event.depends('app:gamification-event-types');
		const response = await searchEventTypes(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const eventTypes = response.Data;
		return {
			eventTypes,
			sessionId,
			message: response.Message
		};

};
