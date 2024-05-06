import { BACKEND_API_URL } from '$env/static/private';
import { get_, put_ } from './common';

////////////////////////////////////////////////////////////////

const baseUrl = BACKEND_API_URL + '/tenant-settings';

////////////////////////////////////////////////////////////////

export const getTenantSettingsTypes = async (
	sessionId: string
	) => {
	const url = baseUrl + `/types`;
	return await get_(sessionId, url, true);
};

export const getTenantSettingsByType = async (
	sessionId: string,
	tenantId: string,
	type: string
	) => {
	const url = baseUrl + `/${tenantId}/types/${type}`;
	return await get_(sessionId, url, true);
}

export const getTenantSettings = async (
	sessionId: string,
	tenantId: string
	) => {
	const url = baseUrl + `/${tenantId}`;
	return await get_(sessionId, url, true);
};

export const updateTenantSettingsByType = async (
	sessionId: string,
	tenantId: string,
	type: string,
	settings: any,
	) => {
	const url = baseUrl + `/${tenantId}/types/${type}`;
	return await put_(sessionId, url, settings, true);
}

export const updateTenantSettings = async (
    sessionId: string,
	tenantId: string,
    settings: any,
    ) => {
        console.log('updateTenantSettings() get called....');
        const body = settings;
	const url = baseUrl + `/${tenantId}`;
	return await put_(sessionId, url, body, true);
};
