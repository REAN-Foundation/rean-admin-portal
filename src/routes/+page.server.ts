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
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { getPersonRolesForEmail, getPersonRolesForPhone } from './api/services/reancare/persons';

////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	try {
		let roles: PersonRole[] = await getUserRoles();
		if (!roles || roles.length === 0) {
			roles = UserRoles;
		}
		return {
			message: 'Common data successfully retrieved!',
			roles,
		};
	} catch (error) {
		console.error(`Error retrieving data : ${error.message}`);
		throw redirect(303, '/');
	}
};

//////////////////////////////////////////////////////////////////////////////////////////

const LoginSchema = zfd.formData({
	password: z.string(),
	username: z.string().optional(),
	email: z.string().optional(),
	phone: z.string().optional(),
	countryCode:z.string().optional(),
});

export const actions = {

	login: async (event: RequestEvent) => {
		const request = event.request;
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		type loginSchema = z.infer<typeof LoginSchema>;

		let result: loginSchema = {
			password: ''
		};
		try {
			result = LoginSchema.parse(formData);
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

		let phone;
		const allRoles: PersonRole[] = await getUserRoles();
		let availableRoles: PersonRole = [];
		let filteredRoles: PersonRole = [];
		let loginRoleId = null;

		if (result.phone && result.countryCode){
			 phone = result.countryCode + '-' + result.phone;
			 var res_ = availableRoles = await getPersonRolesForPhone(phone);
			 availableRoles = res_.Data?.Roles ?? [];
		}
		else if (result.email){
			var res_ = await getPersonRolesForEmail(result.email);
			availableRoles = res_.Data?.Roles ?? [];
		}

		if (availableRoles.length > 0) {
			filteredRoles = availableRoles.filter((x) => x.RoleName !== 'Doctor' && x.RoleName !== 'Patient');
			if (filteredRoles.length > 0) {
				loginRoleId = filteredRoles[0].id;
			}
		}
		else {
			if (allRoles.length > 0) {
				if (result.username && result.username === 'admin') {
					filteredRoles = allRoles.filter((x) => x.RoleName === 'System admin');
					if (filteredRoles.length > 0) {
						loginRoleId = filteredRoles[0].id;
					}
				}
				else {
					// KK: Should we throw an error here?
					filteredRoles = allRoles.filter((x) => x.RoleName === 'System user' || x.RoleName === 'Tenant admin' || x.RoleName === 'Tenant user');
					if (filteredRoles.length > 0) {
						loginRoleId = filteredRoles[0].id;
					}
				}
			}
		}

        if (filteredRoles.length == 0) {
            throw redirect(303, '/', errorMessage("Invalid user!"), event); 
        } 
        
		const response = await login(
			loginRoleId,
			result.password,
			result.username,
			result.email,
			phone
    	);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			console.log(response.Message);
			throw redirect(303, '/', errorMessage(response.Message), event);
		}
		if (!response.Data.User.Role || !response.Data.User.Role.RoleName) {
			throw redirect(303, '/', errorMessage("Permission Denied!"), event);
		}
		if (!['System admin','System user','Tenant admin','Tenant user'].includes(response.Data.User.Role.RoleName)) {
				throw redirect(303, '/', errorMessage("Permission Denied!"), event);
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
