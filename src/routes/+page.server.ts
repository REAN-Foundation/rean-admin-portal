import type { PersonRole } from '$lib/types/domain.models';
import { CookieUtils } from '$lib/utils/cookie.utils';
import { UserRoles } from '$lib/system.types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { SessionManager } from './api/sessions/session.manager';
import { login } from './api/services/reancare/user';
import { getUserRoles } from './api/services/reancare/types';
import { logLoadingError } from './api/error.logging';

////////////////////////////////////////////////////////////////

// export const load: PageServerLoad = async (event: RequestEvent) => {
// 	try {
// 		let roles: PersonRole[] = await getUserRoles();
// 		if (!roles || roles.length === 0) {
// 			roles = UserRoles;
// 		}
// 		return {
// 			message: 'Common data successfully retrieved!',
// 			roles,
// 		};
// 	} catch (error) {
// 		logLoadingError('PageServerLoad', event, error.message);
// 		throw redirect(303, '/');
// 	}
// };

//////////////////////////////////////////////////////////////////////////////////////////

export const actions = {
	login: async (event: RequestEvent) => {
		const request = event.request;
		const data = await request.formData(); // or .json(), or .text(), etc
		console.log(Object.fromEntries(data));

		const username = data.has('username') ? (data.get('username') as string) : null;
		const password = data.has('password') ? (data.get('password') as string) : null;
		const loginRoleId_ = data.has('loginRoleId') ? data.get('loginRoleId') : null;
		const loginRoleId = loginRoleId_?.valueOf() as number;
		if (!username || !password) {
			throw error(400, `Username or password are not valid!`);
		}
		console.log(`data....... = ${JSON.stringify(request, null, 2)}`);
		// const response = await login(username, password, loginRoleId ?? 1);
        const response = await login(username, password);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			console.log(response.Message);
			logLoadingError('Login action', event, response.Message);
			//Login error, so redirect to the sign-in page
			throw redirect(303, '/', errorMessage(response.Message), event);
		}
		console.log('response ....', response);
		const user = response.Data.User;
		user.SessionId = response.Data.SessionId;
		const accessToken = response.Data.AccessToken;
        const refreshToken = response.Data.RefreshToken;
		const expiryDate = new Date(response.Data.SessionValidTill);
		const sessionId = response.Data.SessionId;
		const userId: string = response.Data.User.id;

			const session = await SessionManager.constructSession(user, accessToken, expiryDate, refreshToken);
		if (!session) {
			console.log(`Session cannot be constructed!`);
			throw redirect(303, `/`, errorMessage(`Use login session cannot be created!`), event);
		}
		console.log('Session - ' + JSON.stringify(session, null, 2));
		const userSession = await SessionManager.addSession(session.sessionId, session);
		console.log(JSON.stringify(userSession, null, 2));

		CookieUtils.setCookieHeader(event, 'sessionId', sessionId);
      
		throw redirect(303, `/users/${userId}/home`, successMessage(`Login successful!`), event);
	}
};
