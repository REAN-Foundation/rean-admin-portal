<script lang="ts">
	// import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';
	import CourseView from '$lib/components/courses.view/courses.view.svelte';
	import { showMessage } from '$lib/utils/message.utils';
	import { browser } from '$app/environment';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let courses = data.courses.Items;
	let toatalCourseCount = data.courses.TotalCount;

	courses = courses.map((item, index) => ({ ...item, index: index + 1 }));
	console.log('courses', courses);

	const userId = $page.params.userId;
	const courseRoute = `/users/${userId}/courses`;
	const editRoute = (id) => `/users/${userId}/courses/${id}/edit`;
	const createRoute = `/users/${userId}/courses/create`;

	const breadCrumbs = [
		{
			name: 'Courses',
			path: courseRoute
		}
	];

	let name = undefined;
	let durationInDays = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	// const searchParams = async (name: string, durationInDays: string) => {
	// 	await searchCourse({
	// 		name: name,
	// 		durationInDays: durationInDays
	// 	});
	// };
	$: if (browser)
	searchCourse({
		name: name,
		durationInDays: durationInDays,
		itemsPerPage: itemsPerPage,
		pageIndex: pageIndex,
		sortOrder: sortOrder,
		sortBy: sortBy
		});

	async function searchCourse({name, durationInDays, itemsPerPage, pageIndex, sortOrder, sortBy}) {
		let url = `/api/server/courses/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (pageIndex) url += `&pageIndex=${pageIndex}`;
		if (name) url += `&name=${name}`;
		if (durationInDays) url += `&durationInDays=${durationInDays}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();

		courses = response.map((item, index) => ({ ...item, index: index + 1 }));

	}

	const handleCourseDelete = async (id, modules) => {
		const courseId = id;
		console.log('courseId', courseId);
		for (const module of modules) {
			await DeleteModule({
				sessionId: data.sessionId,
				moduleId: module.id
			});
		}
		await DeleteCourse({
			sessionId: data.sessionId,
			courseId: courseId
		});
		showMessage(`Course deteted successfully!`, 'success');
		window.location.href = courseRoute;
	};

	async function DeleteCourse(model) {
		const response = await fetch(`/api/server/courses`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
		console.log('response', response);
	}

	const handleModuleDelete = async (id, contents) => {
		const moduleId = id;
		console.log('moduleId', moduleId);
		for (const content of contents) {
			await DeleteContent({
				sessionId: data.sessionId,
				courseContentId: content.id
			});
		}
		await DeleteModule({
			sessionId: data.sessionId,
			moduleId: moduleId
		});
		window.location.href = courseRoute;
	};

	async function DeleteModule(model) {
		const response = await fetch(`/api/server/modules`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}

	const handleContentDelete = async (id) => {
		const contentId = id;
		console.log('contentId', contentId);
		await DeleteContent({
			sessionId: data.sessionId,
			courseContentId: contentId
		});
		window.location.href = courseRoute;
	};

	async function DeleteContent(model) {
		const response = await fetch(`/api/server/course-contents`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<a href={createRoute} class="btn variant-filled-secondary ml-auto">Add New</a>
</div>

<CourseView
	{courses}
	{userId}
	itemsPerPage= {itemsPerPage}
	toatalCourseCount= {toatalCourseCount}
	on:searchCourse={async () => await searchCourse({name, durationInDays, itemsPerPage, pageIndex, sortOrder, sortBy })}
	on:onContentDeleteClick={async (e) => await handleContentDelete(e.detail.contentId)}
	on:onModuleDeleteClick={async (e) =>
		await handleModuleDelete(e.detail.moduleId, e.detail.contents)}
	on:onCourseDeleteClick={async (e) =>
		await handleCourseDelete(e.detail.courseId, e.detail.modules)}
/>
