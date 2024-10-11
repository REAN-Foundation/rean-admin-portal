import { searchLabRecordTypes } from "$routes/api/services/reancare/lab-record-types";
import type { RequestEvent } from "@sveltejs/kit";

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {

    const sessionId = event.locals.sessionUser.sessionId;
    const searchParams: URLSearchParams = event.url.searchParams;
    const typeName = searchParams.get('typeName') ?? undefined
    const displayName = searchParams.get('displayName') ?? undefined
    const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
    const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
    const itemsPerPage_ = searchParams.get('itemsPerPage');
    const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
    const pageIndex_ = searchParams.get('pageIndex');
    const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
        const searchParams = {
            typeName,
            displayName,
            orderBy: sortBy,
            order: sortOrder,
            itemsPerPage,
            pageIndex,
        };
        console.log("Search parms: ", searchParams);
		const response = await searchLabRecordTypes(sessionId, searchParams);
        const labRecords = response.Data.LabRecords;
        console.log("labRecords", JSON.stringify(response, null, 2));
        return new Response(JSON.stringify(labRecords));
	} catch (err) {
		console.error(`Error retriving lab records: ${err.message}`);
		return new Response(err.message);
	}
};


