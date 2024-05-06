import type { RequestEvent } from '@sveltejs/kit';
import { deleteAssessmentNode } from '../../../services/assessments/assessment-nodes';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	try {
		console.log('Inside assessment node server endpoints');
		const response = await deleteAssessmentNode(
			data.sessionId,
			data.assessmentTemplateId,
			data.assessmentNodeId
		);
		return new Response(JSON.stringify({
            Status: "success",
            Message : response.Message
        }));
	} catch (err) {
		console.error(`Error deleting assessment node: ${err.message}`);
		return new Response(JSON.stringify({
            Status: "failure",
            Message : 'Error deleting assessment node'
        }));
	}
};
