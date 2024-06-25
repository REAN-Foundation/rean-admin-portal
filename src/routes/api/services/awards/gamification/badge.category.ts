import { AWARDS_BACKEND_API_URL, CLIENT_ID, AWARDS_SERVICE_API_KEY } from '$env/static/private';
import { del, get, post, put } from '../common.awards';

////////////////////////////////////////////////////////////////

export const createBadgeCategory = async (
	sessionId: string,
	name: string,
	description: string,
	imageUrl: string
) => {
	const body = {
		ClientId: CLIENT_ID,
		Name: name,
		Description: description ? description : null,
		ImageUrl: imageUrl
	};
	const url = AWARDS_BACKEND_API_URL + '/badge-categories';
	return await post(sessionId, url, body, true, AWARDS_SERVICE_API_KEY);
};

export const getBadgeCategoryById = async (sessionId: string, badgeCategoryId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/badge-categories/${badgeCategoryId}`;
	return await get(sessionId, url, true, AWARDS_SERVICE_API_KEY);
};

export const searchBadgeCategories = async (sessionId: string, searchParams?: any) => {
	let searchString = '';
	if (searchParams) {
		const keys = Object.keys(searchParams);
		if (keys.length > 0) {
			searchString = '?';
			const params = [];
			for (const key of keys) {
				if (searchParams[key]) {
					const param = `${key}=${searchParams[key]}`;
					params.push(param);
				}
			}
			searchString += params.join('&');
		}
	}
	const url = AWARDS_BACKEND_API_URL + `/badge-categories/search${searchString}`;
	return await get(sessionId, url, true, AWARDS_SERVICE_API_KEY);
};

export const updateBadgeCategory = async (
	sessionId: string,
	badgeCategoryId: string,
	// clientId: string,
	name: string,
	description: string,
	imageUrl: string
) => {
	const body = {
		// ClientId: clientId,
		ClientId:CLIENT_ID,   //This is the temporary solution
		Name: name,
		Description: description ? description : null,
		ImageUrl: imageUrl
	};
	const url = AWARDS_BACKEND_API_URL + `/badge-categories/${badgeCategoryId}`;
	return await put(sessionId, url, body, true, AWARDS_SERVICE_API_KEY);
};

export const deleteBadgeCategory = async (sessionId: string, badgeCategoryId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/badge-categories/${badgeCategoryId}`;
	return await del(sessionId, url, true, AWARDS_SERVICE_API_KEY);
};
