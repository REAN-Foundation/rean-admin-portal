import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { del, get, post, put } from '../common.careplan';

////////////////////////////////////////////////////////////////

export const createGoal = async (
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

  const url = CAREPLAN_BACKEND_API_URL + '/assets/goals';
  return await post(sessionId, url, body, true);
};

export const getGoalById = async (sessionId: string, goalId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/goals/${goalId}`;
  return await get(sessionId, url, true);
};

export const searchGoals = async (sessionId: string, searchParams) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';
    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }

  const url = CAREPLAN_BACKEND_API_URL + `/assets/goals/search${searchString}`;
  return await get(sessionId, url, true);
};

export const updateGoal = async (
  sessionId: string,
  goalId: string,
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

  const url = CAREPLAN_BACKEND_API_URL + `/assets/goals/${goalId}`;
  return await put(sessionId, url, body, true);
};

export const deleteGoal = async (sessionId: string, goalId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/goals/${goalId}`;
  return await del(sessionId, url, true);
};
