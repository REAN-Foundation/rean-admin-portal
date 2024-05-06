import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createPersonRoleType = async (
	sessionId: string,
	roleName: string,
	description: string
) => {
	const body = {
		RoleName: roleName,
		Description: description ? description : null
	};
	const url = BACKEND_API_URL + '/types/person-roles';
	return await post_(sessionId, url, body, true);
};

export const getPersonRoleTypeById = async (sessionId: string, personRoleTypeId: string) => {
	const url = BACKEND_API_URL + `/types/person-roles/${personRoleTypeId}`;
	return await get_(sessionId, url, true);
};

export const searchPersonRoleTypes = async (sessionId: string) => {
	const url = BACKEND_API_URL + `/types/person-roles`;
	return await get_(sessionId, url, true);
};

export const updatePersonRoleType = async (
	sessionId: string,
	personRoleTypeId: string,
	roleName: string,
	description: string
) => {
	const body = {
		RoleName: roleName,
		Description: description ? description : null
	};
	const url = BACKEND_API_URL + `/types/person-roles/${personRoleTypeId}`;
	return await put_(sessionId, url, body, true);
};

export const deletePersonRoleType = async (sessionId: string, personRoleTypeId: string) => {
	const url = BACKEND_API_URL + `/types/person-roles/${personRoleTypeId}`;
	return await delete_(sessionId, url, true);
};
