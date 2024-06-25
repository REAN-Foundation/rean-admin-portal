import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchDrugs } from '../../../api/services/reancare/drugs';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({cookies,depends}) => {
	const sessionId = cookies.get('sessionId');
	depends('app:drugs')
    const response = await searchDrugs(sessionId, {
        orderBy : 'DrugName',
        order : 'ascending'
    });
    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message);
    }
    const drugs = response.Data.Drugs;
    return {
     drugs,
        sessionId,
        message: response.Message
    };
};
