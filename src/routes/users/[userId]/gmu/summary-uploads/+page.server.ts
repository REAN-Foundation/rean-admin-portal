import type { PageServerLoad } from "../../$types";
import { error } from '@sveltejs/kit';

export const load:PageServerLoad = async ({fetch}) =>
{
    const res =await fetch(`/api/server/gmu/appointment-report`)
    const data = await res.json()

    if (data.Status === 'Failure') {
        throw error(404, 'Appointment report status not found')
    }
    console.log(data)
   return {
    AppointmentReport:data
   }
 }

