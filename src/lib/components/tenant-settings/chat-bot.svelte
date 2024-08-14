<script lang="ts">
    import { page } from '$app/stores';
    import Icon from '@iconify/svelte';
    import Icons from '$lib/components/icons.svelte';
    import InfoIcon from '$lib/components/infoIcon.svelte';
    import { showMessage } from '$lib/utils/message.utils';
    import { enhance } from '$app/forms';

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const userId = $page.params.userId;
    const tenantRoute = `/users/${userId}/tenants`;
    let selectedfrequecyOption = '';
    let selectedOption = '';
    let subOption = '';
    let selectOp = '';
    let selectOption = '';

    let imageUrl = '';
    let fileinput;

    export let isManual: boolean = false
    export let isScheduleTrigger: boolean = false
     
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


    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Dates of the month
    const datesOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);
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



            <tr class=" bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
            <hr class="!border-b-secondary-100 dark:!border-b-surface-700" />
            <div class="flex flex-row gap- 4 bg-white">
                <Icons
                    cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 w-14 ml-0 sm:ml-2 md:ml-5 lg:ml-10"
                    h="100%"
                    w="100%"
                    iconPath="/tenant-setting/chatbot/appointment_follow_up.svg#icon"
                />
                <td class="flex-initial ml-0 sm:ml-2 md:ml-5 lg:ml-10">Appointment Follow-Up</td>
                <InfoIcon
                    cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                    h="100%"
                    w="100%"
                    iconPath="/tenant-setting/info.svg#icon"
                    title={infoIconTitles.messageChannel}
                />
            </div>
           <div class = "bg-white"> 
                <div class =" flex sm:flex-col flex-col md:flex-col gap-6 lg:flex-row bg-white text-sm ml-0 sm:ml-2 md:ml-5 lg:ml-10 ">
                <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                    <input type="radio" id="option1" name="option" value="option1" bind:group={selectedOption} />
                    <label for="option1">Upload Appointment PDF</label>
                </div>
            
                <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                    <input type="radio" id="option2" name="option" value="option2" bind:group={selectedOption} />
                    <label for="option2">Use Appointment EHR API</label>
                </div>
                </div>
            
                {#if selectedOption === 'option2'}
                <!-- <hr class="!border-b-secondary-100 dark:!border-b-surface-700" /> -->
                    <div class="flex flex-row gap- 4 bg-white">
                        <Icons
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 w-14 ml-0 sm:ml-2 md:ml-5 lg:ml-10"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/chatbot/message_channel.svg#icon"
                        />
                        <td class="flex-initial ml-0 sm:ml-2 md:ml-5 lg:ml-10">Use Appointment EHR API</td>
                        <InfoIcon
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/info.svg#icon"
                            title={infoIconTitles.messageChannel}
                        />
                    </div>
                <div class = "flex sm:flex-col flex-col md:flex-col gap-6  bg-white lg:flex-row text-sm ml-10 sm:ml-6 md:ml-7 lg:ml-20">
	
                    <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                        <input type="radio" id="option3" name="option" value="option3" bind:group={subOption} />
                        <label for="option3">Integrate with custom API</label>
                      </div>
                
                      <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                        <input type="radio" id="option4" name="option" value="option4" bind:group={subOption} />
                        <label for="option4">Integrate with FHIR API</label>
                      </div>
                    </div>
                
                {/if}
                </div>

                {#if subOption === 'option3'}
                <div class = "bg-white mt-2 mr-2 ml-0 sm:ml-2 md:ml-5 lg:ml-10">
                <table class="table mx-auto bg-white">
                    <thead>
                    <tr class="content-left">
                    <th class="text-left font-bold bg-white ">Trigger custom API</th>
                    </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td class="text-start w-2/5">
                                Provide Url*</td>
                                <td class="text-start w-3/5">
                                    <input
                                        type="text"
                                        class="true input w-[80%]"
                                        name="Url"
                                        required
                                    />
                                   </td>
                            </tr>

                            <tr>
                                <td class="text-start w-2/5">
                                Username*</td>
                                <td class="text-start w-3/5">
                                    <input
                                        type="text"
                                        class="true input w-[80%]"
                                        name="Username"
                                        required
                                    />
                                    </td>
                            </tr>

                            <tr>
                                <td class="text-start w-2/5">
                                Password*</td>
                                <td class="text-start w-3/5">
                                    <input
                                        type="text"
                                        class="true input w-[80%]"
                                        name="password"
                                        required
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                {/if}
        
        
                {#if subOption === 'option4'}
                <div class = "bg-white mt-2 mr-2 ml-0 sm:ml-2 md:ml-5 lg:ml-10">
                <table class="table mx-auto bg-white">
                    <thead>
                    <tr class="content-left">
                    <th class="text-left font-bold bg-white ">Trigger FHIR API</th>
                    </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td class="text-start w-2/5">
                                Provide Url*</td>
                                <td class="text-start w-3/5">
                                    <input
                                        type="text"
                                        class="true input w-[80%]"
                                        name="Url"
                                        required
                                    />
                                   </td>
                            </tr>

                            <tr>
                                <td class="text-start w-2/5">
                                Username*</td>
                                <td class="text-start w-3/5">
                                    <input
                                        type="text"
                                        class="true input w-[80%]"
                                        name="Username"
                                        required
                                    />
                                    </td>
                            </tr>

                            <tr>
                                <td class="text-start w-2/5">
                                Password*</td>
                                <td class="text-start w-3/5">
                                    <input
                                        type="text"
                                        class="true input w-[80%]"
                                        name="password"
                                        required
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                {/if}
           <!-- </tr>
           <hr class="!border-b-secondary-100 dark:!border-b-surface-700 mt-2" />
           <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700"> -->
            <div class = "bg-white">
                <div class="flex flex-row gap- 4 bg-white mt-2">
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 w-14 ml-0 sm:ml-2 md:ml-5 lg:ml-10"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/chatbot/message_channel.svg#icon"
                    />
                    <td class="flex-initial ml-0 sm:ml-2 md:ml-5 lg:ml-10">Follow-Up Mechanism</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.messageChannel}
                    />
                </div>

                <div class="bg-white flex sm:flex-col flex-col md:flex-col lg:flex-row pb-2">
                    <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                        {#if edit === true && isManual === true}
                        <!-- {#if edit === true} -->
                            <span class="tick text-green-500 mt-4">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="whatsApp"
                                disabled={edit}
                                bind:checked={isManual}
                                class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                        <Icons
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/chatbot/whatsapp.svg#icon"
                        />
                        <td class="ml-5">Manually Trigger Appointent Reminder</td>
                        <InfoIcon
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/info.svg#icon"
                            title={infoIconTitles.whatsapp}
                        />
                    </div>

                    <div class="flex flex-row ml-10 sm:ml-16 md:ml-16 lg:ml-7 xl:ml-24">
                        {#if edit === true && isScheduleTrigger === true}
                            <span class="tick text-green-500 mt-4">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="telegram"
                                disabled={edit}
                                bind:checked={isScheduleTrigger}
                                class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                        <Icons
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/chatbot/telegram.svg#icon"
                        />
                        <td class="ml-5">Schedule Trigger for Appointment Reminder</td>
                        <InfoIcon
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/info.svg#icon"
                            title={infoIconTitles.telegram}
                        />
                    </div>
                </div>
            {#if edit === true && isScheduleTrigger === true}
                <!-- <hr class="!border-b-secondary-100 dark:!border-b-surface-700" /> -->
                <div class = "bg-white pb-2">
                <div class="flex flex-row bg-white ml-4 mt-2">
                        <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/chatbot/telegram.svg#icon"
                    />
                    <td class="ml-5">Schedule frequency</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.telegram}
                    />
                </div>  
                    
                            <div class =" flex sm:flex-col flex-col md:flex-col mt-3 pb-2 gap-6 lg:flex-row bg-white text-sm ml-0 sm:ml-2 md:ml-5 lg:ml-10 ">
                            <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                <input type="radio" id="option6" name="option" value="option6" bind:group={selectOp} />
                                <label for="option6">Daily</label>
                            </div>
                        
                            <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                <input type="radio" id="option7" name="option" value="option7" bind:group={selectOp} />
                                <label for="option7">Weekly</label>
                            </div>

                            <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                <input type="radio" id="option8" name="option" value="option8" bind:group={selectOp} />
                                <label for="option8">Monthly</label>
                            </div>
                        </div>
                        {#if selectOp === 'option7'}
                        <div>
                            <h3>Select Day of the Week</h3>
                            <div flex flex-row gap-2>
                            {#each daysOfWeek as day}
                                <div flex flex-col>
                                    <input type="checkbox" id={day} name="days" value={day}>
                                    <label for={day}>{day}</label>
                                </div>
                            {/each}
                            </div>
                        </div>
                        {/if}
                        {#if selectOp === 'option8'}
                        <div>
                            <h3>Select Date of the Month</h3>
                            <div flex flex-row>
                            {#each datesOfMonth as date}
                                <div flex flex-col gap-2>
                                    <input type="checkbox" id={"date" + date} name="dates" value={date}>
                                    <label for={"date" + date}>{date}</label>
                                </div>
                            {/each}
                            </div>
                        </div>
                        {/if}

                        </div>
                        <!-- <hr class="!border-b-secondary-100 dark:!border-b-surface-700" /> -->
                            <div class="flex flex-row bg-white pl-4 mt-2">
                                <Icons
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/chatbot/telegram.svg#icon"
                            />
                            <td class="ml-5">Schedule Time</td>
                            <InfoIcon
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/info.svg#icon"
                                title={infoIconTitles.telegram}
                            />
                            </div>
                         
                                <div class = "bg-white mt-3 mr-2 ml-0 sm:ml-2 md:ml-5 lg:ml-10">
                                    <table class="table mx-auto bg-white">
                                        <thead>
                                        </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="text-start w-2/5">
                                                    Time*</td>
                                                    <td class="text-start w-3/5">
                                                        <input
                                                            type="text"
                                                            class="true input w-[80%]"
                                                            name="Url"
                                                            placeholder="HH:MM"
                                                            required
                                                        />
                                                    </td>
                                                </tr>
                    
                                                <tr>
                                                    <td class="text-start w-2/5">
                                                    TimeZone*</td>
                                                    <td class="text-start w-3/5">
                                                        <input
                                                            type="text"
                                                            class="true input w-[80%]"
                                                            name="Username"
                                                            required
                                                        />
                                                        </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!-- <hr class="!border-b-secondary-100 dark:!border-b-surface-700" /> -->
                                    <div class = "bg-white">
                                    <div class="flex flex-row bg-white ml-4 mt-2">
                                        <Icons
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/chatbot/telegram.svg#icon"
                                    />
                                    <td class="ml-5">Follow-up messages</td>
                                    <InfoIcon
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/info.svg#icon"
                                        title={infoIconTitles.telegram}
                                    />
                                </div>  
                                        <div class = "bg-white"> 
                                            <div class =" flex sm:flex-col flex-col md:flex-col mt-3 pb-2 gap-6 lg:flex-row bg-white text-sm ml-0 sm:ml-2 md:ml-5 lg:ml-10 ">
                                            <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                                <input type="radio" id="option1" name="option" value="option1" bind:group={selectOption} />
                                                <label for="option1">1 Hour before</label>
                                            </div>
                                        
                                            <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                                <input type="radio" id="option2" name="option" value="option2" bind:group={selectOption} />
                                                <label for="option2">1 Day before</label>
                                            </div>
                
                                            <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                                <input type="radio" id="option3" name="option" value="option3" bind:group={selectOption} />
                                                <label for="option3">1 Week before</label>
                                            </div>
                                        </div>
                                    </div>
                             </div>      
                            
                       
              {/if}   
              </div>   
        </tbody>
       
    </table>
</form>
