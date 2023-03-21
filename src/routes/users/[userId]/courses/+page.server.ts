import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchCourses } from '../../../api/services/courses';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);
  try {
    const response = await searchCourses(sessionId);
    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const courses = response.Data;
    console.log("courses",courses);
    return {
      courses,
      sessionId,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retriving courses: ${error.message}`);
  }
};