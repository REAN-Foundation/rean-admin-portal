import type { PageServerLoad } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { getDailyStatistics, getDailyTenantStatistics } from "../../../../routes/api/services/statistics"

//////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
    let response;

    if (! event.locals.sessionUser) {
        throw error (401, 'Unauthorized Access');
    }
    if (event.locals.sessionUser.roleName === 'System admin') {
        response = await getDailyStatistics(sessionId);
     } else if (event.locals.sessionUser.roleName === 'Tenant admin') {
        response = await getDailyTenantStatistics(sessionId, event.locals.sessionUser.tenantId);
     } else {
        throw error (401, 'Unauthorized Access');
    }

    if (!response) {
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
    };
};
