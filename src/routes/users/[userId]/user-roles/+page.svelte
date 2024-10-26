<script lang="ts">
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Confirm from '$lib/components/modal/confirmModal.svelte';
    import { Helper } from '$lib/utils/helper';
    import Icon from '@iconify/svelte';
    import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
    import date from 'date-and-time';
    import type { PageServerData } from './$types';
    import { invalidate } from '$app/navigation';
    import { browser } from '$app/environment';
    import { SYSTEM_ID } from '$lib/constants';
    import Tooltip from '$lib/components/tooltip.svelte';

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    export let data: PageServerData;
    $: isLoading = false;
    $: userRoles = data.userRoles.Items;
    let retrivedUserRoles;
    const userId = $page.params.userId;
    const createRoute = `/users/${userId}/user-roles/create`;
    const editRoute = (id) => `/users/${userId}/user-roles/${id}/edit`;
    const viewRoute = (id) => `/users/${userId}/user-roles/${id}/view`;
    const userRoleRoute = `/users/${userId}/user-roles`;

    const breadCrumbs = [{ name: 'User Roles', path: userRoleRoute }];

    let roleName = undefined;
    let tags = undefined;
    let sortBy = undefined;
    let sortOrder = 'ascending';
    let itemsPerPage = 10;
    let offset = 0;
    $: totalUserRolesCount = data.userRoles.TotalCount;
    let isSortingRoleName = false;
    let isSortingTags = false;
    let items = 10;

    let paginationSettings = {
        page: 0,
        limit: 10,
        size: totalUserRolesCount,
        amounts: [10, 20, 30, 50]
    } satisfies PaginationSettings;

    $: {
        if (roleName) {
            paginationSettings.page = 0;
        }
    }
    async function searchUserRoles(model) {
        console.log('model--------', model);
        let url = `/api/server/person-role-types/search?`;
        if (sortOrder) url += `sortOrder=${sortOrder}`;
        else url += `sortOrder=ascending`;

        if (sortBy) url += `&sortBy=${sortBy}`;
        if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
        if (offset) url += `&pageIndex=${offset}`;
        if (roleName) url += `&roleName=${roleName}`;

        const res = await fetch(url, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        });
        const searchResult = await res.json();
        totalUserRolesCount = searchResult.TotalCount;
        userRoles = searchResult.Items.map((item, index) => ({ ...item, index: index + 1 }));
        if (totalUserRolesCount > 0) {
            isLoading = false;
        }
    }

    $: {
        userRoles = userRoles.map((item, index) => ({ ...item, index: index + 1 }));
        paginationSettings.size = totalUserRolesCount;
        retrivedUserRoles = userRoles.slice(
            paginationSettings.page * paginationSettings.limit,
            paginationSettings.page * paginationSettings.limit + paginationSettings.limit
        );
        if (retrivedUserRoles.length > 0) {
            isLoading = false;
        }
    }
    $: if (browser)
        searchUserRoles({
            type: roleName,
            tags: tags,
            itemsPerPage: itemsPerPage,
            pageIndex: offset,
            sortOrder: sortOrder,
            sortBy: sortBy
        });

    function onPageChange(e: CustomEvent): void {
        isLoading = true;
        let pageIndex = e.detail;
        itemsPerPage = items * (pageIndex + 1);
    }

    function onAmountChange(e: CustomEvent): void {
        if (roleName || tags) {
            isLoading = true;
            userRoles = [];
        }
        itemsPerPage = e.detail * (paginationSettings.page + 1);
        items = itemsPerPage;
    }

    function sortTable(columnName) {
        isSortingRoleName = false;
        isSortingTags = false;
        sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
        if (columnName === 'RoleName') {
            isSortingRoleName = true;
        } else if (columnName === 'Tags') {
            isSortingTags = true;
        }
        sortBy = columnName;
    }

    const handleUserRoleDelete = async (id) => {
        const userRoleTypeId = id;
        console.log('userRoleId', userRoleTypeId);
        await Delete({
            sessionId: data.sessionId,
            personRoleTypeId: userRoleTypeId
        });
        invalidate('app:user-roles');
    };

    async function Delete(model) {
        await fetch(`/api/server/person-role-types`, {
            method: 'DELETE',
            body: JSON.stringify(model),
            headers: { 'content-type': 'application/json' }
        });
    }
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
    <div class="relative w-auto grow">
        <input
            type="text"
            name="roleName"
            placeholder="Search by role name"
            bind:value={roleName}
            class="input w-full"
        />
        {#if roleName}
            <button
                type="button"
                on:click={() => {
                    roleName = '';
                }}
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-0 cursor-pointer"
            >
                <Icon
                    icon="material-symbols:close"
                    class="text-lg"
                />
            </button>
        {/if}
    </div>
    {#if SYSTEM_ID !== 'AHA'}
        <a
            href={createRoute}
            class="btn variant-filled-secondary">Add New</a
        >
    {/if}
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
    <table
        class="table"
        role="grid"
    >
        <thead class="!variant-soft-secondary">
            <tr>
                <th data-sort="index">Id</th>
                <th>
                    <button on:click={() => sortTable('RoleName')}>
                        Name {isSortingRoleName ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
                    </button>
                </th>
                <th>Description</th>
                <th data-sort="isActive">Active</th>
                <th data-sort="CreatedAt">Created Date</th>
                <th />
                <th />
            </tr>
        </thead>
        <tbody class="!bg-white dark:!bg-inherit">
            {#if retrivedUserRoles.length <= 0}
                <tr>
                    <td colspan="6">{isLoading ? 'Loading...' : 'No records found'}</td>
                </tr>
            {:else}
                {#each retrivedUserRoles as row}
                    <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                        <td>{row.index}</td>
                        <td>
                            <a href={viewRoute(row.id)}>{Helper.truncateText(row.RoleName, 20)} </a>
                        </td>
                        <td>
                            <Tooltip text={row.Description || 'Not specified'}>
                                <span class="cursor-pointer">
                                    {row.Description !== null ? Helper.truncateText(row.Description, 40) : 'Not specified'}
                                </span>
                            </Tooltip>
                        </td>
                        <td>{row.isActive ? 'Yes' : 'No'}</td>
                        <td>{date.format(new Date(row.CreatedAt), 'DD-MMM-YYYY')}</td>
                        <td>
                            <a
                                href={editRoute(row.id)}
                                class="btn p-2 -my-1 hover:variant-soft-primary"
                            >
                                <Icon
                                    icon="material-symbols:edit-outline"
                                    class="text-lg"
                                />
                            </a>
                        </td>
                        <td>
                            <Confirm
                                confirmTitle="Delete"
                                cancelTitle="Cancel"
                                let:confirm={confirmThis}
                            >
                                <button
                                    on:click|preventDefault={() => confirmThis(handleUserRoleDelete, row.id)}
                                    class="btn p-2 -my-1 hover:variant-soft-error"
                                >
                                    <Icon
                                        icon="material-symbols:delete-outline-rounded"
                                        class="text-lg"
                                    />
                                </button>
                                <span slot="title"> Delete </span>
                                <span slot="description"> Are you sure you want to delete a user role? </span>
                            </Confirm>
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>

<div class="w-full variant-soft-secondary rounded-lg p-2">
    <Paginator
        bind:settings={paginationSettings}
        on:page={onPageChange}
        on:amount={onAmountChange}
        buttonClasses=" text-primary-500"
        regionControl="bg-surface-100 rounded-lg btn-group text-primary-500 border border-primary-200"
        controlVariant="rounded-full text-primary-500 "
        controlSeparator="fill-primary-400"
    />
</div>
