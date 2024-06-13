import type { RequestEvent } from '@sveltejs/kit';
import { deleteAssessmentNode } from '../../../services/reancare/assessments/assessment-nodes';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
    let response;
	try {
		console.log('Inside assessment node server endpoints');
		response = await deleteAssessmentNode(
			data.sessionId,
			data.assessmentTemplateId,
			data.assessmentNodeId
		);
		return new Response(JSON.stringify({
            Status: "success",
            Message : response.Message
        }));
	} catch (err) {
		console.error(`Error deleting assessment node: ${JSON.parse(err).message}`);
		return new Response(JSON.stringify({
            Status: "failure",
            Message : JSON.parse(err).message ? JSON.parse(err).message : 'Error deleting assessment node'
        }));
	}
};
