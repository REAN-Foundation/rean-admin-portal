import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchCourseContents } from '../../../../../../../api/services/course.contents';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const sessionId = event.cookies.get('sessionId');
    const moduleId = event.params.moduleId;
    event.depends('app:courses-modules-contents');
	try {
		const response = await searchCourseContents(sessionId, {
            moduleId: moduleId
        });
        if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const courseContent = response.Data.CourseContents;
		return {
			courseContent,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving course content: ${error.message}`);
	}
};
