import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { del, get, post, put } from '../common.careplan';

////////////////////////////////////////////////////////////////

export const createReminder = async (
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
  const url = CAREPLAN_BACKEND_API_URL + '/assets/reminders';
  return await post(sessionId, url, body, true);
};

export const getReminderById = async (sessionId: string, reminderId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/reminders/${reminderId}`;
  return await get(sessionId, url, true);
};

export const searchReminders = async (sessionId: string, searchParams: any) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';
    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/reminders/search${searchString}`;
  return await get(sessionId, url, true);
};

export const updateReminder = async (
  sessionId: string,
  reminderId: string,
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

  const url = CAREPLAN_BACKEND_API_URL + `/assets/reminders/${reminderId}`;

  return await put(sessionId, url, body, true);
};

export const deleteReminder = async (sessionId: string, reminderId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/reminder/${reminderId}`;
  return await del(sessionId, url, true);
};
