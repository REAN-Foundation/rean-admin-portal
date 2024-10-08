<script lang="ts">
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import { browser } from '$app/environment';
	import { personRolesStore } from '$lib/store/general.store';
	import type { PageServerData } from './$types';
	import {
		getPublicLogoImageSource,
		getPublicFooterText,
		getPublicFooterLink,
		getSystemName,
	} from '$lib/themes/theme.selector';
    import { errorMessage } from '$lib/utils/message.utils';
	import { z } from 'zod';
	import toast from 'svelte-french-toast';
	import PasswordInput from '$lib/components/input/password.input.svelte';

	/////////////////////////////////////////////////////////////////////////////

	const logoImageSource = getPublicLogoImageSource();
	const footerText = `© ${new Date().getFullYear()} ${getPublicFooterText()}`;
	const footerLink = getPublicFooterLink();

	export let data: PageServerData;

	personRolesStore.set(data.roles);
	LocalStorageUtils.setItem('personRoles', JSON.stringify(data.roles));
	let personRoles = [];
	let showForgotPassword = false;
	let showResetPassword = false;

	let email = '';
	let resetCode = '';
	let newPassword = '';
	let confirmPassword = '';
	let errors: Record<string, string[]> = {};
	let loginActiveTab = 'email';
	let forgotPasswordActiveTab = 'email';
	let phone = ''
	let countryCode = ''

	if (browser) {
		const tmp = LocalStorageUtils.getItem('personRoles');
		personRoles = JSON.parse(tmp);
		// const adminRole = personRoles?.find((x) => x.RoleName === 'System admin');
		// if (adminRole) {
		// 	loginRoleId = adminRole.id;
		// }
		LocalStorageUtils.removeItem('prevUrl');
	}

  let maxHeight = '80vh';
	if (browser) {
  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 600) {
      maxHeight = '40vh';
    } else if (screenWidth <= 1024) {
      maxHeight = '50vh';
    } else if (screenWidth <= 1440) {
      maxHeight = '60vh';
    } else if (screenWidth <= 1600) {
      maxHeight = '70vh';
    } else {
      maxHeight = '80vh';
    }
  };

  window.addEventListener('resize', handleResize);
  handleResize();
}

	const systemName = getSystemName();
	$: pageTitle = showForgotPassword
        ? 'Forgot Password'
        : showResetPassword
        ? 'Reset Password'
        : 'Login';

	const resetPasswordSchema = z.object({
		email: z.string().email({ message: 'Invalid email address' }),
		resetCode: z.string().min(6, { message: 'Reset code must be 6 characters' }),
		newPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
		confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
	}).refine(data => data.newPassword === data.confirmPassword, {
		message: "New password and confirm new password must match",
		path: ['confirmPassword'],
	});

	async function handleForgotPassword() {
		let requestBody = {
			Email : email,
			CountryCode : countryCode,
			Phone : phone
		};
		const response = await fetch(`/api/server/users/send-reset-code`, {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: { 'content-type': 'application/json' }
		});
		const res =  await response.json();
		
		if (res.Status === "success") {
			toast.success(res.Message)
			showResetPassword = true;
			showForgotPassword = false;
		} else {
			toast.error(res.Message);
		}
	}

	async function handleResetPassword() {
		errors = {};
		try {
			resetPasswordSchema.parse({ email, resetCode, newPassword, confirmPassword });
			let resetPasswordBody = {
				ResetCode: resetCode,
				NewPassword: newPassword,
				Email : email,
				CountryCode : countryCode,
				Phone : phone
			};
			console.log("resetPasswordBody", resetPasswordBody)
			console.log
			const response = await fetch('/api/server/users/reset-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(resetPasswordBody)
		});
		const res =  await response.json();
		if (res.Status === "success") {
			toast.success(res.Message)
			showResetPassword = false;
			showForgotPassword = false;
		} else {
			toast.error(res.Message);
		}
		} catch (err) {
			if (err instanceof z.ZodError) {
				errors = err.flatten().fieldErrors;
			} else {
				errorMessage('An unexpected error occurred');
			}
		}
	}

</script>

<svelte:head>
	<title>{systemName}-{pageTitle}</title>
	<meta name="description" content="REAN careplans" />
</svelte:head>
<body>
	<div class="nav h-12 w-full bg-primary-700" />
	<div class="w-full h-full" id="background-image">
		<div class="bg-back-ground h-full w-full bg-primary-50">
			<div class="h-full w-full px-3">
				<div class="flex justify-center flex-col items-center">
					<img
						class="ct-image w-36 mt-7 mb-7"
						alt="logo"
						src={logoImageSource}
					/>
					{#if showForgotPassword}
						<div class="shadow-bottom-right p-8 pb-1 pt-5 rounded-lg mt-5 bg-secondary-50 border border-slate-300 shadow-xl w-96 max-w-full"style={`max-height: ${maxHeight}; overflow-y: auto;`}>
							<h2 class="text-center text-xl mb-4">Forgot Password</h2>
							<form on:submit|preventDefault={handleForgotPassword}>
								<div class="justify-center w-full mt-5 h-50">
									<div class="flex gap-6 mb-4">
										<div class="flex gap-2">
											<input type="radio" class="radio rounded-full" name="loginType" value="email" bind:group={forgotPasswordActiveTab} /> Email
										</div>
										<div class="flex gap-2">
											<input type="radio" class="radio rounded-full" name="loginType" value="phone" bind:group={forgotPasswordActiveTab} /> Phone
										</div>
									</div>
									{#if forgotPasswordActiveTab === 'email'}
										<label class="mb-2" for="email">
											<span class="text-primary-500">Email</span>
											<span class="label-text-alt" />
										</label>
										<input type="email" name="email" bind:value={email} required class="input mb-4" />
									{/if}
									{#if forgotPasswordActiveTab === 'phone'}
									<div class="flex gap-4 mb-4">
										<div class="flex flex-col">
											<label class="mb-2" for="countryCode">
												<span class="text-primary-500">Phone</span>
												<span class="label-text-alt" />
											</label>
											<div class="flex flex-row gap-5">
												<div class="w-1/3">
													<select name="countryCode" bind:value={countryCode} required class="input">
														<option value="+1">+1</option>
														<option value="+91">+91</option>
													</select>
												</div>
											<div class="w-2/3">
												<input type="tel" name="phone" required class="input" bind:value={phone} />
											</div>
											</div>
										</div>
									</div>
									{/if}
								<!-- <label class="mb-2">
									<span class="text-primary-500">Email</span>
									<input type="email" bind:value={email} required class="input mb-4 mt-2" />
								</label> -->
								<button type="submit" class="btn variant-filled-secondary mb-6 w-full">Send Reset Code</button>
								<button type="button" class="btn variant-filled-secondary mb-6 w-full" on:click={() => { showForgotPassword = false; }}>Back to Login</button>
							</form>
						</div>
					{:else if showResetPassword}
						<div class="shadow-bottom-right p-8 pb-1 pt-5 rounded-lg mt-5 bg-secondary-50 border border-slate-300 shadow-xl w-96 max-w-full" style={`max-height: ${maxHeight}; overflow-y: auto;`}>
							<h2 class="text-center text-xl mb-4">Reset Password</h2>
							<form on:submit|preventDefault={handleResetPassword}>
								<!-- <label class="hidden">
									<span class="text-primary-500">Email</span>
									<input type="email" value={email} required class="input mb-4" />
								</label> -->
								<input type="email" name="email" value={email} class="input mb-4 hidden" />
								<input type="text" name="countryCode" value={countryCode} class="input mb-4 hidden" />
								<input type="text" name="phone" value={phone} class="input mb-4 hidden" />
								<label>
									<span class="text-primary-500">Reset Code/OTP</span>
									<input type="text" bind:value={resetCode} required class="input mb-4 mt-2" />
									{#if errors.resetCode}
										<span class="text-error-500">{errors.resetCode}</span>
									{/if}
								</label>
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<label>
									<span class="text-primary-500">New Password</span>
									<div class="mb-4 mt-2">
										<PasswordInput bind:password ={newPassword} name = "newPassword"/>
									</div>

									<!-- <input type="password" bind:value={newPassword} required class="input mb-4 mt-2" /> -->
									{#if errors.newPassword}
										<span class="text-error-500">{errors.newPassword}</span>
									{/if}
								</label>
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<label>
									<span class="text-primary-500">Confirm New Password</span>
									<div class="mb-4 mt-2">
										<PasswordInput bind:password= {confirmPassword} name = 'confirmPassword'/>
									</div>

									<!-- <input type="password" bind:value={confirmPassword} required class="input mb-4" /> -->
									{#if errors.confirmPassword}
										<span class="text-error-500">{errors.confirmPassword}</span>
									{/if}
								</label>
								<button type="submit" class="btn variant-filled-secondary mb-6 w-full">Reset Password</button>
								<button type="button" class="btn variant-filled-secondary mb-6 w-full" on:click={() => { showResetPassword = false; }}>Back to Login</button>
							</form>
						</div>
					{:else}
					<form method="post" action="?/login" class="shadow-bottom-right p-8 pb-1 pt-5 rounded-lg mt-5 bg-secondary-50 border border-slate-300 shadow-xl w-96 max-w-full" style={`max-height: ${maxHeight}; overflow-y: auto;`}>
						<!-- <input name="roleId" bind:value={loginRoleId} class="hidden"/> -->
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<div class="justify-center w-full mt-5 h-50">
							<div class="flex gap-6 mb-4">
								<div class="flex gap-2">
									<input type="radio" class="radio rounded-full" name="loginType" value="email" bind:group={loginActiveTab} /> Email
								</div>
								<div class="flex gap-2">
									<input type="radio" class="radio rounded-full" name="loginType" value="phone" bind:group={loginActiveTab} /> Phone
								</div>
								<div class="flex gap-2">
									<input type="radio" class="radio rounded-full" name="loginType" value="username" bind:group={loginActiveTab} />Username
								</div>
							</div>
							{#if loginActiveTab === 'username'}
								<label class="mb-2" for="username">
									<span class="text-primary-500">Username</span>
									<span class="label-text-alt" />
								</label>
								<input type="text" name="username" required class="input mb-4" />
							{/if}
							{#if loginActiveTab === 'email'}
								<label class="mb-2" for="email">
									<span class="text-primary-500">Email</span>
									<span class="label-text-alt" />
								</label>
								<input type="email" name="email" required class="input mb-4" />
							{/if}
							{#if loginActiveTab === 'phone'}
							<div class="flex gap-4 mb-4">
								<div class="flex flex-col">
									<label class="mb-2" for="countryCode">
										<span class="text-primary-500">Phone</span>
										<span class="label-text-alt" />
									</label>
									<div class="flex flex-row gap-5">
										<div class="w-1/3">
											<select name="countryCode" required class="input">
												<option value="+1">+1</option>
												<option value="+91">+91</option>
											</select>
										</div>
									<div class="w-2/3">
										<input type="tel" name="phone" required class="input" />
									</div>
									</div>
								</div>
							</div>
							{/if}
							<label class="mb-2" for="password">
								<div class="grid grid-flow-col">
									<span class="text-left text-primary-500">Password</span>
									<span class="text-right text-primary-500 ml-4 sm:ml-12 invisible">
										<b>Generate OTP</b>
									</span>
								</div>
							</label>
							<PasswordInput/>
							<!-- <input type="password" name="password" required class="input" /> -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<label class="lable">
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<span class="text-primary-500 cursor-pointer" on:click={() => { showForgotPassword = true; }}>
									<b>Forgot Password?</b>
								</span>
							</label>
							<br />
							<button type="submit" class="btn variant-filled-secondary mb-6 w-full">Login</button>
						</div>
					</form>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<footer class="w-full fixed bottom-0 bg-primary-900 text-center p-2">
		<a href={footerLink} class="!text-white">{footerText}</a>
	</footer>
</body>
