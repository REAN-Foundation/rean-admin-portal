import type { RequestEvent } from '@sveltejs/kit';
// import { page } from '$app/stores';
import { searchSymptoms } from '../../../services/reancare/symptoms';
// import { BACKEND_API_URL } from '$env/static/private';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const symptom = searchParams.get('symptom') ?? undefined;
	const tags = searchParams.get('tags') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('itemsPerPage');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			symptom,
			tag: tags,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage,
			pageIndex
		};
		console.log('Search parms: ', searchParams);
		const response = await searchSymptoms(sessionId, searchParams);
		const symptoms = response.Data.SymptomTypes;

    // for (const symptom of symptoms.Items) {
    // 	if (symptom.ImageResourceId) {
    // 		symptom['ImageUrl'] =
    // 			BACKEND_API_URL +
    // 			`/file-resources/${symptom.ImageResourceId}/download?disposition=inline`;
    // 	} else {
    // 		symptom['ImageUrl'] = null;
    // 	}
    // }

		return new Response(JSON.stringify(symptoms));
	} catch (err) {
		console.error(`Error retriving symptom: ${err.message}`);
		return new Response(err.message);
	}
};
