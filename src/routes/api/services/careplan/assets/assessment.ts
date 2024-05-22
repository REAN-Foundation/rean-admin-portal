import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { del, get, post, put } from '../common.careplan';

////////////////////////////////////////////////////////////////

export const createAssessment = async (
  sessionId: string,
  name: string,
  description: string,
  template: string,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    Template: template,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };

  const url = CAREPLAN_BACKEND_API_URL + '/assets/assessments';
  return await post(sessionId, url, body, true);
};

export const getAssessmentById = async (sessionId: string, assessmentId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/assessments/${assessmentId}`;
  return await get(sessionId, url, true);
};

export const searchAssessment = async (sessionId: string, searchParams) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';
    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/assessments/search${searchString}`;
  return await get(sessionId, url, true);
};

export const updateAssessment = async (
  sessionId: string,
  assessmentId: string,
  name: string,
  description: string,
  template: string,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    Template: template,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + `/assets/assessments/${assessmentId}`;
  return await put(sessionId, url, body, true);
};

export const deleteAssessment = async (sessionId: string, assessmentId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/assessments/${assessmentId}`;
  return await del(sessionId, url, true);
};
