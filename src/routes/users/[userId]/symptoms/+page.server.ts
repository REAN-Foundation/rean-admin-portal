import { error } from '@sveltejs/kit';
import { BACKEND_API_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { searchSymptoms } from '../../../api/services/reancare/symptoms';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({cookies,depends}) => {
	const sessionId = cookies.get('sessionId');
	depends('app:symptoms')
    const response = await searchSymptoms(sessionId, {
        orderBy: 'Symptom',
        order : 'ascending'
    });
    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message);
    }

    const symptomsCount = response.Data.SymptomTypes.TotalCount;
    const symptoms = response.Data.SymptomTypes.Items;
    // for (const symptom of symptoms) {
    // 	if (symptom.ImageResourceId) {
    // 		symptom['ImageUrl'] =
    // 			BACKEND_API_URL +
    // 			`/file-resources/${symptom.ImageResourceId}/download?disposition=inline`;
    // 	} else {
    // 		symptom['ImageUrl'] = null;
    // 	}
    // }
    return {
        symptomsCount,
        symptoms,
        sessionId,
        message: response.Message,
        backendUrl:BACKEND_API_URL
    };
		
};
