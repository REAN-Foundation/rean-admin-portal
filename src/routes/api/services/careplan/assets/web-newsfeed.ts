import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { del, get, post, put } from '../common.careplan';

////////////////////////////////////////////////////////////////

export const createWebNewsfeed = async (
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
  const url = CAREPLAN_BACKEND_API_URL + '/assets/web-newsfeeds';
  return await post(sessionId, url, body, true);
};

export const getWebNewsfeedById = async (sessionId: string, webnewsfeedId: string) => {

  const url = CAREPLAN_BACKEND_API_URL + `/assets/web-newsfeeds/${webnewsfeedId}`;

  return await get(sessionId, url, true);
};

export const searchWebNewsfeed = async (sessionId: string, searchParams: any) => {

  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';

    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }

  const url = CAREPLAN_BACKEND_API_URL + `/assets/web-newsfeeds/search${searchString}`;
  return await get(sessionId, url, true);

};

export const updateWebNewsfeed = async (
  sessionId: string,
  webNewsfeedId: string,
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
  const url = CAREPLAN_BACKEND_API_URL + `/assets/web-newsfeeds/${webNewsfeedId}`;
  return await put(sessionId, url, body, true);
};

export const deleteWebNewsfeed = async (sessionId: string, webNewsfeedId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/web-newsfeeds/${webNewsfeedId}`;
  return await del(sessionId, url, true);
};
