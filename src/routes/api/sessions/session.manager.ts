import type { Session } from './session';

export class SessionManager {

	static _sessions = [];

	static addSession = (sessionId: string, session: Session): Promise<Session | null> => {
		if (!session?.sessionId) {
			return null;
		}
		console.log(`Adding session: ${JSON.stringify(session)}`);
		const existingSession = SessionManager._sessions.find((x) => x.sessionId === sessionId);
		if (existingSession) {
			// Remove existing
			SessionManager._sessions = SessionManager._sessions.filter((x) => x.sessionId !== sessionId);
		}
		console.log(`Add new session: ${JSON.stringify(session, null, 2)}`);
		SessionManager._sessions.push(session);
		return Promise.resolve(session);
	};

	static getSession = (sessionId): Promise<Session | null> => {
		const session = SessionManager._sessions.find((x) => x.sessionId === sessionId);
		if (!session) return Promise.resolve(null);
		// console.log(`Retrieving existing session: ${JSON.stringify(session, null, 2)}`);
		return Promise.resolve(session);
	};

	static isValid = (sessionId): Promise<boolean> => {
		console.log(`Checking session validity!`);
		//console.log(`${JSON.stringify(SessionManager._sessions, null, 2)}`);
		const session = SessionManager._sessions.find((x) => x.sessionId === sessionId);
		if (!session) {
			return Promise.resolve(false);
		}
		//console.log(`Retrieving existing session: ${JSON.stringify(session, null, 2)}`);
		if (session.expiryDate < new Date()) {
			return Promise.resolve(false);
		}
		return Promise.resolve(true);
	};

	static removeSession = (sessionId): Promise<Session | null> => {
		const session = SessionManager._sessions.find((x) => x.sessionId === sessionId);
		if (!session) {
			return Promise.resolve(null);
		}
		SessionManager._sessions = SessionManager._sessions.filter((x) => x.sessionId !== sessionId);
		console.log(`Removing session: ${JSON.stringify(session, null, 2)}`);
		return Promise.resolve(session);
	};

	static constructSession = async (user, accessToken: string, expiryDate: Date, refreshToken?: string): Promise<Session> => {
		console.log(`Constructing session!`);
		console.log(`User: ${JSON.stringify(user, null, 2)}`);
		// console.log(`Token: ${token}`);
		// console.log(`Expiry date: ${expiryDate.toISOString()}`);

		if (!user || !accessToken || !expiryDate) {
			return null;
		}
		const session: Session = {
			sessionId      : user.SessionId,
			tenantId       : user.TenantId,
            tenantCode     : user.TenantCode,
			tenantName     : user.TenantName,
			accessToken    : accessToken,
			refreshToken   : refreshToken,
			userId         : user.id,
			email          : user.Person.Email,
			username       : user.UserName,
			profileImageUrl: user.Person.ProfileImageUrl ?? null,
			fullName       : user.Person.DisplayName ?? null,
			firstName      : user.Person.FirstName ?? null,
			roleId         : user.Role.id,
			roleName       : user.Role.RoleName,
			expiryDate     : expiryDate,
		};
        console.log(`Session: ${JSON.stringify(session, null, 2)}`);

		return Promise.resolve(session);
	};
}
