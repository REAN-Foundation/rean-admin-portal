import { AWARDS_BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../common';

////////////////////////////////////////////////////////////////

export const createBadge = async (
	sessionId: string,
	clientId: string,
  categoryId: string,
	name: string,
	description: string,
	imageUrl: string
) => {
	const body = {
		ClientId: clientId,
    CategoryId: categoryId,
		Name: name,
		Description: description ? description : null,
		ImageUrl: imageUrl
	};
	const url = AWARDS_BACKEND_API_URL + '/badges';
	return await post_(sessionId, url, body, true);
};

export const getBadgeById = async (sessionId: string, badgeId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/badges/${badgeId}`;
	return await get_(sessionId, url, true);
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
		}
	}
	const url = AWARDS_BACKEND_API_URL + `/badges/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateBadge = async (
	sessionId: string,
	badgeId: string,
	clientId: string,
  categoryId: string,
	name: string,
	description: string,
	imageUrl: string
) => {
	const body = {
		ClientId: clientId,
    CategoryId: categoryId,
		Name: name,
		Description: description ? description : null,
		ImageUrl: imageUrl
	};
	const url = AWARDS_BACKEND_API_URL + `/badges/${badgeId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteBadge = async (sessionId: string, badgeId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/badges/${badgeId}`;
	return await delete_(sessionId, url, true);
};
