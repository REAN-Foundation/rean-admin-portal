import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getHospitalById, updateHospital } from '../../../../../api/services/reancare/hospitals';
import { searchHealthSystems } from '../../../../../api/services/reancare/health.systems';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
    const hospitalId = event.params.id;
    const response = await getHospitalById(sessionId, hospitalId);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message);
    }
    const hospital = response.Data.Hospital;
    const id = response.Data.Hospital.id;
    const healthSystems_ = await searchHealthSystems(sessionId, {
        itemsPerPage: 200
    });
    const healthSystems = healthSystems_.Data.HealthSystems.Items;
    return {
        location: `${id}/edit`,
        hospital,
        healthSystems,
        message: response.Message,
        title: 'Hospital Systems-Hospitals Edit'
    };
};

const updateHospitalSchema = zfd.formData({
    hospitalName: z.string().max(128),
    healthSystemId: z.string().optional(),
    tags: z.array(z.string()).optional()
});

export const actions = {
    updateHospitalAction: async (event: RequestEvent) => {
        const request = event.request;
        const userId = event.params.userId;
        const hospitalId = event.params.id;
        const sessionId = event.cookies.get('sessionId');
        const data = await request.formData();
        const formData = Object.fromEntries(data);
        const tags = data.has('tags') ? data.getAll('tags') : [];
        const formDataValue = { ...formData, tags: tags };

        console.log('formData', JSON.stringify(formDataValue, null, 2));

        type HospitalSchema = z.infer<typeof updateHospitalSchema>;

        let result: HospitalSchema = {};
        try {
            result = updateHospitalSchema.parse(formDataValue);
            console.log('result', result);
        } catch (err) {
            const { fieldErrors: errors } = err.flatten();
            console.log(errors);
            const { ...rest } = formData;
            return {
                data: rest,
                errors
            };
        }

        let response;
        try {
            response = await updateHospital(
                sessionId,
                hospitalId,
                result.hospitalName,
                result.healthSystemId,
                result.tags
            );
        } catch (error: any) {
            const errorMessageText = error?.body?.message || 'An error occurred';
            throw redirect(303, `/users/${userId}/hospitals`, errorMessage(response.Message), event);
        }
        const id = response.Data.Hospital.id;
        throw redirect(
            303,
            `/users/${userId}/hospitals/${id}/view`,
            successMessage(`Hospital updated successfully!`),
            event
        );
    }
};
