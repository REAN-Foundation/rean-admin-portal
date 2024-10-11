import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchLabRecordTypes } from '../../../api/services/reancare/lab-record-types';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({cookies,depends}) => {
	const sessionId = cookies.get('sessionId');
	depends('app:labRecordType')
	let labRecordTypes=[]
    const response = await searchLabRecordTypes(sessionId, {
        orderBy: "typeName",
        order: "ascending"
    });
    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message);
    }
    labRecordTypes = response.Data.LabRecordTypes.Items;
    return {
        labRecordTypes,
        sessionId,
        message: response.Message,
        title:'Clinical-Lab Records'
    };
		
};
