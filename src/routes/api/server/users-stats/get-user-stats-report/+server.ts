import type { RequestEvent } from '@sveltejs/kit';
import { getDailySystemStatistics, getDailyTenantStatistics, getDailyTenantStatsReport } from '../../../services/statistics';
import { download } from '../../../services/file.resource';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;
    const tenantId = event.locals.sessionUser.tenantId;
    const roleId = event.locals.sessionUser.roleId;
    let response;
	try {
        if (roleId == "1") {
            response = await getDailySystemStatistics(sessionId);
        } else {
            response = await getDailyTenantStatistics(sessionId, tenantId);
        }
	
		const resourceId = response ? response.Data.DailyStatistics.ResourceId : null;
        console.log("/////",resourceId);
        if (resourceId) {
            response = await getDailyTenantStatsReport(
                sessionId,
                resourceId,
            );
        }
	} catch (error) {
		console.error(`Error downloading the stats report: ${error}`);
        throw redirect(
			errorMessage('Error in downloading.'), 
			event
			);
        }
	
    if(response===null){
		throw redirect(
			errorMessage('Summary report is not available!.'), 
			event
			);
	}
    return response;
};
