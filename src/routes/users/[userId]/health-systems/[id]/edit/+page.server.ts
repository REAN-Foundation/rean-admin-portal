import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getHealthSystemById, updateHealthSystem } from '../../../../../api/services/reancare/health.systems';
import { searchHealthSystems } from '../../../../../api/services/reancare/health.systems';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
    const healthSystemId = event.params.id;
    const response = await getHealthSystemById(sessionId, healthSystemId);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message);
    }
    const healthSystem = response.Data.HealthSystem;
    const id = response.Data.HealthSystem.id;

    return {
        location: `${id}/edit`,
        healthSystem,
        message: response.Message,
        title: 'Hospital Systems-Health Systems Edit'
    };
};

const updateHealthSystemSchema = zfd.formData({
    healthSystemName: z.string().max(128),
    tags: z.array(z.string()).optional()
});

export const actions = {
    updateHealthSystemAction: async (event: RequestEvent) => {
        const request = event.request;
        const userId = event.params.userId;
        const healthSystemId = event.params.id;
        const sessionId = event.cookies.get('sessionId');
        const data = await request.formData();
        const formData = Object.fromEntries(data);
        const tags = data.has('tags') ? data.getAll('tags') : [];
        const formDataValue = { ...formData, tags: tags };

        console.log('formData', JSON.stringify(formDataValue, null, 2));

        type HealthSystemSchema = z.infer<typeof updateHealthSystemSchema>;

        let result: HealthSystemSchema = {};
        try {
            result = updateHealthSystemSchema.parse(formDataValue);
            console.log('result', result);
        } catch (err) {
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
            response = await updateHealthSystem(sessionId, healthSystemId, result.healthSystemName, result.tags);
        } catch (error: any) {
            const errorMessageText = error?.body?.message || 'An error occurred';
            throw redirect(303, `/users/${userId}/health-systems`, errorMessage(errorMessageText), event);
        }
        const id = response.Data.HealthSystem.id;
        throw redirect(
            303,
            `/users/${userId}/health-systems/${id}/view`,
            successMessage(`Health system updated successfully!`),
            event
        );
    }
};
