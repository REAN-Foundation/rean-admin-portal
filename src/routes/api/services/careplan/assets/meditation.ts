import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { del, get, post, put } from '../common.careplan';

////////////////////////////////////////////////////////////////

export const createMeditation = async (
  sessionId: string,
  name: string,
  description: string,
  meditationType: string,
  recommendedDurationMin: number,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    MeditationType: meditationType,
    RecommendedDurationMin: recommendedDurationMin,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };

  const url = CAREPLAN_BACKEND_API_URL + '/assets/meditations';
  return await post(sessionId, url, body, true);
};

export const getMeditationById = async (sessionId: string, meditationId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/meditations/${meditationId}`;
  return await get(sessionId, url, true);
};

export const searchMeditation = async (sessionId: string, searchParams: any) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';

    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/meditations/search${searchString}`;
  return await get(sessionId, url, true);
};

export const updateMeditation = async (
  sessionId: string,
  meditationId: string,
  name: string,
  description: string,
  meditationType: string,
  recommendedDurationMin: number,
  tags: string[],

  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    MeditationType: meditationType,
    RecommendedDurationMin: recommendedDurationMin,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + `/assets/meditations/${meditationId}`;

  return await put(sessionId, url, body, true);
};

export const deleteMeditation = async (sessionId: string, assetId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/meditations/${assetId}`;
  return await del(sessionId, url, true);
};
