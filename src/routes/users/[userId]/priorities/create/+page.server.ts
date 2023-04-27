import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createPriority } from '../../../../api/services/priorities';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

/////////////////////////////////////////////////////////////////////////

const createPriorityTypeSchema = zfd.formData({
	type: z.string().max(256),
	tags: z.array(z.string()).optional()
});

export const actions = {
	createPriorityAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();

		const type = data.has('type') ? data.get('type') : null;
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formData = {
			type: type,
			tags: tags
		};

		type PriorityTypeSchema = z.infer<typeof createPriorityTypeSchema>;

		let result: PriorityTypeSchema = {};
		try {
			result = createPriorityTypeSchema.parse(formData);
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

		const response = await createPriority(sessionId, result.type, result.tags);
		const id = response.Data.PriorityType.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/priorities`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/priorities/${id}/view`,
			successMessage(`Priority created successfully !`),
			event
		);
	}
};
