import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchUsers } from '$routes/api/services/reancare/user';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const sessionId = event.cookies.get('sessionId');
    event.depends('app:users');
	try {
		const response = await searchUsers(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const users = response.Data.UserRecords;
		return {
			users,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving users: ${error.message}`);
	}
};
