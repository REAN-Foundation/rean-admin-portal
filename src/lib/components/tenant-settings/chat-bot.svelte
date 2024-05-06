<script lang="ts">
    import { page } from '$app/stores';
    import Icon from '@iconify/svelte';
    import Icons from '$lib/components/icons.svelte';
    import InfoIcon from '$lib/components/infoIcon.svelte';
    import { showMessage } from '$lib/utils/message.utils';

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const userId = $page.params.userId;
    const tenantRoute = `/users/${userId}/tenants`;

    let imageUrl = '';
    let fileinput;
     
    export let name: string;
    export let icon: string;
    export let description: string;
    export let defaultLanguage: string;
    export let isWhatsAppchecked: boolean = false;
    export let isTelegramchecked: boolean = false;
    export let isClickUpchecked: boolean = false;
    export let isSlackchecked: boolean = false;
    export let isEmailchecked: boolean = false;
    export let isChatPersonlizationchecked: boolean = false;
    export let isLocalizationContextualQuerieschecked: boolean = false;
    export let isLocalizationSupportchecked: boolean = false;
    export let edit;
    export let chatBotSettingOptions;

    $: {
        chatBotSettingOptions.name = name;
        chatBotSettingOptions.icon = imageUrl ? imageUrl : icon ;
        chatBotSettingOptions.description = description;
        chatBotSettingOptions.defaultLanguage = defaultLanguage;
        chatBotSettingOptions.isWhatsAppchecked = isWhatsAppchecked;
        chatBotSettingOptions.isTelegramchecked = isTelegramchecked;
        chatBotSettingOptions.isClickUpchecked = isClickUpchecked;
        chatBotSettingOptions.isSlackchecked = isSlackchecked;
        chatBotSettingOptions.isEmailchecked = isEmailchecked;
        chatBotSettingOptions.isChatPersonlizationchecked = isChatPersonlizationchecked;
        chatBotSettingOptions.isLocalizationContextualQuerieschecked = isLocalizationContextualQuerieschecked;
        chatBotSettingOptions.isLocalizationSupportchecked = isLocalizationSupportchecked;
    }
    $: console.log('ico: ' , icon);
    $: console.log('is edit allowed', edit);
    $: console.log('isWhatsAppchecked', isWhatsAppchecked, typeof isWhatsAppchecked);
    $: console.log('isTelegramchecked', isTelegramchecked);
    $: console.log('isClickUpchecked', isClickUpchecked);
    $: console.log('isSlackchecked', isSlackchecked);
    $: console.log('isEmailchecked', isEmailchecked);
    $: console.log('isChatPersonlizationchecked', isChatPersonlizationchecked);
    $: console.log('isLocalizationContextualQuerieschecked', isLocalizationContextualQuerieschecked);
    $: console.log('isLocalizationSupportchecked', isLocalizationSupportchecked);

    // $: console.log("FROM CHAT BOT PAGE",chatBotSettingOptions);
    const infoIconTitles = {
        supportChannel: 'Please select the values for support channel if you want to include in your chat bot',
        email: 'Please select the email if you want to include in your chat bot',
        clickUp: 'Please select the clickup if you want to include in your chat bot',
        slack: 'Please select the slack if you want to include in your chat bot',
        messageChannel: 'Please select the values for message channel if you want to include in your chat bot',
        whatsapp: 'Please select the whatsapp if you want to include in your chat bot',
        telegram: 'Please select the telegram if you want to include in your chat bot',
        customUserDbQuery: 'Please select the custom user db query if you want to include in your chat bot',
        locationContextualQuery: 'Please select the location contextual query if you want to include in your chat bot',
        localizationSupport: 'Please select the location support if you want to include in your chat bot',
        quicksightDashboard: 'Please select the quicksight dashboard if you want to include in your chat bot',
        chatPersonlization: 'Please select the chat personlization if you want to include in your chat bot'
    };

    const upload = async (imgBase64, filename) => {
        const data = {};
        console.log(imgBase64);
        const imgData = imgBase64.split(',');
        data['image'] = imgData[1];
        console.log(JSON.stringify(data));
        const res = await fetch(`/api/server/file-resources/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                filename: filename
            },
            body: JSON.stringify(data)
        });
        console.log(Date.now().toString());
        const response = await res.json();
        if (response.Status === 'success' && response.HttpCode === 201) {
            const imageResourceId = response.Data.FileResources[0].id;
            console.log('imageResourceId', imageResourceId);
            const imageUrl_ = response.Data.FileResources[0].Url;
            console.log('imageUrl_', imageUrl_);
            if (imageUrl_) {
                imageUrl = imageUrl_;
            }
            console.log(imageUrl);
        } else {
            showMessage(response.Message, 'error');
        }
    };

    const onFileSelected = async (e) => {
        let f = e.target.files[0];
        const filename = f.name;
        let reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = async (e) => {
            fileinput = e.target.result;
            await upload(e.target.result, filename);
        };
    };
</script>

<form
    method="post"
    class="table-container my-0 border border-secondary-100 dark:!border-surface-700 overflow-x-auto"
>
    <table class="table">
        <thead class="!variant-soft-secondary">
            <tr>
                <th class="flex items-center">
                    Chat Bot
                    <div class="text-end ml-auto">
                        <a
                            href={tenantRoute}
                            class="btn px-0 w-8 h-8 variant-soft-secondary"
                        >
                            <a
                                href={tenantRoute}
                                class="btn p-2 -my-2 variant-soft-secondary"
                            >
                                <Icon
                                    icon="material-symbols:close-rounded"
                                    class="text-lg"
                                />
                            </a>
                        </a>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody class="!bg-white dark:!bg-inherit w-full">
            <tr class="!border-b !border-b-secondary-100 flex flex-row dark:!border-b-surface-700">
                <td class="flex-none mt-2 lg:w-[170px] ml-2 lg:ml-10">Name</td>
                <td class="md:pl-2 text-end w-full ml-[103px] lg:ml-[72px]">
                    <input
                        type="text"
                        placeholder="Enter name here..."
                        bind:value={name}
                        disabled={edit}
                        class="input w-full"
                    />
                </td>
            </tr>
            <tr class="" />
            <tr class="!border-b !border-b-secondary-100 flex flex-row dark:!border-b-surface-700">
                <td class="align-top flex-none lg:w-[170px] ml-2 lg:ml-10">Description</td>
                <td class="md:pl-2 text-end w-full ml-[64px] lg:ml-[72px]">
                    <textarea
                        class="textarea w-full"
                        name="description"
                        bind:value={description}
                        disabled={edit}
                        placeholder="Enter description here..."
                    />
                </td>
            </tr>
            <tr class="" />
            <tr class="!border-b !border-b-secondary-100 flex flex-row dark:!border-b-surface-700">
                <td class="flex-none mt-2 lg:w-[170px] ml-2 lg:ml-10">Default Language</td>
                <td class="md:pl-2 text-end w-full ml-[19px] lg:ml-[72px]">
                    <input
                        type="text"
                        placeholder="Enter default language here..."
                        bind:value={defaultLanguage}
                        disabled={edit}
                        class="input w-full"
                    />
                </td>
            </tr>
            <tr class="" />
            <tr class="!border-b !border-b-secondary-100 flex flex-row dark:!border-b-surface-700">
                <td class="flex-none mt-2 lg:w-[170px] ml-2 lg:ml-10">Icon</td>
                <td class="md:pl-2 text-end w-full ml-[113px] lg:ml-[72px]">
                    <input
                        name="fileinput"
                        type="file"
                        class="true input w-full"
                        placeholder="Image"
                        disabled={edit}
                        on:change={async (e) => await onFileSelected(e)}
                    />
                    <input
                        type="hidden"
                        name="imageUrl"
                        value={'imageUrl'}
                    />
                </td>
            </tr>
            <tr class="" />
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <div class="flex">
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 w-14 ml-0 sm:ml-2 md:ml-5 lg:ml-10"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/chatbot/message_channel.svg#icon"
                    />
                    <td class="flex-initial w-40 ml-0 sm:ml-2 md:ml-5 lg:ml-10">Message Channel</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.messageChannel}
                    />
                </div>
                <div class="flex sm:flex-col flex-col md:flex-col lg:flex-row">
                    <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                        {#if edit === true && isWhatsAppchecked === true}
                        <!-- {#if edit === true} -->
                            <span class="tick text-green-500 mt-4">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="whatsApp"
                                disabled={edit}
                                bind:checked={isWhatsAppchecked}
                                class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                        <Icons
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/chatbot/whatsapp.svg#icon"
                        />
                        <td class="ml-5 w-48 md:w-40 lg:w-32">WhatsApp</td>
                        <InfoIcon
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/info.svg#icon"
                            title={infoIconTitles.whatsapp}
                        />
                    </div>
                    <div class="flex flex-row ml-10 sm:ml-16 md:ml-16 lg:ml-7 xl:ml-24">
                        {#if edit === true && isTelegramchecked === true}
                            <span class="tick text-green-500 mt-4">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="telegram"
                                disabled={edit}
                                bind:checked={isTelegramchecked}
                                class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                        <Icons
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/chatbot/telegram.svg#icon"
                        />
                        <td class="ml-5 w-48 md:w-40 lg:w-40">Telegram</td>
                        <InfoIcon
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/info.svg#icon"
                            title={infoIconTitles.telegram}
                        />
                    </div>
                </div>
                <hr class="!border-b-secondary-100 dark:!border-b-surface-700" />
                <div class="flex">
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 w-14 ml-0 sm:ml-2 md:ml-5 lg:ml-10"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/chatbot/support_channel.svg#icon"
                    />
                    <td class="flex-initial w-40 ml-0 sm:ml-2 md:ml-5 lg:ml-10">Support Channel</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.supportChannel}
                    />
                </div>
                <div class="flex sm:flex-col flex-col md:flex-col lg:flex-row">
                    <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                        {#if edit === true && isEmailchecked === true}
                            <span class="tick text-green-500 mt-4">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="email"
                                disabled={edit}
                                bind:checked={isEmailchecked}
                                class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                        <Icons
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/chatbot/email.svg#icon"
                        />
                        <td class="ml-5 w-48 md:w-40 lg:w-32">Email</td>
                        <InfoIcon
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/info.svg#icon"
                            title={infoIconTitles.email}
                        />
                    </div>
                    <div class="flex flex-row ml-10 sm:ml-16 md:ml-16 lg:ml-7 xl:ml-24">
                        {#if edit === true && isClickUpchecked === true}
                            <span class="tick text-green-500 mt-4">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="clickUp"
                                disabled={edit}
                                bind:checked={isClickUpchecked}
                                class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                        <Icons
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/chatbot/clickup.svg#icon"
                        />
                        <td class="ml-5 w-48 md:w-40 lg:w-40">ClickUp</td>
                        <InfoIcon
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/info.svg#icon"
                            title={infoIconTitles.clickUp}
                        />
                    </div>
                </div>
                <div class="flex sm:flex-col flex-col md:flex-col lg:flex-row">
                    <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                        {#if edit === true && isSlackchecked === true}
                            <span class="tick text-green-500 mt-4">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="slack"
                                disabled={edit}
                                bind:checked={isSlackchecked}
                                class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                        <Icons
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/chatbot/slack.svg#icon"
                        />
                        <td class="ml-5 w-48 md:w-40 lg:w-32">Slack</td>
                        <InfoIcon
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/info.svg#icon"
                            title={infoIconTitles.slack}
                        />
                    </div>
                </div>
                <hr class=" !border-b-secondary-100 dark:!border-b-surface-700" />
                <div class="flex">
                    <div class="flex-none mt-3 w-10 md:w-24 lg:w-24">
                        {#if edit === true && isLocalizationContextualQuerieschecked === true}
                            <span class="tick text-green-500 ml-6 md:ml-10 lg:ml-14">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="localizationContextualQueries"
                                disabled={edit}
                                bind:checked={isLocalizationContextualQuerieschecked}
                                class="ml-6 md:ml-10 lg:ml-14 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                    </div>
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 flex-initial ml-4 w-14 md:ml-[-15px] lg:ml-[-5px]"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/chatbot/location_query.svg#icon"
                    />
                    <td class="flex-initial w-56 md:w-56 lg:w-56 ml-3 md:ml-[-20px]">Location Contextual Queries</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.locationContextualQuery}
                    />
                </div>
                <hr class="!border-b-secondary-100 dark:!border-b-surface-700" />
                <div class="flex">
                    <div class="flex-none mt-3 w-10 md:w-24 lg:w-24">
                        {#if edit === true && isLocalizationSupportchecked === true}
                            <span class="tick text-green-500 ml-6 md:ml-10 lg:ml-14">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="localizationSupport"
                                disabled={edit}
                                bind:checked={isLocalizationSupportchecked}
                                class="ml-6 md:ml-10 lg:ml-14 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                    </div>
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 flex-initial ml-4 w-14 md:ml-[-15px] lg:ml-[-5px]"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/chatbot/location.svg#icon"
                    />
                    <td class="flex-initial w-56 md:w-56 lg:w-56 ml-3 md:ml-[-20px]">Localization Support</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.localizationSupport}
                    />
                </div>
                <hr class="!border-b-secondary-100 dark:!border-b-surface-700" />
                <div class="flex">
                    <div class="flex-none mt-3 w-10 md:w-24 lg:w-24">
                        {#if edit === true && isChatPersonlizationchecked === true}
                            <span class="tick text-green-500 ml-6 md:ml-10 lg:ml-14">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="chatPersonlization"
                                disabled={edit}
                                bind:checked={isChatPersonlizationchecked}
                                class="ml-6 md:ml-10 lg:ml-14 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                    </div>
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 flex-initial ml-4 w-14 md:ml-[-15px] lg:ml-[-5px]"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/chatbot/chat.svg#icon"
                    />
                    <td class="flex-initial w-56 md:w-56 lg:w-56 ml-3 md:ml-[-20px]">Chat Personlization</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.chatPersonlization}
                    />
                </div>
            </tr>
        </tbody>
    </table>
</form>
