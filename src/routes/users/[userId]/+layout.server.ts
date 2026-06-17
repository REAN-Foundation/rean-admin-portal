import type { LayoutServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { SessionManager } from '../../api/sessions/session.manager';
import { getTenantSettings } from '../../api/services/reancare/tenant-settings';
import { getUserById } from '$routes/api/services/reancare/user';

////////////////////////////////////////////////////////////////

export const load: LayoutServerLoad = async (event) => {
	const sessionId = event.cookies.get('sessionId');
	const session = await SessionManager.getSession(sessionId);

	if (!session) {
		throw redirect(307, '/');
	}
	console.log(`session received`);

    const tenantSettings = await getTenantSettings(sessionId, session.tenantId);

    // On-prem reancare's tenant-settings schema omits Common.AddOns (a newer portal
    // feature). Default it so the sidebar menu builder's tenantSettings.Common.AddOns.*
    // checks don't throw (the related add-on menus simply stay hidden).
    const _ts = tenantSettings?.Data?.TenantSettings;
    if (_ts?.Common && !_ts.Common.AddOns) {
        _ts.Common.AddOns = {};
    }

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
        roleName  : session.roleName,
        profileImageUrl  : session.profileImageUrl
    };

    const response = await getUserById(sessionId, session.userId);

	if (response.Status === 'failure' || response.HttpCode !== 200) {
		throw error(response.HttpCode, response.Message);
	}
	const user = response.Data.user;
	return {
        sessionUser,
        tenantSettings: tenantSettings.Data.TenantSettings,
        user,
        title: '',
        isSubmitting:false,
    };
};
