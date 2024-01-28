import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { SessionManager } from '../../api/sessions/session.manager';
import { getTenantSettings } from '../../api/services/tenant-settings';

////////////////////////////////////////////////////////////////

export const load: LayoutServerLoad = async (event) => {
	const sessionId = event.cookies.get('sessionId');
	const session = await SessionManager.getSession(sessionId);

	if (!session) {
		throw redirect(307, '/');
	}
	console.log(`session received`);

    const tenantSettings = await getTenantSettings(sessionId, session.tenantId);

	const sessionUser = {
        sessionId : session.sessionId,
        tenantId  : session.tenantId,
        tenantCode: session.tenantCode,
        tenantName: session.tenantName,
        userId    : session.userId,
        email     : session.email,
        username  : session.username,
        fullName  : session.fullName,
        firstName : session.firstName,
        roleId    : session.roleId,
        roleName  : session.roleName
    };
	return {
        sessionUser,
        tenantSettings,
    };
};
