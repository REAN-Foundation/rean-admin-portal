import { FOLLOW_UP_URL, API_CLIENT_INTERNAL_KEY } from '$env/static/private';
import { get } from '../reancare/common.reancare'

////////////////////////////////////////////////////////////////

// export const searchReply = async (sessionId: string, searchParams?: any)=> {
// 	let searchString = '';
//     let dateString = '';
// 	if (searchParams) {
// 		// const keys = Object.keys(searchParams);
// 		// if (keys.length > 0) {
// 		// 	searchString = '?';
// 		// 	const params = [];
// 		// 	for (const key of keys) {
// 		// 		if (searchParams[key]) {
// 		// // 			const param = `${key}=${searchParams[key]}`;
// 		// 			params.push(param);
// 		// 		}
// 		// 	}
//         console.log("###",searchParams)
// 			searchString = `reply=${searchParams.reply}`;
//             dateString = searchParams.date

// 	// 	}
// 	}
// 	const url = FOLLOW_UP_URL + `/appointment-schedules/reply-report/`;
// 	return await get(sessionId, url, true, API_CLIENT_INTERNAL_KEY);
// };

export const searchReply = async (sessionId: string, searchParams?: any) => {
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
	console.log("searchString",searchString)
	const url = FOLLOW_UP_URL + `/appointment-schedules/reply-report/${searchString}`;
	return await get(sessionId, url, true, API_CLIENT_INTERNAL_KEY);
};