import type { LoginModel } from '$lib/types/domain.models';
import { Helper } from '$lib/utils/helper';
import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from '$env/static/private';
import { del, get, post, put } from './common.reancare';
////////////////////////////////////////////////////////////////

export const login = async (username: string, password: string) => {
	const model: LoginModel = getLoginModel(username, password);
	console.log(JSON.stringify(model, null, 2));

	const headers = {};
	headers['Content-Type'] = 'application/json';
	headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
	const body = JSON.stringify(model);
	console.log('model', model);
	const url =
		BACKEND_API_URL + (model.Password ? '/users/login-with-password' : '/users/login-otp');
	const res = await fetch(url, {
		method: 'POST',
		body,
		headers
	});
	const response = await res.json();
	console.log('response', response);
	return response;
};

const getLoginModel = (username: string, password: string): LoginModel => {
	const loginModel: LoginModel = {
		// LoginRoleId: loginRoleId ?? 1
	};

	if (Helper.isEmail(username)) {
		loginModel.Email = username;
	} else if (Helper.isPhone(username)) {
		loginModel.Phone = username;
	} else {
		loginModel.UserName = username;
	}

	if (Helper.isOtp(password)) {
		loginModel.Otp = password;
	} else {
		loginModel.Password = password;
	}
	return loginModel;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const logout = async (sessionId: string) => {
	const url = BACKEND_API_URL + `/users/logout`;
	return await post(sessionId, url, {}, true, API_CLIENT_INTERNAL_KEY);
};

////////////////////////////////////////////////////////////////////////////////////

export const changePassword = async (
	sessionId: string,
	oldPassword: string,
	newPassword: string,
) => {
	const body = {
		oldPassword: oldPassword,
		newPassword: newPassword
	};
	const url = BACKEND_API_URL + `/users/reset-password`;
	return await post(sessionId, url, body, true, API_CLIENT_INTERNAL_KEY);
};

///////////////////////////////////////////////////////////////////////

// User curd end points

export const createUser = async (
	sessionId: string,
	firstName: string,
	lastName: string,
  phone: string,
	email: string,
	role: string,
	password: string,
	imageResourceId: string
) => {
	const body = {
		FirstName: firstName,
		LastName: lastName,
    Role: role,
		Phone: phone ? phone : null,
    Email: email ? email : null,
		Password: password,
		ImageResourceId: imageResourceId
	};

	if (Helper.isPhone(phone)) {
		body.Phone = Helper.sanitizePhone(phone);
	};
	const url = BACKEND_API_URL + '/users';
	return await post(sessionId, url, body, true, API_CLIENT_INTERNAL_KEY);
};

export const getUserById = async (sessionId: string, userId: string) => {
	const url = BACKEND_API_URL + `/users/${userId}`;
	return await get(sessionId, url, true, API_CLIENT_INTERNAL_KEY);
};

export const searchUsers = async (sessionId: string, searchParams?: any) => {
	let searchString = '';
	if (searchParams) {
		const keys = Object.keys(searchParams);
		if (keys.length > 0) {
			searchString = '?';
			const params = [];
			for (const key of keys) {
				if (searchParams[key]) {
					const param = `${key}=${searchParams[key]}`;
					params.push(param);
				}
			}
			searchString += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users/search${searchString}`;
	return await get(sessionId, url, true, API_CLIENT_INTERNAL_KEY);
};

export const updateUser = async (
	sessionId: string,
  userId: string,
	firstName: string,
	lastName: string,
  phone: string,
	email: string,
	role: string,
	password: string,
	imageResourceId: string
) => {
	const body = {
		FirstName: firstName,
		LastName: lastName,
    Role: role,
		Phone: phone ? phone : null,
    Email: email ? email : null,
		Password: password,
		ImageResourceId: imageResourceId
	};
	if (Helper.isPhone(phone)) {
		body.Phone = Helper.sanitizePhone(phone);
	};
	const url = BACKEND_API_URL + `/users/${userId}`;
	return await put(sessionId, url, body, true, API_CLIENT_INTERNAL_KEY);
};

export const deleteUser = async (sessionId: string, usreId: string) => {
	const url = BACKEND_API_URL + `/users/${usreId}`;
	return await del(sessionId, url, true, API_CLIENT_INTERNAL_KEY);
};