import { redirect } from 'sveltekit-flash-message/server';
import { error, type RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getUserById, updateUser} from '$routes/api/services/reancare/user';
/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const usreId = event.params.id;
		const response = await getUserById(sessionId, usreId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const user = response.Data.User;
		const id = response.Data.User.id;
		return {
			location: `${id}/edit`,
			user,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving user: ${error.message}`);
	}
};

const updateUserSchema = zfd.formData({
	firstName: z.string().min(3).max(256),
	lastName: z.string().min(3).max(256),
	phone: z.string().min(10).max(64),
	email: z.string().email().min(10).max(64),
	role: z.string().min(10).max(64),
	password: z.string().min(6).max(15),
	imageResourceId: z.string().optional(),
});

export const actions = {
	updateUserAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const id = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		type UserSchema = z.infer<typeof updateUserSchema>;

		let result: UserSchema = {};
		try {
			result = updateUserSchema.parse(formData);
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

		const response = await updateUser(
			sessionId,
			id,
			result.firstName,
			result.lastName,
			result.phone,
			result.email,
			result.role,
			result.password,
			result.imageResourceId
		);
		// const id = response.Data.user.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/users`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/users/${id}/view`,
			successMessage(`User updated successfully!`),
			event
		);
	}
};
