import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createDrug } from '../../../../api/services/reancare/drugs';
import { validateFormData } from '$lib/utils/formValidation';

/////////////////////////////////////////////////////////////////////////

const createDrugSchema = zfd.formData({
	drugName: z.string().max(128),
	genericName: z.string().optional(),
	ingredients: z.string().optional(),
	strength: z.string().optional(),
	otherCommercialNames: z.string().optional(),
	manufacturer: z.string().optional(),
	otherInformation: z.string().optional()
});

export const actions = {
	createDrugAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const { result, errors } = await validateFormData(request, createDrugSchema);

		if (errors) {
            return { data: result, errors };
        }
        let response;
        try {
            response = await createDrug(
                sessionId,
				result.drugName,
				result.genericName,
				result.ingredients,
				result.strength,
				result.otherCommercialNames,
				result.manufacturer,
				result.otherInformation
            );
        } catch (error: any) {
            const errorMessageText = error?.body?.message || 'An error occurred';
            throw redirect(303, `/users/${userId}/drugs`, errorMessage(errorMessageText), event);
        }
		
        const id = response.Data.Drug.id;

        throw redirect(
			303,
			`/users/${userId}/drugs/${id}/view`,
			successMessage(`Drug created successfully!`),
			event
		);
		
	}
};
