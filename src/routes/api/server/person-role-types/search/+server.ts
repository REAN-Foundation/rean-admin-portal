import { searchLabRecordTypes } from "$routes/api/services/reancare/lab-record-types";
import { searchRoleTypes } from "$routes/api/services/reancare/person-role-types";
import type { RequestEvent } from "@sveltejs/kit";

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {

    const sessionId = event.locals.sessionUser.sessionId;
    const searchParams: URLSearchParams = event.url.searchParams;
    const roleName = searchParams.get('roleName') ?? undefined
    const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
    const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
    const itemsPerPage_ = searchParams.get('itemsPerPage');
    const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
    const pageIndex_ = searchParams.get('pageIndex');
    const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
        const searchParams = {
            roleName,
            orderBy: sortBy,
            order: sortOrder,
            itemsPerPage,
            pageIndex,
        };
        console.log("Search parms: ", searchParams);
		const response = await searchRoleTypes(sessionId, searchParams);
        const roles = response.Data.Roles;
        console.log("roles", JSON.stringify(response, null, 2));
        return new Response(JSON.stringify(roles));
	} catch (err) {
		console.error(`Error retriving roles: ${err.message}`);
		return new Response(err.message);
	}
};


