<script lang="ts">
	import { page } from '$app/stores';
	import Navbar from '$lib/components/navbar/navbar.svelte';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
    import type { LayoutServerData } from './$types';

    ////////////////////////////////////////////////////////////////

	export let data: LayoutServerData;

	const userId = $page.params.userId;
    const userRole = data.sessionUser.roleName;
    const tenantSettings = data.tenantSettings;

	const onLogout = async () => {
		const response = await fetch(`/api/server/logout`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' }
		});
		const resp = await response.text();
		console.log(`resp: ${JSON.stringify(resp, null, 2)}`);
		LocalStorageUtils.removeItem('userRoles');
		window.location.href = '/';
	};

</script>

<body>
	<Navbar userId={userId} userRole={userRole} tenantSettings={tenantSettings} 
        on:logout={async () => await onLogout()}>
		<slot />
	</Navbar>
</body>
