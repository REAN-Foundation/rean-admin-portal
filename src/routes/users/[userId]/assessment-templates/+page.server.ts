import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchAssessmentTemplates } from '../../../api/services/assessments/assessment-templates';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({cookies,depends}) => {
	const sessionId = cookies.get('sessionId');
	depends('app:assessmentTemplate')
    const response = await searchAssessmentTemplates(sessionId);
    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message);
    }
    const assessmentTemplate = response.Data.AssessmentTemplateRecords;
    return {
        assessmentTemplate,
        sessionId,
        message: response.Message,
    };		
};
