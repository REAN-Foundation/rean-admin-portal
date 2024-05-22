import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { del, get, post, put } from '../common.careplan';

////////////////////////////////////////////////////////////////

export const createAudio = async (
  sessionId: string,
  name: string,
  transcript: string,
  pathUrl: string,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Transcript: transcript,
    Url: pathUrl,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + '/assets/audio';
  return await post(sessionId, url, body, true);
};

export const getAudioById = async (sessionId: string, audioId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/audio/${audioId}`;
  return await get(sessionId, url, true);
};

export const searchAudios = async (sessionId: string, searchParams) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';
    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/audio/search${searchString}`;
  return await get(sessionId, url, true);
};

export const updateAudio = async (
  sessionId: string,
  audioId: string,
  name: string,
  transcript: string,
  pathUrl: string,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Transcript: transcript,
    Url: pathUrl,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + `/assets/audio/${audioId}`;
  return await put(sessionId, url, body, true);
};

export const deleteAudio = async (sessionId: string, audioId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/audio/${audioId}`;
  return await del(sessionId, url, true);
};
