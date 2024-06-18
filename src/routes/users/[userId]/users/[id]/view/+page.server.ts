import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUserById } from '$routes/api/services/reancare/user';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const userId = event.params.id;
		const response = await getUserById(sessionId, userId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const user = response.Data.user;
		const id = response.Data.user.id;
		return {
			location: `${id}/edit`,
			user,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving user: ${error.message}`);
	}
};
