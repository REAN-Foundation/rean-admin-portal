import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { del, get, post, put } from '../common.careplan';

////////////////////////////////////////////////////////////////

export const createArticle = async (
  sessionId: string,
  name: string,
  summary: string,
  pathUrl: string,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Summary: summary,
    Url: pathUrl,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  const url = CAREPLAN_BACKEND_API_URL + '/assets/articles';
  return await post(sessionId, url, body, true);
};

export const getArticleById = async (sessionId: string, articleId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/articles/${articleId}`;
  return await get(sessionId, url, true);
};

export const searchArticles = async (sessionId: string, searchParams) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';
    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/articles/search${searchString}`;
  return await get(sessionId, url, true);
};

export const updateArticle = async (
  sessionId: string,
  articleId: string,
  name: string,
  summary: string,
  pathUrl: string,
  tags: string[],
  version: string
) => {
  const body = {
    Name: name,
    Summary: summary,
    Url: pathUrl,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };

  const url = CAREPLAN_BACKEND_API_URL + `/assets/articles/${articleId}`;
  return await put(sessionId, url, body, true);
};

export const deleteArticle = async (sessionId: string, articleId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/articles/${articleId}`;
  return await del(sessionId, url, true);
};
