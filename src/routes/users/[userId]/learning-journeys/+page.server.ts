import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchLearningJourneys } from '../../../api/services/reancare/learning-journeys';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const sessionId = event.cookies.get('sessionId');
    event.depends('app:learning-journeys');
	console.log('sessionId', sessionId);
	try {
		const response = await searchLearningJourneys(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const learningPaths = response.Data.LearningPaths;
		console.log('learningPaths', learningPaths);
		return {
			learningPaths,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving learning paths: ${error.message}`);
	}
};
