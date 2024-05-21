import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { del, get, post, put } from '../common.careplan';

////////////////////////////////////////////////////////////////

export const createExercise = async (
  sessionId: string,
  name: string,
  description: string,
  exerciseType: string,
  intensityLevel: string,
  recommendedDurationMin: number,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    ExerciseType: exerciseType,
    IntensityLevel: intensityLevel,
    RecommendedDurationMin: recommendedDurationMin,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };

  const url = CAREPLAN_BACKEND_API_URL + '/assets/exercises';
  return await post(sessionId, url, body, true);
};

export const getExerciseById = async (sessionId: string, exerciseId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/exercises/${exerciseId}`;
  return await get(sessionId, url, true);
};

export const searchExercise = async (sessionId: string, searchParams) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';
    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/exercises/search${searchString}`;
  return await get(sessionId, url, true);
};

export const updateExercise = async (
  sessionId: string,
  exerciseId: string,
  name: string,
  description: string,
  exerciseType: string,
  intensityLevel: string,
  recommendedDurationMin: number,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Description: description,
    ExerciseType: exerciseType,
    IntensityLevel: intensityLevel,
    RecommendedDurationMin: recommendedDurationMin,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  console.log("body", body)
  const url = CAREPLAN_BACKEND_API_URL + `/assets/exercises/${exerciseId}`;
  return await put(sessionId, url, body, true);
};

export const deleteExercise = async (sessionId: string, exerciseId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/exercises/${exerciseId}`;
  return await del(sessionId, url, true);
};
