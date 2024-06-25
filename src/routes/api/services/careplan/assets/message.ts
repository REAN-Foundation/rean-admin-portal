import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { del, get, post, put } from '../common.careplan';

////////////////////////////////////////////////////////////////

export const createMessage = async (
  sessionId: string,
  name: string,
  description: string,
  messagetype: string,
  tags: string[],
  Url: string,
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    MessageType: messagetype,
    Tags: tags,
    Url: Url,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + '/assets/messages';
  return await post(sessionId, url, body, true);
};

export const getMessageById = async (sessionId: string, messageId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/messages/${messageId}`;
  return await get(sessionId, url, true);
};

export const searchMessage = async (sessionId: string, searchParams: any) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';

    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/messages/search${searchString}`;
  return await get(sessionId, url, true);
};

export const updateMessage = async (
  sessionId: string,
  messageId: string,
  name: string,
  description: string,
  messagetype: string,
  tags: string[],
  pathUrl: string,
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    MessageType: messagetype,
    Tags: tags,
    Url: pathUrl,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + `/assets/messages/${messageId}`;
  return await put(sessionId, url, body, true);
};

export const deleteMessage = async (sessionId: string, messageId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/messages/${messageId}`;
  return await del(sessionId, url, true);
};
