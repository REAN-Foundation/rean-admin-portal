import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createLabRecordType } from '../../../../api/services/reancare/lab-record-types';
import { validateFormData } from '$lib/utils/formValidation';
/////////////////////////////////////////////////////////////////////////
const createLabRecordSchema = zfd.formData({
    typeName: z.string().max(128),
    displayName: z.string().optional(),
    snowmedCode: z.string().optional(),
    loincCode: z.string().optional(),
    normalRangeMin: zfd.numeric(z.number().optional()),
    normalRangeMax: zfd.numeric(z.number().optional()),
    unit: z.string().optional()
});
export const actions = {
    createLabRecordTypeAction: async (event: RequestEvent) => {
        const { request, params, cookies, locals } = event;
        const { userId } = params;
        const sessionId = event.cookies.get('sessionId');
        const { result, errors } = await validateFormData(request, createLabRecordSchema);

        if (errors) {
            return { data: result, errors };
        }
        let response;
        try {
            response = await createLabRecordType(
                sessionId,
                result.typeName,
                result.displayName,
                result.snowmedCode,
                result.loincCode,
                result.normalRangeMin,
                result.normalRangeMax,
                result.unit
            );
        } catch (error: any) {
            const errorMessageText = error?.body?.message || 'An error occurred';
            throw redirect(303, `/users/${userId}/lab-record-types`, errorMessage(errorMessageText), event);
        }
        const id = response.Data.LabRecordType.id;
        throw redirect(
            303,
            `/users/${userId}/lab-record-types/${id}/view`,
            successMessage(`Lab record created successfully!`),
            event
        );
    }
};
