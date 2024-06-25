import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error} from '@sveltejs/kit';
import { searchEnrollments } from '$routes/api/services/careplan/enrollment';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const userId = event.params.userId;
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);
    const response = await searchEnrollments(sessionId);
    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const enrollments = response.Data;
    return {
      enrollments,
      sessionId,
      message: response.Message
    };

};
