<script lang="ts">
    import FunnelCard from '$lib/components/dashboard/funnel.card.svelte';
    import NumberCard from '$lib/components/dashboard/number.card.svelte';
    import PlatformStatsCard from '$lib/components/dashboard/platform.stats.card.svelte';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    export let data;
    let funnelChartData;
  
    let labels = [
        'Onboarded',
        'Not-Deleted ',
        'Users With Active Session',
    ];

    $: funnelChartData = [
        data.userCountStats.TotalUsers.Count,
        data.userCountStats.NotDeletedUsers.Count,
        data.userCountStats.UsersWithActiveSession.Count,
    ];

    $: deviceDetails = data.deviceDetailsByYears;
</script>

<dl class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
    <NumberCard cardTitle="Onboarded Users" cardContent={data.userCountStats.TotalUsers.Count.toFixed()} />
    <NumberCard cardTitle="Not Deleted Users" cardContent={data.userCountStats.NotDeletedUsers.Count.toFixed()} additional={data.userCountStats.NotDeletedUsers.Ratio} prefix="%" />
    <NumberCard cardTitle="Current Active Users" cardContent={data.userCountStats.UsersWithActiveSession.Count.toFixed()} additional={data.userCountStats.UsersWithActiveSession.Ratio} prefix="%" />
    <NumberCard cardTitle="Deleted Users" cardContent={data.userCountStats.DeletedUsers.Count.toFixed()} additional={data.userCountStats.DeletedUsers.Ratio} prefix="%" />
    <NumberCard cardTitle="Enrolled Users" cardContent={data.userCountStats.EnrolledUsers.Count.toFixed()} additional={data.userCountStats.EnrolledUsers.Ratio} prefix="%" />
    <!-- {#each data.DeviceDetailWiseUsers as d }
        <NumberCard cardTitle={d.OSType} cardContent={d.count.toFixed()} />
    {/each} -->
</dl>

<div class="flex h-80 gap-10 w-full mt-5">
    <FunnelCard {labels} dataSource={funnelChartData} />
    <PlatformStatsCard {deviceDetails} />
</div>
