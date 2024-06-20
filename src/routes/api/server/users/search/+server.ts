import type { RequestEvent } from '@sveltejs/kit';
import { searchUsers } from '$routes/api/services/reancare/user';
//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const firstName = searchParams.get('firstName') ?? undefined;
	const email = searchParams.get('email') ?? undefined;
	const phone = searchParams.get('phone') ?? undefined;
    const roleIds = searchParams.get('roleIds') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('itemsPerPage');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			firstName,
			phone,
			email,
            roleIds,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage,
			pageIndex
		};
		const response = await searchUsers(sessionId, searchParams);
		const users = response.Data.Users;
		return new Response(JSON.stringify(users));
	} catch (err) {
		console.error(`Error retriving users: ${err.message}`);
		return new Response(err.message);
	}
};
