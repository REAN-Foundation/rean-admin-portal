import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad, Action } from './$types';
import type { OrganizationTypes } from '$lib/types/domain.models';
import { getOrganizationById, updateOrganization } from '../../../../../api/services/organizations';
import { getOrganizationTypes } from '../../../../../api/services/types';
import { createAddress } from '../../../../../api/services/addresses';
/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const organizationId = event.params.id;
		const response = await getOrganizationById(sessionId, organizationId);
		const types: OrganizationTypes[] = await getOrganizationTypes();

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const organization = response.Data.Organization;
		return {
			organization,
			types
		};
	} catch (error) {
		console.error(`Error retriving organization: ${error.message}`);
	}
};

export const actions = {
	updateOrganizationAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();
		
		const type = data.has('type') ? data.get('type') : null;
		const addressType = data.has('addressType') ? data.get('addressType') : null;
		const addressLine = data.has('AddressLine') ? data.get('AddressLine') : null;
		const city = data.has('city') ? data.get('city') : null;
		const district = data.has('district') ? data.get('district') : null;
		const state = data.has('state') ? data.get('state') : null;
		const country = data.has('country') ? data.get('country') : null;
		const postalCode = data.has('postalCode') ? data.get('postalCode') : null;
		const name = data.has('name') ? data.get('name') : null;
		const contactNumber = data.has('contactNumber') ? data.get('contactNumber') : null;
		const email = data.has('email') ? data.get('email') : null;
		const about = data.has('about') ? data.get('about') : null;
		const operationalSince = data.has('operationalSince') ? data.get('operationalSince') : null;
		// const imageResource = data.has('imageResource') ? data.get('imageResource') : null;
		const isHealthFacility = data.has('isHealthFacility') ? data.get('isHealthFacility') : null;
		const sessionId = event.cookies.get('sessionId');
		const organizationId = event.params.id;

		const addressResponse = await createAddress(
			sessionId,
			addressType.valueOf() as string,
			addressLine.valueOf() as string,
			city.valueOf() as string,
			district.valueOf() as string,
			state.valueOf() as string,
			country.valueOf() as string,
			postalCode.valueOf() as number
		);
		const addressesId_ = addressResponse.Data.Address.id;
		const addressesId = addressesId_.split(',');

		if (addressResponse.Status === 'failure' || addressResponse.HttpCode !== 201) {
			throw redirect(303, '/organizations', errorMessage(addressResponse.Message), event);
		}

		const response = await updateOrganization(
			sessionId,
			organizationId,
			type.valueOf() as string,
			name.valueOf() as string,
			contactNumber.valueOf() as number,
			email.valueOf() as string,
			about.valueOf() as string,
			operationalSince.valueOf() as Date,
			addressesId,
			// imageResource.valueOf() as string,
			isHealthFacility.valueOf() as boolean
		);
		console.log('response', response);
		const id = response.Data.Organization.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/organizations', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/organizations/${id}/view`,
			successMessage(`organization updated successful!`),
			event
		);
	}
};
