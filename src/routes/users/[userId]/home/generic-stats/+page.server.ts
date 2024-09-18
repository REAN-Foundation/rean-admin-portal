
// import { promises as fs } from 'fs';
// import { error, type RequestEvent } from '@sveltejs/kit';
// import type { PageServerLoad } from './$types';
// import path from 'path';
// import chalk from 'chalk';

// export const load: PageServerLoad = async (event: RequestEvent) => {
//     try {
//         // Load the JSON file from the `lib` directory
//         const filePath = path.resolve('D:/Official Work/FRONT END/generic_engagement_metrics.json');
//         const jsonData = await fs.readFile(filePath, 'utf-8');
//         const data = JSON.parse(jsonData);
//         // console.log(chalk.red(JSON.stringify(data),'thisis data '))

//         // Return the required data for use in the page
//         return {
//             // patientRegistrationHistory: data.Data.PatientRegistrationHistory,
//             statistics: data.Data 
//             // data: data.Data
//         };
//     } catch (err) {
//         throw error(401, 'Error loading data:');

//     }
// };


import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDailyStatisticsUserAnalytics } from '../../../../api/services/reancare/statistics';
import chalk from 'chalk';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage} from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
    const userId = event.params.userId;
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    const response = await getDailyStatisticsUserAnalytics(sessionId, formattedDate)
    console.log(chalk.yellow(JSON.stringify(response)));
    // const data = JSON.parse(await response);


    if (!response) {
        throw error(404, 'Daily user statistics data not found');
    }
    if (response.Status === 'Failure') {
        throw redirect(303, `/users/${userId}/home`,
			errorMessage('Latest generic engagement analytics report not available.'), 
			event
			);
     }


    return {
        sessionId,
        statistics: response.Data
    };
};
