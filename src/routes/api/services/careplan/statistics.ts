import {CAREPLAN_BACKEND_API_URL, CAREPLAN_SERVICE_API_KEY } from "$env/static/private";
import { get } from "./common.careplan";

// ////////////////////////////////////////////////////////////////

export const getCareplanStatistics = async (sessionId: string,
    searchParams? : any, 
    ) => {
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
    const url = CAREPLAN_BACKEND_API_URL + `/statistics/search${searchString}`;
   
    return await get(sessionId, url, true, CAREPLAN_SERVICE_API_KEY);
};
