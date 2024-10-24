import { API_CLIENT_INTERNAL_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { SessionManager } from '../sessions/session.manager';
import chalk from 'chalk';

/////////////////////////////////////////////////////////////////////////

export const get_ = async (
	sessionId: string,
	url: string,
	authorizeUser = false,
    xApiKey?
) => {
	const session = await SessionManager.getSession(sessionId);
	const accessToken = session.accessToken;
	// console.log(`accessToken = ${accessToken}`);
	const headers = {};
	headers['Content-Type'] = 'application/json';
    if (xApiKey) {
        headers['x-api-key'] = xApiKey;
    }
	if (authorizeUser) {
		headers['Authorization'] = `Bearer ${accessToken}`;
	}

	const res = await fetch(url, {
		method: 'GET',
		headers
	});
	const response = await res.json();
	if (response.Status === 'failure') {
		if (response.HttpCode === 404) {
			console.log(chalk.red(`get_ response message: 404 - ${response.Message}`));
			return null;
		} else if (response.HttpCode !== 200) {
			console.log(chalk.red(`get_ response message: ${response.Message}`));
			throw error(response.HttpCode, response.Message);
		}
	}
	console.log(chalk.green(`get_ response message: ${response.Message}`));
	return response;
};

export const post_ = async (
	sessionId: string,
	url: string,
	bodyObj: unknown,
	authorizeUser = false,
    xApiKey?
) => {
	const session = await SessionManager.getSession(sessionId);
	const accessToken = session.accessToken;
	const headers = {};
	headers['Content-Type'] = 'application/json';
    if (xApiKey) {
        headers['x-api-key'] = xApiKey;
    }
	if (authorizeUser) {
		headers['Authorization'] = `Bearer ${accessToken}`;
	}

	const body = JSON.stringify(bodyObj);
	console.log(body);
	const res = await fetch(url, {
		method: 'POST',
		body,
		headers
	});

	const response = await res.json();
	if (response.Status === 'failure' || (response.HttpCode !== 201 && response.HttpCode !== 200)) {
		console.log(chalk.red(`post_ response message: ${response.Message}`));
		throw error(response.HttpCode, response.Message);
	}
	console.log(chalk.green(`post_ response message: ${response.Message}`));
	return response;
};

export const put_ = async (
	sessionId: string,
	url: string,
	bodyObj: unknown,
	authorizeUser = false,
    xApiKey?
) => {
	const session = await SessionManager.getSession(sessionId);
	const accessToken = session.accessToken;
	const headers = {};
	headers['Content-Type'] = 'application/json';
    if (xApiKey) {
        headers['x-api-key'] = xApiKey;
    }
	if (authorizeUser) {
		headers['Authorization'] = `Bearer ${accessToken}`;
	}
	const body = JSON.stringify(bodyObj);
	const res = await fetch(url, {
		method: 'PUT',
		body,
		headers
	});
	const response = await res.json();
	if (response.Status === 'failure' || (response.HttpCode !== 200 && response.HttpCode !== 201)) {
		console.log(chalk.red(`put_ response message: ${response.Message}`));
		throw error(response.HttpCode, response.Message);
	}
	console.log(chalk.green(`put_ response message: ${response.Message}`));
	return response;
};

export const delete_ = async (
	sessionId: string,
	url: string,
	authorizeUser = false,
    xApiKey?
) => {
	const session = await SessionManager.getSession(sessionId);
	const accessToken = session.accessToken;
	const headers = {};
	headers['Content-Type'] = 'application/json';
    if (xApiKey) {
        headers['x-api-key'] = xApiKey;
    }
	if (authorizeUser) {
		headers['Authorization'] = `Bearer ${accessToken}`;
	}
	const res = await fetch(url, {
		method: 'DELETE',
		headers
	});

	const response = await res.json();
	console.log(response.Message);
	if (response.Status === 'failure' || response.HttpCode !== 200) {
		console.log(chalk.red(`delete_ response message: ${response.Message}`));
		throw error(response.HttpCode, response.Message);
	}
	console.log(chalk.green(`delete_ response message: ${response.Message}`));
	return response;
};

export const delete__ = async (
	url: string,
	authorizeUser: boolean = false,
	sessionId?: string
) => {
	try {
		const headers = await setHeaders(authorizeUser, sessionId);

		const res = await fetch(url, {
			method: 'DELETE',
			headers
		});

		const response = await res.json();
		const message = response.Message;
		
		if (!res.ok) {
			if (res.status === 500) {
				throw error(500, { message: res.statusText });
			} else {
				console.log(chalk.red(`delete_ response message: ${message}`));
				return response;
			}
		}
		console.log(chalk.green(`delete_ response message: ${message}`));
		return response;
	} catch (err) {
		console.log(chalk.red(`delete_ exception: ${err}`));
		throw error(500, { message: 'Internal Server Error' });
	}
};

const setHeaders = async (authorizeUser: boolean, sessionId?: string) => {
	try {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
			'x-api-key' : API_CLIENT_INTERNAL_KEY
		};

		if (authorizeUser && sessionId) {
			const session = await SessionManager.getSession(sessionId);
			const accessToken = session?.accessToken;
			headers['Authorization'] = `Bearer ${accessToken}`;
		}

		return headers;
	} catch (err) {
		console.log(chalk.red(`Error in setHeaders: ${(err as Error).message}`));
		throw new Error(`Failed to set headers: ${(err as Error).message}`);
	}
};
