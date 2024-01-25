import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchTenantSettings } from '../../../../../api/services/tenant-settings';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
    let tenantSettingId = undefined;
    let settings = undefined;
    console.log('SessionId',sessionId);
	try {
        console.log('Event-',event.params)
        const tenantId = event.params.id;
		const response = await searchTenantSettings(sessionId, {tenantId:tenantId});
        
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		
        if (response.Data.TenantRecords.TotalCount === 1) {
            const tenantSetting = response.Data.TenantRecords.Items[0];
            tenantSettingId = tenantSetting.id;
            settings = tenantSetting.Setting;
        }
        
        console.log('response=',response);
		return {
			// tenants,
			sessionId,
            tenantSettingId: tenantSettingId,
			settings: settings
		};
	} catch (error) {
		console.error(`Error retriving tenant settings: ${error.message}`);
	}
};
