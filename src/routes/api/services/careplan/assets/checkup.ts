import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { del, get, post, put } from '../common.careplan';

////////////////////////////////////////////////////////////////

export const createCheckup = async (
  sessionId: string,
  name: string,
  description: string,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + '/assets/checkups';
  return await post(sessionId, url, body, true);
};

export const getCheckupById = async (sessionId: string, checkupId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/checkups/${checkupId}`;
  return await get(sessionId, url, true);
};

export const searchCheckups = async (sessionId: string, searchParams) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';
    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/checkups/search${searchString}`;
  return await get(sessionId, url, true);
};

export const updateCheckup = async (
  sessionId: string,
  checkupId: string,
  name: string,
  description: string,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + `/assets/checkups/${checkupId}`;
  return await put(sessionId, url, body, true);
};

export const deleteCheckup = async (sessionId: string, checkupId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/checkups/${checkupId}`;
  return await del(sessionId, url, true);
};
