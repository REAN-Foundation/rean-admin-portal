import type { RequestEvent } from '@sveltejs/kit';
import { searchPriorities } from '$routes/api/services/reancare/priorities';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const type = searchParams.get('type') ?? undefined;
	const tags = searchParams.get('tags') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('itemsPerPage');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			type,
			tags: tags,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage,
			pageIndex
		};
		const response = await searchPriorities(sessionId, searchParams);
		const items = response.Data.PriorityTypes;
		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving priorities: ${err.message}`);
		return new Response(err.message);
	}
};
