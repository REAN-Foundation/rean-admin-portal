<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import Choice from '../../create/choice.svelte';
	import type { PageServerData } from './$types';
    import { enhance } from '$app/forms';
    import InputChip from '$lib/components/input-chips.svelte';

	//////////////////////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	let nodeType = data.assessmentNode.NodeType;
	let title = data.assessmentNode.Title;
	let description = data.assessmentNode.Description;
	let queryType = data.assessmentNode.QueryResponseType;
	let options = data.assessmentNode.Options ?? [];
	let optionValueStore = options;
	let message = data.assessmentNode.Message ?? null;
	let sequence = data.assessmentNode.Sequence;
	let serveListNodeChildrenAtOnce = data.assessmentNode.ServeListNodeChildrenAtOnce ?? false;
	let tags = data.assessmentNode.Tags;

	//Original data
	let _nodeType = nodeType;
	let _title = title;
	let _description = description;
	let _queryType = queryType;
	let _sequence = sequence;
	let _message = message;
	let _tags = JSON.stringify(tags);


	function handleReset() {
		nodeType = _nodeType;
		title = _title;
		description = _description;
		queryType = _queryType;
		sequence = _sequence;
		message = _message;
		tags = JSON.parse(_tags);

	}

	const userId = $page.params.userId;
	const templateId = $page.params.templateId;
	const nodeId = $page.params.nodeId;
	const assessmentsRoutes = `/users/${userId}/assessment-templates`;
	const editRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/edit`;
	const viewRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/view`;
	const assessmentNodeRoutes = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes`;
	const assessmentTemplateView = `/users/${userId}/assessment-templates/${templateId}/view`;

	const breadCrumbs = [
		{ name: 'Assessments', path: assessmentsRoutes },
		{ name: 'Assessment-View', path: assessmentTemplateView },
		{ name: 'Assessment-Nodes', path: assessmentNodeRoutes },
		{ name: 'Edit', path: editRoute }
	];
	let selectedNodeType = nodeType;
	let selectedQueryType = queryType;

	const onSelectQueryResponseType = (val) => (selectedQueryType = val.target.value);
	function handleSubmit() {
	  isSubmitting = true;
    } 
	$:isSubmitting = false ;

	$:if(form){
		isSubmitting = false;	
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/updateAssessmentNodeAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
	on:submit|preventDefault={handleSubmit}
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Assessment Node</th>
				<th class="text-end">
					<a href={viewRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Node Type *</td>
				<td>
				<input
						type="text"
						disabled
						bind:value={nodeType}
						class="input"
					/>
					<input
						type="hidden"
						name="nodeType"
						bind:value={nodeType}
						class="input"
					/>
				</td>

				<!-- <td>
					<select
						name="nodeType"
						bind:value={nodeType}
						placeholder="Select node type here..."
						class="select select-info"
						on:change={(val) => onSelectNodeType(val)}
					>
						<option selected>{nodeType}</option>
						<option>Question</option>
						<option>Message</option>
						<option>Node List</option>
					</select>
				</td> -->
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Title *</td>
				<td>
					<input
						type="text"
						name="title"
						required
						bind:value={title}
						placeholder="Enter title here..."
						class="input w-full
						{form?.errors?.title ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.title}
						<p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Description</td>
				<td>
					<textarea
						name="description"
						bind:value={description}
						placeholder="Enter description here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Sequence</td>
				<td>
					<input
						type="number"
						name="sequence"
						placeholder="Enter sequence here..."
						class="input"
						step="1" 
						min="1"
						bind:value={sequence}
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td class="align-top">Tags</td>
                <td>
                    <InputChip
                        chips="variant-filled-error rounded-2xl"
                        name="tags"
                        bind:value={tags}
                    />
                </td>
            </tr>
			{#if selectedNodeType === 'Question'}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td class="align-top">Query Response Type *</td>
					<td>
						<select
							id="mySelect"
							name="queryType"
							disabled
							class="select select-info w-full"
							placeholder="Select query type here..."
							bind:value={queryType}
							on:change={(val) => onSelectQueryResponseType(val)}
						>
							<option selected value={queryType}>{queryType}</option>
							<!-- {#each queryResponseTypes as responseType}
								<option disabled value={responseType}>{responseType}</option>
							{/each} -->
						</select>
					</td>
				</tr>
				{#if selectedQueryType === 'Single Choice Selection' || selectedQueryType === 'Multi Choice Selection'}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td class="align-top">Options</td>
						<td><Choice {optionValueStore} readonly={false}/></td>
					</tr>
				{/if}
			{:else if selectedNodeType === 'Message'}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Message *</td>
					<td>
						<textarea
							name="message"
							required
							placeholder="Enter message here..."
							bind:value={message}
							class="textarea w-full
						{form?.errors?.message ? 'border-error-300 text-error-500' : ''}"
						/>
					</td>
				</tr>
			{:else}
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Serve List Node Children At Once</td>
				<td>
					<input
						type="checkbox"
						name="serveListNodeChildrenAtOnce"
						bind:value={serveListNodeChildrenAtOnce}
						bind:checked={serveListNodeChildrenAtOnce}
						class="checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md ml-2"
					/>
				</td>
			</tr>
			{/if}
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary" disabled={isSubmitting}>
			{isSubmitting ? 'Submitting...' : 'Submit'}
		</button>
	</div>
</form>
