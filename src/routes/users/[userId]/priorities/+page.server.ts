import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchPriorities } from '../../../api/services/reancare/priorities';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const sessionId = event.cookies.get('sessionId');
    event.depends('app:priorities');
	const response = await searchPriorities(sessionId,{
        orderBy: 'Type',
        order : 'ascending'
    });
    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message);
    }
    const priorityTypes = response.Data.PriorityTypes;
    return {
        priorityTypes,
        sessionId,
        message: response.Message,
        title: 'Types-Priorities'
    };			

};
