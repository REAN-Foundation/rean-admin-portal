import { CAREPLAN_BACKEND_API_URL } from "$env/static/private";
import { get_ } from "../common";

////////////////////////////////////////////////////////////////

export const getEnrollmentTaskById = async (sessionId: string, enrollmentTaskId: string) => {
    const url = CAREPLAN_BACKEND_API_URL + `/enrollment-tasks/${enrollmentTaskId}`;
    return await get_(sessionId, url,true);
};

export const searchEnrollmentTask = async (sessionId: string, searchParams?: any) => {
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
    const url = CAREPLAN_BACKEND_API_URL + `/enrollment-tasks/search${searchString}`;

    return await get_(sessionId, url,true);
};
