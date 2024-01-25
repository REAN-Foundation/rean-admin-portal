import type { PageServerLoad } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { getDailyStatistics } from '$routes/api/services/statistics';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');

    const response = await getDailyStatistics(sessionId);
    if (!response) {
        throw error(404, 'Daily user statistics data not found');
    }
    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message);
    }
    const userCountStats = response.Data.DailyStatistics.Statistics.UserStatistics.UsersCountStats;
    var deviceDetailsStats = response.Data.DailyStatistics.Statistics.UserStatistics.DeviceDetailWiseUsers;
    const userCountByYears = response.Data.DailyStatistics.Statistics.UserStatistics.YearWiseUserCount;
    const deviceDetailsByYears = response.Data.DailyStatistics.Statistics.UserStatistics.YearWiseDeviceDetails;
    deviceDetailsStats = deviceDetailsStats.map((item) => {
        if (item.OSType === 'aaa') {
            return { OSType: 'Missing device detail', count: item.count };
        }
        return item;
    });

    const appDownloadsData = response.Data.DailyStatistics.DashboardStats.UserStatistics.AppDownload;
    let appDownloadCount = 0;

    if (appDownloadsData.rows.length > 0) {
        const latestEntry = latestDownloadEnrty(appDownloadsData);
        appDownloadCount = latestEntry.TotalDownloads;
    }

    return {
        sessionId,
        userCountStats,
        userCountByYears,
        deviceDetailsStats,
        deviceDetailsByYears,
        appDownloadCount,
    };

    function latestDownloadEnrty(appDownloadsData) {
        return appDownloadsData.rows.reduce((latest, current) => {
            const latestTimestamp = latest ? new Date(latest.CreatedAt).getTime() : 0;
            const currentTimestamp = new Date(current.CreatedAt).getTime();
            return currentTimestamp > latestTimestamp ? current : latest;
        }, null);
    }
};
