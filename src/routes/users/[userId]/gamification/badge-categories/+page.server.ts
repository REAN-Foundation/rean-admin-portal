import type { ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchBadgeCategories } from '$routes/api/services/gamification/badge.category';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const sessionId = event.cookies.get('sessionId');
    event.depends('app:gamification-badge-categories');
		const response = await searchBadgeCategories(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const badgeCategories = response.Data;
		return {
			badgeCategories,
			sessionId,
			message: response.Message
		};

};
