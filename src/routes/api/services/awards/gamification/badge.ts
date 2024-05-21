import { AWARDS_BACKEND_API_URL, AWARDS_SERVICE_API_KEY, CLIENT_ID } from '$env/static/private';
import { del, get, post, put } from '../common.awards';

////////////////////////////////////////////////////////////////

export const createBadge = async (
	sessionId: string,
	// clientId: string,
	categoryId: string,
	name: string,
	description: string,
	imageUrl: string
) => {
	const body = {
		ClientId: CLIENT_ID,
		CategoryId: categoryId,
		Name: name,
		Description: description ? description : null,
		ImageUrl: imageUrl
	};
	const url = AWARDS_BACKEND_API_URL + '/badges';
	return await post(sessionId, url, body, true, AWARDS_SERVICE_API_KEY);
};

export const getBadgeById = async (sessionId: string, badgeId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/badges/${badgeId}`;
	return await get(sessionId, url, true, AWARDS_SERVICE_API_KEY);
};

export const searchBadges = async (sessionId: string, searchParams?: any) => {
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
	const url = AWARDS_BACKEND_API_URL + `/badges/search${searchString}`;
	console.log('url', url);
	return await get(sessionId, url, true, AWARDS_SERVICE_API_KEY);
};

export const updateBadge = async (
	sessionId: string,
	badgeId: string,
	// clientId: string,
	categoryId: string,
	name: string,
	description: string,
	imageUrl: string
) => {
	const body = {
		ClientId: CLIENT_ID,
		CategoryId: categoryId,
		Name: name,
		Description: description ? description : null,
		ImageUrl: imageUrl
	};
	const url = AWARDS_BACKEND_API_URL + `/badges/${badgeId}`;
	return await put(sessionId, url, body, true, AWARDS_SERVICE_API_KEY);
};

export const deleteBadge = async (sessionId: string, badgeId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/badges/${badgeId}`;
	return await del(sessionId, url, true, AWARDS_SERVICE_API_KEY);
};
