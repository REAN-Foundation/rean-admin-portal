import type { PageServerLoad } from "../../$types";
import { ServerLoadEvent, error } from '@sveltejs/kit';

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
    const tenantData = event.locals.sessionUser
    if (!tenantData) {
      throw error(403, 'Not found');
    }
    // const userRoles = await getUserRoleList(userRole);
    console.log("sessionUser..data..",tenantData)
    console.log("sessionUser..data..",tenantData.tenantName)
    if(tenantData.tenantName.includes('GGHN'))
    {
        const res =await event.fetch(`/api/server/gghn/appointment-report`)
        const data = await res.json()
        if (data.Status === 'Failure') {
            throw error(404, 'Appointment report status not found')
        }
        console.log(data)
    return {
        AppointmentReport:{data:data,
            tenant:'GGHN'}
        }
    };
    if(tenantData.tenantName.includes('GMU'))
    {
        const res =await event.fetch(`/api/server/gmu/appointment-report`)
        const data = await res.json()
        if (data.Status === 'Failure') {
            throw error(404, 'Appointment report status not found')
        }
        console.log(data)
        return {
            AppointmentReport:{data:data,
                tenant:'GMU'}
            }
    };
}
    


