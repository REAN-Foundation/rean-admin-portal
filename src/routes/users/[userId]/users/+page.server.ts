import type { ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchUsers } from '$routes/api/services/reancare/user';
import { searchPersonRoleTypes } from '$routes/api/services/reancare/person-role-types';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log("sessionId.....",sessionId)
    event.depends('app:users');
	const tenantId = event.locals.sessionUser.tenantId;
	console.log("tenantId.....",tenantId);

    const personRoles = await searchPersonRoleTypes(sessionId);
    if (personRoles.Status === 'failure' || personRoles.HttpCode !== 200) {
		throw error(personRoles.HttpCode, personRoles.Message);
	}
    const selectedRoles: string[] = [];
    personRoles.Data.PersonRoleTypes.map(personRole => {
        if (personRole.RoleName === "System admin" || 
            personRole.RoleName === "System user" ||
            personRole.RoleName === "Tenant admin" ||
            personRole.RoleName === "Tenant user"
        ) {
            selectedRoles.push(personRole.id);
        }
    });

    const response = await searchUsers(sessionId, {
        orderBy: 'FirstName',
        order : 'ascending',
        roleIds: selectedRoles.length ? selectedRoles as string[] : null,
    });
	if (response.Status === 'failure' || response.HttpCode !== 200) {
		throw error(response.HttpCode, response.Message);
	}
	const users = response.Data.Users;

	return {
		users,
		sessionId,
		message: response.Message
	};

};
