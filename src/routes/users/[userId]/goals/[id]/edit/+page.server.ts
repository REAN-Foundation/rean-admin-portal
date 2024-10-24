import type { PageServerLoad } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getGoalById, updateGoal } from '../../../../../api/services/reancare/goals';
import { validateFormData_ } from '$lib/utils/formValidation';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    console.log('Loading the goals/edit page');
    const sessionId = event.cookies.get('sessionId');
    const goalId = event.params.id;
    const response = await getGoalById(sessionId, goalId);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message);
    }
    const goal = response.Data.GoalType;
    const id = response.Data.GoalType.id;
    return {
        location: `${id}/edit`,
        goal,
        message: response.Message,
        title: 'Types-Goals Edit'
    };
};

const updateGoalTypeSchema = zfd.formData({
    type: z.string().min(8).max(256),
    tags: z.array(z.string()).optional().default([])
});

export const actions = {
    updateGoalAction: async (event: RequestEvent) => {
        const request = event.request;
        const userId = event.params.userId;
        const goalId = event.params.id;
        const sessionId = event.cookies.get('sessionId');
        const data = await request.formData();
        // const formData = Object.fromEntries(data);

        // const tags = data.has('tags') ? data.getAll('tags') : [];
        // const formDataValue = { ...formData, tags: tags };

        // type GoalTypeSchema = z.infer<typeof updateGoalTypeSchema>;

        // let result: GoalTypeSchema = {};
        // try {
        //     result = updateGoalTypeSchema.parse(formDataValue);
        //     console.log('result', result);
        // } catch (err: any) {
        //     const { fieldErrors: errors } = err.flatten();
        //     console.log(errors);
        //     const { ...rest } = formData;
        //     return {
        //         data: rest,
        //         errors
        //     };
        // }
        const { result, errors } = await validateFormData_(data, updateGoalTypeSchema);
        if (errors) {
            console.log('Validation Errors:', errors);
            return { data: Object.fromEntries(data), errors };
          
          }
        let response;
        try {
            response = await updateGoal(sessionId, goalId, result.type, result.tags);
        } catch (error: any) {
            const errorMessageText = error?.body?.message || 'An error occurred';
            throw redirect(303, `/users/${userId}/goals`, errorMessage(errorMessageText), event);
        }
        const id = response.Data.GoalType.id;
        throw redirect(
            303,
            `/users/${userId}/goals/${id}/view`,
            successMessage(`Goal type updated successfully!`),
            event
        );
    }
};
