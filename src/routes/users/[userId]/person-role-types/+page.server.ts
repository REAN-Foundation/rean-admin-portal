import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchPersonRoleTypes } from '../../../api/services/reancare/person-role-types';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const sessionId = event.cookies.get('sessionId');
    event.depends('app:person-role-types');

	const response = await searchPersonRoleTypes(sessionId);
	if (response.Status === 'failure' || response.HttpCode !== 200) {
		throw error(response.HttpCode, response.Message);
	}
	const personRoleTypes = response.Data.PersonRoleTypes;
	return {
		personRoleTypes,
		sessionId,
		message: response.Message
	};
};
