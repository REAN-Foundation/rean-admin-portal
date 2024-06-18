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
		const user = response.Data.user;
		const id = response.Data.user.id;
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
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	phone: z.string().optional(),
	email: z.string().email().optional(),
	role: z.string().optional(),
	countryCode:z.string().optional(),
	selectedUserRoleId:z.string().optional(),
	// imageResourceId: z.string().optional(),
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

		const phone = result.countryCode + '-' + result.phone;
		const response = await updateUser(
			sessionId,
			id,
			result.firstName,
			result.lastName,
			phone,
			result.email,
			result.selectedUserRoleId,
			// result.role,
			// result.imageResourceId
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
