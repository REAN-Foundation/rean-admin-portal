
import { SendPasswordResetCode } from '$routes/api/services/reancare/user';
import type { RequestEvent } from '@sveltejs/kit';

//////////////////////////////////////////////////////////////

export const POST = async (event: RequestEvent) => {
    const request = event.request;
	const data = await request.json();
	try {
		console.log('Inside the send reset password code...');
		const email = data.email;
		const response = await SendPasswordResetCode(email);
		return new Response(JSON.stringify({
			Status:response.Status,
			HttpStatusCode:response.HttpCode,
			Message:response.Message
		}));
	} catch (err) {
		console.error(`Error sending code: ${err.message}`);
		return new Response(err.message);
	}
};