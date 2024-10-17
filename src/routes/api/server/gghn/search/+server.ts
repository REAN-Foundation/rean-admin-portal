import type { RequestEvent } from '@sveltejs/kit';

import { searchReply } from '$routes/api/services/gghn/searchreply';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const clientname = searchParams.get('clientname') ?? undefined;
	const date = searchParams.get('date') ?? undefined;
	const reply = searchParams.get('reply') ?? undefined;
	

	try {
		const searchParams = {
			clientname: clientname,
			date: date,
			reply:  reply			
		};
		console.log("para",searchParams)
		const response = await searchReply(sessionId, searchParams);
		console.log("response replied",response)
		return new Response(JSON.stringify(response));

	} catch (err) {
		console.error(`Error retriving priorities: ${err.message}`);
		return new Response(err.message);
	}
};