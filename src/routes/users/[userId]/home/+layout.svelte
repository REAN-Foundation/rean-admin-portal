<script lang="ts">
    import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import DashboardTabs from '$lib/components/navbar/dashboard.tabs.svelte';
    import { getSystemName } from '$lib/themes/theme.selector';
    import type { PageServerData, LayoutServerData } from './$types';
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    export let data:PageServerData;
    const systemName = getSystemName();
  
	$:title = systemName + ($page.data.title ?  `- ${$page.data.title}` : "");
    const tenantCode = data.sessionUser?.tenantCode || data.sessionUser?.tenantName;
    async function handleDownloadReportClick(event) {
        console.log('Handling download report click',event);
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

    async function handleDownloadAnalyticsReportInJSONClick(event) {
        console.log('Handling download analytics report in JSON click',event);
        try {
            const response = await fetch(`/api/server/analytics/get-analytics-report-json`, {
			method: 'GET',
			headers: { 'Content-type': 'application/json' }
		});
        if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            const blob = new Blob([arrayBuffer], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Analytics_Report_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            invalidateAll();
        }
        invalidateAll();
        } catch (error) {
            invalidateAll();
        }
    }
    
    async function handleDownloadAnalyticsReportInExcelClick(event) {
        console.log('Handling download analytics report in excel click',event);
        try {
            const response = await fetch(`/api/server/analytics/get-analytics-report-excel`, {
			method: 'GET',
			headers: { 'Content-type': 'application/json' }
		});
        if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            const blob = new Blob([arrayBuffer], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Analytics_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(a);
            a.click();
            invalidateAll();
        }
        invalidateAll();
        } catch (error) {
            invalidateAll();
        }
    }

    async function handleDownloadAnalyticsReportInPdfClick(event) {
        console.log('Handling download analytics report in pdf click',event);
        try {
            const response = await fetch(`/api/server/analytics/get-analytics-report-pdf`, {
			method: 'GET',
			headers: { 'Content-type': 'application/json' }
		});
        if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            const blob = new Blob([arrayBuffer], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Analytics_Report_${new Date().toISOString().split('T')[0]}.pdf`;
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
<svelte:head>
    <title>{title}</title>
    <meta
        name="description"
        content=""
    />
</svelte:head>

<!-- <DashboardTabs on:downloadReport={handleDownloadReportClick} {userId} /> -->
<DashboardTabs 
on:downloadAnalyticsJSONReport={handleDownloadAnalyticsReportInJSONClick}
on:downloadAnalyticsExcelReport={handleDownloadAnalyticsReportInExcelClick}
on:downloadAnalyticsPdfReport={handleDownloadAnalyticsReportInPdfClick}
{userId} 
{tenantCode}/>
<slot />
