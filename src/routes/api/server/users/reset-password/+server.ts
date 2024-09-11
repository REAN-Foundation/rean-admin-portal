import { resetPassword } from '$routes/api/services/reancare/user';
import type { RequestEvent } from '@sveltejs/kit';
import { getPersonRolesForEmail } from '../../../services/reancare/persons';
import type { PersonRole } from '$lib/types/domain.models';

//////////////////////////////////////////////////////////////

export const POST = async (event: RequestEvent) => {
    const request = event.request;
    let availableRoles: PersonRole = [];
	let filteredRoles: PersonRole = [];
    let loginRoleId = null;
	const data = await request.json();
	try {
		console.log('Inside the reset password...');
		const email = data.email;
        const resetCode = data.resetCode;
        const newPassword = data.newPassword;

        const res_ = await getPersonRolesForEmail(email);
        availableRoles = res_.Data?.Roles ?? [];

        if (availableRoles.length > 0) {
            filteredRoles = availableRoles.filter((x) => x.RoleName !== 'Doctor' && x.RoleName !== 'Patient');
            if (filteredRoles.length > 0) {
                loginRoleId = filteredRoles[0].id;
            }
        }
        if (filteredRoles.length > 1) {
            return new Response(JSON.stringify({
                Status:'failure',
                HttpStatusCode:409,
                Message:'Multiple administrative roles associated with email.'
            }))
        }
        if (filteredRoles.length == 0) {
            return new Response(JSON.stringify({
                Status:'failure',
                HttpStatusCode:409,
                Message:'Found no administrative roles associated with email.'
            }));
        }
        const response = await resetPassword(email, resetCode, newPassword, loginRoleId);
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
