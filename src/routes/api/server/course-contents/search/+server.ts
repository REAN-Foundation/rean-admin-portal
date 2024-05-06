import type { RequestEvent } from '@sveltejs/kit';
import { searchCourseContents } from '../../../services/course.contents';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const title = searchParams.get('title') ?? undefined;
    const courseId = searchParams.get('courseId') ?? undefined;
    const moduleId = searchParams.get('moduleId') ?? undefined;
    const durationInMins = searchParams.get('durationInMins') ?? undefined;
	const description = searchParams.get('description') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('itemsPerPage');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			title,
            moduleId,
            courseId,
            durationInMins,
            Description: description,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage,
			pageIndex
		};
		console.log('Search parms: ', searchParams);
		const response = await searchCourseContents(sessionId, searchParams);
		const courseContent = response.Data.CourseContents.Items;
		console.log('data==/////', courseContent);

		return new Response(JSON.stringify(courseContent));
	} catch (err) {
		console.error(`Error retriving course contents: ${err.message}`);
		return new Response(err.message);
	}
};
