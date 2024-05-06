<script lang="ts">
	import { dashboardMenu, type TabDefinition } from '../../components/navbar/navigation.tabs';
	import { page } from '$app/stores';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function handleDownloadReportClick() {
        console.log('Created custom event: downloadReport');
        dispatch('downloadReport',{});
    }
	export let userId = undefined;
	const dashboardTabs: TabDefinition[] = dashboardMenu(userId);

	let homeLink = `/users/${userId}/home`;
	let usersLink = `/users/${userId}/home/users-stats`;
	// let rhgLink;
	// let botLink;
</script>

<div class="flex gap-4">
	<a
		class="btn
		{$page.url.pathname === homeLink ? 'variant-filled-secondary' : 'variant-soft-secondary'} "
		href={homeLink}
	>
		Overall
	</a>

	<a
		class="btn
		{$page.url.pathname === usersLink ? 'variant-filled-secondary' : 'variant-soft-secondary'} "
		href={usersLink}
	>
		Distribution
	</a>

    <button class ="btn variant-filled-secondary" on:click={handleDownloadReportClick}>
        Download Report
    </button>
</div>
