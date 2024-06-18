import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchUsers } from '$routes/api/services/reancare/user';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log("sessionId.....",sessionId)
  event.depends('app:users');
	try {
		const tenantId = event.locals.sessionUser.tenantId;
		console.log("tenantId.....",tenantId);
		const searchParams = {
			tenantId:tenantId
		}
		const response = await searchUsers(sessionId, {
            orderBy: 'FirstName',
            order : 'ascending'
        });
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const users = response.Data.Users;

		console.log("users", users.Items)
		return {
			users,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving users: ${error.message}`);
	}
};
