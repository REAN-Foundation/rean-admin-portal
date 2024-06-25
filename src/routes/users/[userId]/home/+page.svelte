<script lang="ts">
    import type { PageServerData } from './$types';
    import SuperAdminDashboard from '$lib/components/dashboard/super.admin.dashboard.svelte';

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    export let data: PageServerData;
     
</script>

<SuperAdminDashboard {data} />
