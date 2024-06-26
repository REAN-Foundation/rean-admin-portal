import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchCourses } from '../../../api/services/reancare/courses';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const sessionId = event.cookies.get('sessionId');
    event.depends('app:courses');
	console.log('sessionId', sessionId);
	try {
		const response = await searchCourses(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const courses = response.Data.Courses;
		return {
			courses,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving courses: ${error.message}`);
	}
};
