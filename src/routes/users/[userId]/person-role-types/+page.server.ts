import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchPersonRoleTypes } from '../../../api/services/reancare/person-role-types';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
    console.log('Person role types load ...');
	const sessionId = event.cookies.get('sessionId');
    event.depends('app:person-role-types');

	const response = await searchPersonRoleTypes(sessionId);
	if (response.Status === 'failure' || response.HttpCode !== 200) {
		throw error(response.HttpCode, response.Message);
	}
	let personRoleTypes = response.Data.PersonRoleTypes;
    personRoleTypes = setActiveRoles(personRoleTypes ?? []);
	return {
		personRoleTypes,
		sessionId,
		message: response.Message,
        title:'Administration-User Roles'
	};
};

function setActiveRoles(personRoleTypes) {
    personRoleTypes.forEach((personRoleType) => {
        if (personRoleType.RoleName === 'System admin' || 
            personRoleType.RoleName === 'System user' ||
            personRoleType.RoleName === 'Tenant admin' ||
            personRoleType.RoleName === 'Tenant user' ||
            personRoleType.RoleName === 'Patient' ||
            personRoleType.RoleName === 'Doctor') {
            personRoleType.isActive = true;
        } else {
            personRoleType.isActive = false;
        }
    });
    return personRoleTypes;
}
