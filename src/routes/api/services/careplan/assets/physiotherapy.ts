import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { del, get, post, put } from '../common.careplan';

////////////////////////////////////////////////////////////////

export const createPhysiotherapy = async (
  sessionId: string,
  name: string,
  description: string,
  recommendedDurationMin: number,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    RecommendedDurationMin: recommendedDurationMin,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + '/assets/physiotherapy';
  return await post(sessionId, url, body, true);
};

export const getPhysiotherapyById = async (sessionId: string, physiotherapyId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/physiotherapy/${physiotherapyId}`;
  return await get(sessionId, url, true);
};

export const searchPhysiotherapy = async (sessionId: string, searchParams: any) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';

    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }

  const url = CAREPLAN_BACKEND_API_URL + `/assets/physiotherapy/search${searchString}`;
  return await get(sessionId, url, true);
};

export const updatePhysiotherapy = async (
  sessionId: string,
  physiotherapyId: string,
  name: string,
  description: string,
  recommendedDurationMin: number,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    RecommendedDurationMin: recommendedDurationMin,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };

  const url = CAREPLAN_BACKEND_API_URL + `/assets/physiotherapy/${physiotherapyId}`;
  return await put(sessionId, url, body, true);
};

export const deletePhysiotherapy = async (sessionId: string, physiotherapyId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/physiotherapy/${physiotherapyId}`;
  return await del(sessionId, url, true);
};
