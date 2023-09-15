import type { RequestEvent } from '@sveltejs/kit';
import { updateQuery } from '$routes/api/services/custom.query';

//////////////////////////////////////////////////////////////

export const POST = async (event: RequestEvent) => {
	const request = event.request;
  const sessionId = event.locals.sessionUser.sessionId;
	const data = await request.json();
	try {
		const response = await updateQuery(
			sessionId,
			data.queryId,
			data.name,
			data.description,
			data.format,
			data.query,
			data.tags
		);
		const query = response.Data.Query;
		return new Response(JSON.stringify(query));
	} catch (err) {
		console.error(`Error executing query: ${err.message}`);
		return new Response(err.message);
	}
};
