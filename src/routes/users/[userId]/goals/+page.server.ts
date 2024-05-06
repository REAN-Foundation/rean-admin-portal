import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchGoals } from '../../../api/services/goals';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const sessionId = event.cookies.get('sessionId');
    event.depends('app:goals');
	try {
		const response = await searchGoals(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const goalTypes = response.Data.GoalTypes;
		return {
			goalTypes,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving goals: ${error.message}`);
	}
};
