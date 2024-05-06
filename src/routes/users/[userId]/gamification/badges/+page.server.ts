import type { ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchBadges } from '$routes/api/services/gamification/badge';
import { searchBadgeCategories } from '$routes/api/services/gamification/badge.category';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const sessionId = event.cookies.get('sessionId');
    event.depends('app:gamification-badges');
		const response = await searchBadges(sessionId);
		const _badgeCategories = await searchBadgeCategories(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const badges = response.Data;
		const badgeCategories = _badgeCategories.Data.Items;
		return {
			badges,
			badgeCategories,
			sessionId,
			message: response.Message
		};

};
