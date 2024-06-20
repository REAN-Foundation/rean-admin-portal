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
	const usreId = event.params.userId;
	const response = await getUserById(sessionId, usreId);

	if (response.Status === 'failure' || response.HttpCode !== 200) {
		throw error(response.HttpCode, response.Message);
	}
	const user = response.Data.user;
	const id = response.Data.user.id;
	console.log("user............", user)
	return {
		location: `${id}/edit`,
		user,
		message: response.Message
	};
	
};

const updateUserSchema = zfd.formData({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	phone: z.string().optional(),
	email: z.string().email().optional(),
	countryCode:z.string().optional(),
	roleId:z.string().optional(),
});

export const actions = {
	updateProfileAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
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
		const defaultTimeZone = result.countryCode === '+1' ? '-05:00' : '+05:30';
		const currentTimeZone = result.countryCode === '+1' ? '-05:00' : '+05:30';
		const phone = result.countryCode + '-' + result.phone;
		const response = await updateUser(
			sessionId,
			userId,
			result.firstName,
			result.lastName,
			phone,
			result.email,
			result.roleId,
			defaultTimeZone,
			currentTimeZone
		);
		// const id = response.Data.user.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/users`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/home`,
			successMessage(`Profile updated successfully!`),
			event
		);
	}
};
