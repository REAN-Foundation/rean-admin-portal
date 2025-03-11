import { getAssessmentById } from '$routes/api/services/careplan/assets/assessment';
import { searchAssessmentTemplates } from '$routes/api/services/reancare/assessments/assessment-templates';
import type { PageServerLoad } from './$types';
import { error,type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  try {
    const assessmentId = event.params.id;
    console.log(assessmentId);
    const response = await getAssessmentById(sessionId, assessmentId);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const assessment = response.Data;
    const id = response.Data.id;
    const assessmentTemplatesData = await searchAssessmentTemplates(sessionId,{
        orderBy: "Title",
        order: "ascending"
      });

    const assessmentTemplates = assessmentTemplatesData.Data.AssessmentTemplateRecords.Items;
    return {
      location: `${id}/edit`,
      assessment,
      assessmentTemplates,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retriving assessment ${error.message}`);
  }
};
