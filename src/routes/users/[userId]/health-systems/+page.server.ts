import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchHealthSystems } from '../../../api/services/reancare/health.systems';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({cookies,depends}) => {
	const sessionId = cookies.get('sessionId');
	depends('app:healthSystem');
    const response = await searchHealthSystems(sessionId, 
        {
            orderBy: "Name",
            order: "ascending"
        }
    );
    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message);
    }
    const healthSystems = response.Data.HealthSystems;
    console.log("%%%",healthSystems);
    // healthSystems = healthSystems.map((item, index) => ({ ...item, index: index + 1 }));
    return {
        healthSystems,
        sessionId,
        message: response.Message
    };

		
};
