import { USER_ANALYTICS_API_URL } from '$env/static/private';
import { API_CLIENT_INTERNAL_KEY } from '$env/static/private';
import { get } from '../reancare/common.reancare';

export const getAnalyticsReport = async(format: string) => {
    const url = USER_ANALYTICS_API_URL + `/analytics/download/${new Date().toISOString().split('T')[0]}-1/formats/${format}`;
	const headers = {};
	headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
	const response = await fetch(url, {
		method: 'GET',
		headers
	});
    if (response.ok){
        return response;
    }
    return null;
}

export const getUserAnalytics = async (sessionId, formattedDate) => {
    console.log('Formated date: ' + formattedDate);
    const url = USER_ANALYTICS_API_URL + `/analytics/metrics/${formattedDate}-1`;
    return await get(sessionId, url, true, API_CLIENT_INTERNAL_KEY);
}
