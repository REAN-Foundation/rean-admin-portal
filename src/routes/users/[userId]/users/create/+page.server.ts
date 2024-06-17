import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createUser } from '$routes/api/services/reancare/user';

/////////////////////////////////////////////////////////////////////////

const createUserSchema = zfd.formData({
	firstName: z.string().min(3).max(256),
	lastName: z.string().min(3).max(256),
	phone: z.string().min(10).max(64),
	email: z.string().email().min(10).max(64),
	role: z.string().min(10).max(64),
	password: z.string().min(6).max(15),
	// imageResourceId: z.string().optional(),
    selectedUserRoleId: z.string()

});

export const actions = {
	createUserAction: async (event: RequestEvent) => {
        const tenantId = event.locals?.sessionUser?.tenantId;
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		type UserSchema = z.infer<typeof createUserSchema>;

		let result: UserSchema = {};
		try {
			result = createUserSchema.parse(formData);
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
		const response = await createUser(
			sessionId,
            tenantId,
			result.firstName,
			result.lastName,
			result.phone,
			result.email,
			result.role,
            result.selectedUserRoleId,
			result.password,
    	);
		const id = response.Data.User.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/users`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/users/${id}/view`,
			successMessage(`User created successfully!`),
			event
		);
	}
};
