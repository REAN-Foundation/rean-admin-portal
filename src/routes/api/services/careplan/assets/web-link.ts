import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { del, get, post, put } from '../common.careplan';

////////////////////////////////////////////////////////////////

export const createWebLink = async (
  sessionId: string,
  name: string,
  description: string,
  pathUrl: string,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    Url: pathUrl,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + '/assets/web-links';
  return await post(sessionId, url, body, true);
};

export const getWebLinkById = async (sessionId: string, weblinkId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/web-links/${weblinkId}`;
  return await get(sessionId, url, true);
};

export const searchWebLink = async (sessionId: string, searchParams: any) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';

    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }

  const url = CAREPLAN_BACKEND_API_URL + `/assets/web-link/search${searchString}`;
  return await get(sessionId, url, true);
};

export const updateWebLink = async (
  sessionId: string,
  webLinkId: string,
  name: string,
  description: string,
  pathUrl: string,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    Url: pathUrl,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + `/assets/web-links/${webLinkId}`;
  return await put(sessionId, url, body, true);
};

export const deleteWebLink = async (sessionId: string, webLinkId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/web-links/${webLinkId}`;
  return await del(sessionId, url, true);
};
