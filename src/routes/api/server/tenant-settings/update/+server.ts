import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from "$lib/utils/message.utils";
import { updateTenantSettings } from '../../../services/tenant-settings';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const PUT = async (event: RequestEvent) => {
    const request = event.request;
    const data = await request.json();
    let response;
    try {
        response = await updateTenantSettings(
            data.sessionId,
            data.tenantId,
            data.updatedSettings
        );
    }
    catch (error) {
        throw redirect(errorMessage('Error creating tenant settings.'), event);
    }
    throw redirect(successMessage(response.Message), event);
};
