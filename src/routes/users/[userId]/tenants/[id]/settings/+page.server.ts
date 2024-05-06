import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getTenantSettings } from '../../../../../api/services/tenant-settings';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId') as string;
    let settings = undefined;
	try {
        console.log('Event-',event.params)
        const tenantId = event.params.id as string;
		const response = await getTenantSettings(sessionId, tenantId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}

        if (response.Data.TenantSettings) {
            settings = response.Data.TenantSettings;
        }

        console.log('response=',settings);
		return {
			sessionId,
			tenantId,
			settings
		};
	} catch (error) {
		console.error(`Error retriving tenant settings: ${error.message}`);
	}
};
