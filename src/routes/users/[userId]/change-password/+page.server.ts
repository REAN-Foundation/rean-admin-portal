import { redirect } from 'sveltekit-flash-message/server';
import { error, type RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { changePassword } from '$routes/api/services/reancare/user';
import { validateFormData } from '$lib/utils/formValidation'; 

/////////////////////////////////////////////////////////////////////////

const changePasswordSchema = zfd
  .formData({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(8, "New password should be greater than 8 characters"),
    confirmNewPassword: z.string().min(1, "Please confirm the new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "New password and confirm new password must match",
  });

export const actions = {
  changePasswordAction: async (event: RequestEvent) => {
    const { request, params, cookies, locals } = event;
    const { userId } = params;
    const sessionId = cookies.get('sessionId');
    const { email, username, roleId } = locals?.sessionUser || {};
    const { result, errors } = await validateFormData(request, changePasswordSchema);

    if (errors) {
      return { data: result, errors };
    }

    let response
    try {
       response = await changePassword(
        sessionId,
        result.oldPassword,
        result.newPassword,
        email,
        username,
        roleId,
      );
    } catch (error: any) {
      const errorMessageText = error?.body?.message || 'An error occurred';
      throw redirect(303, `/users/${userId}/change-password`, errorMessage(errorMessageText), event);
    }
    throw redirect(303, `/users/${userId}/home`, successMessage(response.Message), event);
  }
};





