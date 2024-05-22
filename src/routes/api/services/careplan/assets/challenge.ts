import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { del, get, post, put } from '../common.careplan';

////////////////////////////////////////////////////////////////

export const createChallenge = async (
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
  const url = CAREPLAN_BACKEND_API_URL + '/assets/challenges';
  return await post(sessionId, url, body, true);
};

export const getChallengeById = async (sessionId: string, challengeId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/challenges/${challengeId}`;
  return await get(sessionId, url, true);
};

export const searchChallenges = async (sessionId: string, searchParams) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';
    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/challenges/search${searchString}`;
  return await get(sessionId, url, true);
};

export const updateChallenge = async (
  sessionId: string,
  challengeId: string,
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
  const url = CAREPLAN_BACKEND_API_URL + `/assets/challenges/${challengeId}`;
  return await put(sessionId, url, body, true);
};

export const deleteChallenge = async (sessionId: string, challengeId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/challenges/${challengeId}`;
  return await del(sessionId, url, true);
};

