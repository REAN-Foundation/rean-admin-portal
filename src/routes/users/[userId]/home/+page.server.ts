import type { PageServerLoad } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { getDailyStatistics, getDailyTenantStatistics } from "../../../api/services/reancare/statistics"

//////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
    let response;

    if (! event.locals.sessionUser) {
        throw error (401, 'Unauthorized Access');
    }
    if (event.locals.sessionUser.roleName === 'System admin' ||
        event.locals.sessionUser.roleName === 'System user'
      ) {
        response = await getDailyStatistics(sessionId);
     } else if (event.locals.sessionUser.roleName === 'Tenant admin' ||
      event.locals.sessionUser.roleName === 'Tenant user'
     ) {
        response = await getDailyTenantStatistics(sessionId, event.locals.sessionUser.tenantId);
     } else {
        throw error (401, 'Unauthorized Access');
    }

    if (!response || !response.Data.DailyStatistics.DashboardStats) {
        throw error(404, 'Daily user statistics data not found');
    }
    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message);
    }

    const userCountStats = response.Data.DailyStatistics.DashboardStats.UserStatistics.UsersCountStats;
    const deviceDetailsStats = response.Data.DailyStatistics.DashboardStats.UserStatistics.DeviceDetailWiseUsers;
    const userCountByYears = response.Data.DailyStatistics.DashboardStats.UserStatistics.YearWiseUserCount;
    const deviceDetailsByYears = response.Data.DailyStatistics.DashboardStats.UserStatistics.YearWiseDeviceDetails;

    return {
        sessionId,
        userCountStats,
        userCountByYears,
        deviceDetailsStats,
        deviceDetailsByYears,
        title:'Dashboard-Home-Overall'
    };
};
