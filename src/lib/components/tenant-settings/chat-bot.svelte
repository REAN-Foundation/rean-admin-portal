<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const userId = $page.params.userId;
	const tenantRoute = `/users/${userId}/tenants`;

	export let isDefaultchecked = false;
	export let isCustomchecked = false;
	export let isClickUpchecked = false;
	export let isQuicksightDashboardchecked = false;
	export let isLocalizationSupportchecked = false;
	export let isWhatsAppchecked = false;
	export let isTelegramchecked = false;
	export let isSlackchecked = false;
	export let isChatPersonlizationchecked = false;
	export let isCustomUserDBQuerieschecked = false;
	export let isLocalizationContextualQuerieschecked = false;
    export let edit;
    export let chatBotSettingOptions;

    $: {
        chatBotSettingOptions.isDefaultchecked = isDefaultchecked;
        chatBotSettingOptions.isCustomchecked = isCustomchecked;
        chatBotSettingOptions.isClickUpchecked = isClickUpchecked;
        chatBotSettingOptions.isQuicksightDashboardchecked = isQuicksightDashboardchecked;
        chatBotSettingOptions.isLocalizationSupportchecked = isLocalizationSupportchecked;
        chatBotSettingOptions.isWhatsAppchecked = isWhatsAppchecked;
        chatBotSettingOptions.isTelegramchecked = isTelegramchecked;
        chatBotSettingOptions.isSlackchecked = isSlackchecked;
        chatBotSettingOptions.isChatPersonlizationchecked = isChatPersonlizationchecked;
        chatBotSettingOptions.isCustomUserDBQuerieschecked = isCustomUserDBQuerieschecked;
        chatBotSettingOptions.isLocalizationContextualQuerieschecked = isLocalizationContextualQuerieschecked;
    }

    function handleFaqOptionChange(event) {
        if (event.currentTarget.value === 'Default') {
            isDefaultchecked = true;
            isCustomchecked = false;
        } else if (event.currentTarget.value === 'Custom') {
            isDefaultchecked = false;
            isCustomchecked = true;
        }
        else {
            isDefaultchecked = false;
            isCustomchecked = false;
        }
   }

</script>

<form
	method="post"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700 overflow-hidden"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Chat Bot</th>
				<th class="text-end">
					<a href={tenantRoute} class="btn px-0 w-8 h-8 variant-soft-secondary">
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit flex flex-col w-[1183px]">
			
			<div class="flex flex-row">
			    <tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<div class="flex flex-col ml-10">
						<td class="w-[150px]">Support Channel</td>
					</div>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<div class="ml-24">
						<td>
                            {#if edit === true && isClickUpchecked === true}
                            <span class="tick text-green-500 ml-10">✔</span>
                            {:else}
                                <input
                                    type="checkbox"
                                    name="clickUp"
                                    disabled = {edit}
                                    bind:checked={isClickUpchecked} 
                                    class="ml-9 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                />
                            {/if}                            

						</td>
						<td class="ml-4">ClickUp</td>
					</div>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-3/4">
					<div class="ml-8">
						<td>
                            {#if edit === true && isSlackchecked === true}
                                <span class="tick text-green-500 ml-10">✔</span>
                            {:else}
                                <input
                                    type="checkbox"
                                    name="slack"
                                    disabled = {edit}
                                    bind:checked={isSlackchecked} 
                                    class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                />
                            {/if}                             

						</td>
						<td class="ml-4">Slack</td>
					</div>
				</tr>
			</div>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
                    {#if edit === true && isLocalizationSupportchecked === true}
                        <span class="tick text-green-500 ml-10">✔</span>
                    {:else}
                        <input
                            type="checkbox"
                            name="localizationSupport"
                            disabled = {edit}
                            bind:checked={isLocalizationSupportchecked} 
                            class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                        />
                    {/if}                            

				</td>
				<td class="ml-4">Localization Support</td>
			</tr>
			<div class="flex flex-row">
               <tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<div class="flex flex-col ml-10">
						<td class=" w-[150px]">Message Channel</td>
					</div>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<div class="ml-11">
						<td>
                            {#if edit === true && isWhatsAppchecked === true}
                                <span class="tick text-green-500 ml-10">✔</span>
                            {:else}
                                <input
                                    type="checkbox"
                                    name="whatsApp"
                                    disabled = {edit}
                                    bind:checked={isWhatsAppchecked} 
                                    class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                />
                            {/if}                               

					</td>
					<td class="ml-4">WhatsApp</td>
				</tr>
			
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-full">
					<div class="ml-4">
						<td>
                            {#if edit === true && isTelegramchecked === true}
                                <span class="tick text-green-500 ml-10">✔</span>
                            {:else}
                                <input
                                    type="checkbox"
                                    name="telegram"
                                    disabled = {edit}
                                    bind:checked={isTelegramchecked} 
                                    class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                />
                            {/if}                                  
						</td>
						<td class="ml-4">Telegram</td>
					</div></tr
				>
			</div>
			<div class="flex flex-row">
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<div class="flex flex-col ml-10">
						<td>FAQ</td>
					</div>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<div class="ml-36">
						<td>
                            {#if edit === true && isDefaultchecked === true}
                                <span class="tick text-green-500 ml-10">✔</span>
                            {:else}
                                <input
                                    type="radio"
                                    name="FAQ"
                                    value="Default"
                                    disabled = {edit}
                                    checked={isDefaultchecked}
                                    on:change={handleFaqOptionChange}
                                    class="ml-10 radio rounded-full radio-primary border-primary-200 hover:border-primary-400 radio-md"
                                />
                            {/if}                                     

						</td>
						<td>Default</td>
					</div>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-3/4">
					<div class="ml-8">
						<td>
                            {#if edit === true && isCustomchecked === true}
                                <span class="tick text-green-500 ml-10">✔</span>
                            {:else}
                                <input
                                    type="radio"
                                    name="FAQ"
                                    value="Custom"
                                    disabled = {edit}
                                    checked={isCustomchecked}
                                    on:change={handleFaqOptionChange}
                                    class="ml-10 radio rounded-full radio-primary border-primary-200 hover:border-primary-400 radio-md"
                                />
                            {/if}                                       

						</td>
						<td class="ml-4">Custom</td>
					</div>
				</tr>
			</div>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
                    {#if edit === true && isQuicksightDashboardchecked === true}
                    <span class="tick text-green-500 ml-10">✔</span>
                    {:else}
                        <input
                            type="checkbox"
                            name="quicksightDashboard"
                            disabled = {edit}
                            bind:checked={isQuicksightDashboardchecked} 
                            class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                        />
                    {/if}                                       
				</td>
				<td class="ml-4">Quicksight Dashboard</td>
			</tr>
			<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>
                    {#if edit === true && isChatPersonlizationchecked === true}
                    <span class="tick text-green-500 ml-10">✔</span>
                    {:else}
                        <input
                            type="checkbox"
                            name="chatPersonlization"
                            disabled = {edit}
                            bind:checked={isChatPersonlizationchecked} 
                            class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                        />
                    {/if}        
    			</td>
				<td class="ml-4">Chat Personlization</td>
			</tr>
			<div class="flex flex-row">
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>
                        {#if edit === true && isCustomUserDBQuerieschecked === true}
                            <span class="tick text-green-500 ml-10">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="customUserDBQueries"
                                disabled = {edit}
                                bind:checked={isCustomUserDBQuerieschecked} 
                                class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}     
    				</td>
					<td class="ml-4 w-[400px]">Custom User DB Queries</td>
				</tr>
				<tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700 w-full">
					<div class="">
						<td>
                            {#if edit === true && isLocalizationContextualQuerieschecked === true}
                                <span class="tick text-green-500 ml-10">✔</span>
                            {:else}
                                <input
                                    type="checkbox"
                                    name="localizationContextualQueries"
                                    disabled = {edit}
                                    bind:checked={isLocalizationContextualQuerieschecked} 
                                    class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                />
                            {/if}     
						</td>
						<td class="ml-4">Location Contextual Queries</td>
					</div></tr>
			</div>
		</tbody>
	</table>
</form>
