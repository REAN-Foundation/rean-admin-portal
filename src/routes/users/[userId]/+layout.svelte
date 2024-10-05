<script lang="ts">
	import { page } from '$app/stores';
	import Navbar from '$lib/components/navbar/navbar.svelte';
  import { getSystemName } from '$lib/themes/theme.selector';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
  import type { LayoutServerData } from './$types';

////////////////////////////////////////////////////////////////

	export let data: LayoutServerData;

	const systemName = getSystemName();
  
	$:title = systemName + ($page.data.title ?  `- ${$page.data.title}` : "");

	const userId = $page.params.userId;
  const userRole = data.sessionUser.roleName;
  const tenantSettings = data.tenantSettings;
	// const username = data.sessionUser.fullName;
	// const email = data.sessionUser.email;
	// const imageUrl = data.sessionUser.profileImageUrl
	const username = data.user.Person.DisplayName;
	const email = data.user.Person.Email;
	const imageUrl = data.user.Person.ProfileImageURL;

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

<svelte:head>
    <title>{title}</title>
    <meta
        name="description"
        content=""
    />
</svelte:head>

<body>
	<Navbar userId={userId} userRole={userRole} tenantSettings={tenantSettings} 
				username={username} email={email} imageUrl= {imageUrl}
        on:logout={async () => await onLogout()}>
		<slot />
	</Navbar>
</body>
