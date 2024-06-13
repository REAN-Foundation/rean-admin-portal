import { redirect } from 'sveltekit-flash-message/server';
import { error, type RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { changePassword } from '$routes/api/services/reancare/user';

/////////////////////////////////////////////////////////////////////////

const changePasswordSchema = zfd
  .formData({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(1, "New password is required"),
    confirmNewPassword: z.string().min(1, "Please confirm the new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "New password and confirm new password must match",
  });

export const actions = {
  changePasswordAction: async (event: RequestEvent) => {
    const request = event.request;
    const userId = event.params.userId;
    const sessionId = event.cookies.get('sessionId');
    const data = await request.formData();
    const formData = Object.fromEntries(data);

    type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

    let result: ChangePasswordSchema = {};

    try {
      result = changePasswordSchema.parse(formData);
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

    const response = await changePassword(
      sessionId,
      result.oldPassword,
      result.newPassword,
    );

    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw redirect(303, `/users/${userId}/change-password`, errorMessage(response.Message), event);
    }
    throw redirect(
      303,
      `/users`,
      successMessage(`Password changed successfully!`),
      event
    );
  }
};

// const changePasswordSchema = zfd.formData({
// 	oldPassword: z.string(),
// 	newPassword: z.string(),
// 	confirmNewPassword: z.string()
// });

// export const actions = {
// 	changePasswordAction: async (event: RequestEvent) => {
// 		const request = event.request;
// 		const userId = event.params.userId;
// 		const sessionId = event.cookies.get('sessionId');
// 		const data = await request.formData();
// 		const formData = Object.fromEntries(data);
    
// 		type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

// 		let result: ChangePasswordSchema = {};

// 		try {
// 			result = changePasswordSchema.parse(formData);
// 			console.log('result', result);
// 		} catch (err: any) {
// 			const { fieldErrors: errors } = err.flatten();
// 			console.log(errors);
// 			const { ...rest } = formData;
// 			return {
// 				data: rest,
// 				errors
// 			};
// 		}

// 		const response = await changePassword(
// 			sessionId,
// 			result.oldPassword,
// 			result.newPassword,
// 			result.confirmNewPassword
// 		);

// 		if (response.Status === 'failure' || response.HttpCode !== 200) {
// 			throw redirect(303, `/users/${userId}/change-password`, errorMessage(response.Message), event);
// 		}
// 		throw redirect(
// 			303,
// 			`/users`,
// 			successMessage(`Password changed successfully!`),
// 			event
// 		);
// 	}
// };

