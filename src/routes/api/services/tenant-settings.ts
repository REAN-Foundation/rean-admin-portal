import { BACKEND_API_URL } from '$env/static/private';
import { Helper } from '$lib/utils/helper';
import { delete_, get_, post_, put_ } from './common';
import { getTenantById } from './tenants';

////////////////////////////////////////////////////////////////

export const createTenantSettings = async (
	sessionId: string,
	tenantId: string,
    settings: any
    ) => {
	const body = {
		TenantId: tenantId,
        Setting: settings
	};

	const url = BACKEND_API_URL + '/tenant-feature-setting';
	return await post_(sessionId, url, body, true, false);
};

export const updateTenantSettings = async (
    sessionId: string,
	tenantSettingId: string,
    settings: any
    ) => {
        console.log('updateTenantSettings() get called....');
        const body = {
		Setting: settings
	};

	const url = BACKEND_API_URL + `/tenant-feature-setting/${tenantSettingId}`;
	return await put_(sessionId, url, body, true, false);
};

// export const getTenantById = async (sessionId: string, tenantId: string) => {
// 	const url = BACKEND_API_URL + `/tenants/${tenantId}`;
// 	return await get_(sessionId, url, true);
// };

export const searchTenantSettings = async (sessionId: string, searchParams?: any) => {
	let searchString = '';
	if (searchParams) {
		const keys = Object.keys(searchParams);
		if (keys.length > 0) {
			searchString = '?';
			const params:any = [];
			for (const key of keys) {
				if (searchParams[key]) {
					const param = `${key}=${searchParams[key]}`;
					params.push(param);
				}
			}
			searchString += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/tenant-feature-setting/search${searchString}`;
	return await get_(sessionId, url, true, false);
};


// export const updateTenant = async (
// 	sessionId: string,
//   tenantId: string,
// 	name: string,
// 	description: string,
//   code: string,
//   phone: string,
// 	email: string,
// ) => {
// 	const body = {
//     Name: name,
// 		Description: description ? description : null,
//     Code: code,
// 		Phone: phone ? phone : null,
//     Email: email ? email : null,
// 	};
// 	if (Helper.isPhone(phone)) {
// 		body.Phone = Helper.sanitizePhone(phone);
// 	};
// 	const url = BACKEND_API_URL + `/tenants/${tenantId}`;
// 	return await put_(sessionId, url, body, true, false);
// };

// export const deleteTenant = async (sessionId: string, tenantId: string) => {
// 	const url = BACKEND_API_URL + `/tenants/${tenantId}`;
// 	return await delete_(sessionId, url, true, false);
// };
