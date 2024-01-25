<script lang='ts'>
    import PlatformBasedChart from '$lib/components/users-stats/charts/platform-based-chart.svelte';

    export let deviceDetails;

    const totalUsers = deviceDetails.TotalUsers;
    const androidUsers = deviceDetails.AndroidUsers;
    const iOSUsers = deviceDetails.iOSUsers;
    const years = deviceDetails.Years;

</script>

<div
    class="mt-5 flex overflow-x-auto rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:p-6 w-1/2 h-auto"
>
    <div class="pb-8 w-full">
        <h4 class="text-center mb-2 p-2 font-semibold justify-center text-primary-500 dark:text-primary-100">
            Platform Based Users
        </h4>
        <div class="w-full h-full">
            <PlatformBasedChart {totalUsers} {androidUsers} {iOSUsers} lables={years} />
        </div>
    </div>
</div>