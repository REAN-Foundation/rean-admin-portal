import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createNotification } from '../../../../api/services/notifications';
import { z } from 'zod';

/////////////////////////////////////////////////////////////////////////

const createNotificationSchema = z.object({
	title: z.string().min(3).max(64),
	body: z.string().optional(),
	type: z.string().min(3).max(64),
	broadcastToAll: z
		.enum(['true', 'false'])
		.transform((val) => val === 'true')
		.default('false'),
	imageUrl: z.string().optional(),
});

export const actions = {
	createNotificationAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());
		type NotificationSchema = z.infer<typeof createNotificationSchema>;
		let result: NotificationSchema = {};
		try {
			result = createNotificationSchema.parse(formData);
			console.log('result-----------', result);
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			console.log(errors);
			const { ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}
		const response = await createNotification(
			sessionId,
			result.title,
			result.body,
			result.type,
			result.broadcastToAll,
			result.imageUrl
		);
		const id = response.Data.Notification.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/notifications`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/notifications/${id}/view`,
			successMessage(`Notification created successfully !`),
			event
		);
	}
};
