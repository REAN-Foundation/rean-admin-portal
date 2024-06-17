import { resetPassword } from '$routes/api/services/reancare/user';
import type { RequestEvent } from '@sveltejs/kit';
import { HttpStatusCode } from 'axios';

//////////////////////////////////////////////////////////////

export const POST = async (event: RequestEvent) => {
  const request = event.request;
	const data = await request.json();
	try {
		console.log('Inside the reset password...');
		const email = data.email;
    const resetCode = data.resetCode;
    const newPassword = data.newPassword;
		const response = await resetPassword(email, resetCode,newPassword);
        return new Response(JSON.stringify({
					Status:response.Status,
					HttpStatusCode:response.HttpCode,
					Message:response.Message
				}));
	} catch (err) {
		console.error(`Error reseting the password: ${err.message}`);
		return new Response(err.message);
	}
};