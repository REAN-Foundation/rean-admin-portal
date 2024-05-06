<script lang="ts">
    import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import DashboardTabs from '$lib/components/navbar/dashboard.tabs.svelte';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async function handleDownloadReportClick(event) {
        console.log('Handling download report click');
        try {
            const response = await fetch(`/api/server/users-stats/get-user-stats-report`, {
			method: 'GET',
			headers: { 'Content-type': 'application/json' }
		});
        if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Summary_Report.pdf';
            document.body.appendChild(a);
            a.click();
            invalidateAll();
        }
        invalidateAll();
        } catch (error) {
            invalidateAll();
        }
    }
    
	const userId = $page.params.userId;
</script>

<DashboardTabs on:downloadReport={handleDownloadReportClick} {userId} />
<slot />
