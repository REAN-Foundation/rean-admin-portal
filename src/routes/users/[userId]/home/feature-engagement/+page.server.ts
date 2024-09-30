
import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUserAnalytics } from '../../../../api/services/user-analytics/user-analytics';
import chalk from 'chalk';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
    const userId = event.params.userId;
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    const response = await getUserAnalytics(sessionId, formattedDate)
    // console.log(chalk.yellow(JSON.stringify(response)));
    // const data = JSON.parse(await response);


    if (!response) {
        throw error(404, 'Daily user statistics data not found');
    }
    if (response.Status === 'Failure') {
        throw redirect(303, `/users/${userId}/home`,
            errorMessage('Latest feature statistics analytics report not available.'),
            event
        );
    }



    return {
        sessionId,
        statistics: response.Data
    };
};