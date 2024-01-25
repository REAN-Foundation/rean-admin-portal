import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from "$lib/utils/message.utils";
import { createTenantSettings, updateTenantSettings } from '../../../services/tenant-settings';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const PUT = async (event: RequestEvent) => {
    const request = event.request;
    // const searchParams: URLSearchParams = event.url.searchParams;
    // const userId = searchParams.get('userId') ?? undefined;
    const data = await request.json();
    // console.log('@@',event.params)
    // console.log('@@',request.url)
    // // console.log('USER ID ',userId);
    // console.log('TENANT ID',data.tenantId)
    let response;
	try{
		response = await updateTenantSettings(
            data.sessionId,
            data.tenantSettingId,
            data.settings
        );
	}catch(error){
		// throw redirect(303,
        //     `/users/${userId}/tenants/${data.tenantId}/view`,
		// 	errorMessage('Error creating tenant settings.'), 
		// 	event
		// 	);
        	throw redirect(
			errorMessage('Error creating tenant settings.'), 
			event
			);
	}
	// throw redirect(303,
    //     `/users/${userId}/tenants/${data.tenantId}/view`,
	// 	successMessage(response.Message),
	// 	event
	// 	);	

        throw redirect(
            successMessage(response.Message),
            event
            );	
};
