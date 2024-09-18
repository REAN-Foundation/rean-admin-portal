<script lang="ts">
    import { page } from '$app/stores';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    function handleDownloadReportClick() {
        console.log('Created custom event: downloadReport');
        dispatch('downloadReport', {});
    }
    export let userId = undefined;
    let homeLink = `/users/${userId}/home`;
    let usersLink = `/users/${userId}/home/users-stats`;
    let basicStatsLink = `/users/${userId}/home/basic-stats`;
    let demographicsLink = `/users/${userId}/home/patient-demo`;
    let genericLink = `/users/${userId}/home/generic-stats`;
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
    <a
        class="btn
        {$page.url.pathname === basicStatsLink ? 'variant-filled-secondary' : 'variant-soft-secondary'} "
        href={basicStatsLink}
    >
        Basic statistics
    </a>
    <a
        class="btn
        {$page.url.pathname === demographicsLink ? 'variant-filled-secondary' : 'variant-soft-secondary'} "
        href={demographicsLink}
    >
        Patient Demographics
    </a>
    <a
        class="btn
        {$page.url.pathname === genericLink ? 'variant-filled-secondary' : 'variant-soft-secondary'} "
        href={genericLink}
    >
        Generic Engagement
    </a>
</div>
