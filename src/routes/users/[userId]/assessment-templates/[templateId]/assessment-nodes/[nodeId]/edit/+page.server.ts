import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import {
    getAssessmentNodeById,
    getQueryResponseTypes,
    searchAssessmentNodes,
    updateAssessmentNode
} from '../../../../../../../api/services/reancare/assessments/assessment-nodes';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');

    const templateId = event.params.templateId;
    const assessmentNodeId = event.params.nodeId;
    const searchParams = {
        templateId: templateId
    };
    const _queryResponseTypes = await getQueryResponseTypes(sessionId);
    const _assessmentNodes = await searchAssessmentNodes(sessionId, searchParams);
    const response = await getAssessmentNodeById(sessionId, templateId, assessmentNodeId);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message);
    }
    const assessmentNode = response.Data.AssessmentNode;
    const queryResponseTypes = _queryResponseTypes.Data.QueryResponseTypes;
    const assessmentNodes = _assessmentNodes.Data.AssessmentNodeRecords.Items;
    const id = response.Data.AssessmentNode.id;
    return {
        location: `${id}/edit`,
        assessmentNode,
        queryResponseTypes,
        assessmentNodes,
        message: response.Message,
        title: 'Clinical-Assessments-Assessment Nodes Edit'
    };
};

const updateAssessmentNodeSchema = zfd.formData({
    nodeType: z.string(),
    title: z.string().min(8).max(256),
    description: z.string().optional(),
    queryType: z.string().optional(),
    resolutionScore: zfd.numeric(z.number().default(1)),
    providerAssessmentCode: z.string().optional(),
    message: z.string().optional(),
    serveListNodeChildrenAtOnce: zfd.checkbox({ trueValue: 'true' }),
    scoringApplicable: zfd.checkbox({ trueValue: 'true' }),
    options: z.array(z.string()),
    sequence: zfd.numeric(z.number().optional()),
    tags: z.array(z.string()).optional()

});

export const actions = {
    updateAssessmentNodeAction: async (event: RequestEvent) => {
        const request = event.request;
        const userId = event.params.userId;
        const templateId = event.params.templateId;
        const assessmentNodeId = event.params.nodeId;
        const scoreConditionId = event.params.scoreConditionId;
        const sessionId = event.cookies.get('sessionId');
        const data = await request.formData();
        const tags = data.has('tags') ? data.getAll('tags') : [];
        const options = data.has('options') ? data.getAll('options') : [];
        const formData = Object.fromEntries(data);
        const formDataValue = { ...formData, options: options, tags: tags };

        type AssessmentNodeSchema = z.infer<typeof updateAssessmentNodeSchema>;

        let result: AssessmentNodeSchema = {};
        try {
            result = updateAssessmentNodeSchema.parse(formDataValue);
            console.log('result', result);
        } catch (err: any) {
            const { fieldErrors: errors } = err.flatten();
            console.log(errors);
            const { ...rest } = formData;
            return {
                data: rest,
                errors
            };
        }

        let response;
        try {
            response = await updateAssessmentNode(
                sessionId,
                templateId,
                assessmentNodeId,
                result.nodeType,
                result.title,
                result.description,
                result.tags,
                result.queryType,
                result.options,
                result.message,
                result.sequence,
                result.serveListNodeChildrenAtOnce
            );
        } catch (error: any) {
            const errorMessageText = error?.body?.message || 'An error occurred';
            throw redirect(303, `/users/${userId}/assessment-templates`, errorMessage(errorMessageText), event);
        }
        const nodeId = response.Data.AssessmentNode.id;

        console.log('response', response.Data);
        throw redirect(
            303,
            `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/view`,
            successMessage(`Assessment node updated successfully!`),
            event
        );
    }
};
