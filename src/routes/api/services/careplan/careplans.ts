import { CAREPLAN_BACKEND_API_URL, CAREPLAN_SERVICE_API_KEY } from "$env/static/private";
import {del, get, post, put} from "./common.careplan";

// ////////////////////////////////////////////////////////////////

export const createCareplan = async (
  sessionId: string,
  code: string,
  categoryId:string,
  name: string,
  description: string,
  tags: string[],
  version: string
      ) => {
    const url = CAREPLAN_BACKEND_API_URL + '/careplans';
    const body = {
        Code: code,
        CategoryId:categoryId,
        Name: name,
        Description: description ? description : null,
        Tags: tags,
        Version: !version || version?.length === 0 ? 'V 1.0' : version,
    };
    return await post(sessionId, url, body, true);
};

export const getCareplanById = async (sessionId: string, careplanId: string) => {
    const url = CAREPLAN_BACKEND_API_URL + `/careplans/${careplanId}`;
    return await get(sessionId, url,true, CAREPLAN_SERVICE_API_KEY);
};

export const searchCareplans = async (sessionId: string,
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
    const url = CAREPLAN_BACKEND_API_URL + `/careplans/search${searchString}`;
    console.log('Timestamp ', new Date().toTimeString());
    return await get(sessionId, url, true, CAREPLAN_SERVICE_API_KEY);
};

export const updateCareplan = async (
    sessionId: string,
    careplanId:string,
    code: string,
    categoryId:string,
    name: string,
    description: string,
    tags: string[],
    version: string) => {
    const url = CAREPLAN_BACKEND_API_URL + (`/careplans/${careplanId}`);
  const body = {
    Code: code,
        CategoryId:categoryId,
        Name: name,
        Description: description ? description : null,
        Tags: tags,
        Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  return await put(sessionId, url, body, true);
};

export const deleteCareplan = async (sessionId: string, careplanId: string) => {
    const url = CAREPLAN_BACKEND_API_URL + `/careplans/${careplanId}`;
    return await del(sessionId, url, true);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////

export const searchCareplanCategories = async (sessionId: string) => {
    const url = CAREPLAN_BACKEND_API_URL + `/careplan-categories/search`;
    return await get(sessionId, url, true);
};
