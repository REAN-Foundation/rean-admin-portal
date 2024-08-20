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

    let weekDay = '';
    let selectedDayOfMonth = 1;

    let imageUrl = '';
    let fileinput;

    export let isManualchecked: boolean = false;
    export let isScheduleTriggerchecked: boolean = false;
    export let followUpMessageschecked: boolean = false;
     
    export let name: string;
    export let icon: string;
    export let description: string;
    export let defaultLanguage: string;
    export let triggerFhirApiUrl: string;
    export let triggerFhirApiUsername: string;
    export let triggerFhirApiPassword: string;
    export let triggerCustomApiUrl: string;
    export let triggerCustomApiUsername: string;
    export let triggerCustomApiPassword : string;
    export let scheduleReminderTime : string;
    export let isWhatsAppchecked: boolean = false;
    export let isTelegramchecked: boolean = false;
    export let isClickUpchecked: boolean = false;
    export let isSlackchecked: boolean = false;
    export let isEmailchecked: boolean = false;
    export let isChatPersonlizationchecked: boolean = false;
    export let isLocalizationContextualQuerieschecked: boolean = false;
    export let isLocalizationSupportchecked: boolean = false;
    export let uploadAppointmentPDF: boolean = false;
    export let useAppointmentEHRAPI: boolean = false;
    export let integrateWithCustomAPI: boolean = false;
    export let integrateWithFhirAPI: boolean = false;
    export let scheduleDaily: boolean = false;
    export let scheduleWeekly: boolean = false;
    export let scheduleMonthly: boolean = false;
    export let hourBefore: boolean = false;
    export let dayBefore: boolean = false;
    export let weekBefore: boolean = false;
    export let edit;
    export let chatBotSettingOptions;

    // $: {
    //     chatBotSettingOptions.uploadAppointmentPDF = selectedOption === "option1"? true : false;
    //     chatBotSettingOptions.useAppointmentEHRAPI = selectedOption === "option2"? true : false;
    //     chatBotSettingOptions.integrateWithCustomApi = subOption === "option3"? true : false;
    //     chatBotSettingOptions.integrateWithFhirApi = subOption === "option4"? true : false;
    //     chatBotSettingOptions.scheduleDaily = selectOp === "option6"? true : false;
    //     chatBotSettingOptions.scheduleWeekly = selectOp === "option7"? true : false;
    //     chatBotSettingOptions.scheduleMonthly = selectOp === "option8"? true : false;
    //     chatBotSettingOptions.hourBefore = selectOption === op1? true : false;
    //     chatBotSettingOptions.dayBefore = selectOption === op2? true : false;
    //     chatBotSettingOptions.weekBefore = selectOption === op3? true : false;

    //    }


    $: {
        chatBotSettingOptions.name = name;
        chatBotSettingOptions.icon = imageUrl ? imageUrl : icon ;
        chatBotSettingOptions.description = description;
        chatBotSettingOptions.defaultLanguage = defaultLanguage;
        chatBotSettingOptions.triggerFhirApiUrl = triggerFhirApiUrl;
        chatBotSettingOptions.triggerFhirApiUsername = triggerFhirApiUsername;
        chatBotSettingOptions.triggerFhirApiPassword = triggerFhirApiPassword;
        chatBotSettingOptions.triggerCustomApiUrl = triggerCustomApiUrl;
        chatBotSettingOptions.triggerCustomApiUsername =  triggerCustomApiUsername;
        chatBotSettingOptions.triggerCustomApiPassword = triggerCustomApiPassword;
        chatBotSettingOptions.scheduleReminderTime = scheduleReminderTime;
        chatBotSettingOptions.isWhatsAppchecked = isWhatsAppchecked;
        chatBotSettingOptions.isTelegramchecked = isTelegramchecked;
        chatBotSettingOptions.isClickUpchecked = isClickUpchecked;
        chatBotSettingOptions.isSlackchecked = isSlackchecked;
        chatBotSettingOptions.isEmailchecked = isEmailchecked;
        chatBotSettingOptions.isChatPersonlizationchecked = isChatPersonlizationchecked;
        chatBotSettingOptions.isLocalizationContextualQuerieschecked = isLocalizationContextualQuerieschecked;
        chatBotSettingOptions.isLocalizationSupportchecked = isLocalizationSupportchecked;
        
        chatBotSettingOptions.uploadAppointmentPDF = uploadAppointmentPDF ;
        chatBotSettingOptions.useAppointmentEHRAPI = useAppointmentEHRAPI ;
        chatBotSettingOptions.integrateWithCustomAPI = integrateWithCustomAPI;
        chatBotSettingOptions.integrateWithFhirAPI = integrateWithFhirAPI;
        chatBotSettingOptions.scheduleDaily = scheduleDaily;
        chatBotSettingOptions.scheduleWeekly = scheduleWeekly;
        chatBotSettingOptions.scheduleMonthly = scheduleMonthly;
        chatBotSettingOptions.hourBefore = hourBefore;
        chatBotSettingOptions.dayBefore = dayBefore;
        chatBotSettingOptions.weekBefore = weekBefore;
        chatBotSettingOptions.ScheduleTiming = scheduleReminderTime;
        chatBotSettingOptions.weekDay = weekDay;
        chatBotSettingOptions.selectedDayOfMonth = selectedDayOfMonth;
        chatBotSettingOptions.triggerFhirApiUrl = triggerFhirApiUrl;
        chatBotSettingOptions.triggerCustomApiUrl = triggerCustomApiUrl;
        chatBotSettingOptions.triggerCustomApiUsername = triggerCustomApiUsername;
        chatBotSettingOptions.triggerCustomApiPassword = triggerCustomApiPassword;
        chatBotSettingOptions.triggerFhirApiUsername  = triggerFhirApiUsername;
        chatBotSettingOptions.triggerFhirApiPassword = triggerFhirApiPassword;
        chatBotSettingOptions.isManualchecked = isManualchecked;
        chatBotSettingOptions.isScheduleTriggerchecked = isScheduleTriggerchecked;
        chatBotSettingOptions.followUpMessageschecked = followUpMessageschecked;


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
        chatPersonlization: 'Please select the chat personlization if you want to include in your chat bot',
        appointmentFollowUp: 'Please select the way of updating appointments in Follow-up service',
        appointmentEhrApi: 'Please select the type of API to trigger Follow-up service',
        followUpMechanism: 'Please select the type of mechanism to trigger Follow-up service api',
        triggerManually: 'Please select the trigger Manually if you want to manually trigger Follow-up service',
        scheduleTrigger: 'Please select the schedule trigger if you want to have a schedule job to trigger Follow-up service',
        scheduleFrequency: 'Please select frequency to be either daily,weekly or monthly',
        scheduleTime: 'Please enter the time for scheduling job of follow-up reminder',
        followUpMessage: 'Please select the time to send follow-up reminder message'
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

    //  Days of Week
    // const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // // Dates of the month for check box
    const datesOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);

    function handleChange(event) {
    selectedOption = event.target.value;
    console.log('Selected option:', selectedOption);
    uploadAppointmentPDF = selectedOption === "option1"? true : false;
    useAppointmentEHRAPI = selectedOption === "option2"? true : false;
    console.log('uploadAppointmentPDF:', uploadAppointmentPDF);
    console.log('useAppointmentEHRAPI:', useAppointmentEHRAPI);
  }  
  function handleApiChange(event) {
    subOption = event.target.value;
    console.log('Selected option:', subOption);
    integrateWithCustomAPI = subOption === "option3"? true : false;
    integrateWithFhirAPI = subOption === "option4"? true : false;
    console.log('integrateWithCustomAPI:', integrateWithCustomAPI);
    console.log('integrateWithFhirAPI:', integrateWithFhirAPI);
  }
  function handleFrequencyChange(event) {
    selectOp = event.target.value;
    console.log('Selected option:', selectOp);
    scheduleDaily = selectOp === "option6"? true : false;
    scheduleWeekly = selectOp === "option7"? true : false;
    scheduleMonthly = selectOp === "option8"? true : false;
    console.log('scheduleDaily:', scheduleDaily);
    console.log('scheduleWeekly:', scheduleWeekly);
    console.log('scheduleMonthly:', scheduleMonthly);
  }
  function handleMessageFreqChange(event) {
    selectOption = event.target.value;
    console.log('Selected option:', selectOption);
    hourBefore = selectOption === "op1"? true : false;
    dayBefore = selectOption === "op2"? true : false;
    weekBefore = selectOption === "op3"? true : false;
    console.log('hourBefore:', hourBefore);
    console.log('dayBefore:', dayBefore);
    console.log('weekBefore:', weekBefore);
  }
  handleMessageFreqChange
  
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
            <div class = "bg-white"> 
            <div class="flex flex-row gap-4  pb-2 bg-white">
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
                    title={infoIconTitles.appointmentFollowUp}
                />
            </div>

           
          
               
            {#if edit === true}
                <div class =" flex sm:flex-col flex-col md:flex-col gap-6 lg:flex-row bg-white text-sm ml-0 pb-4 sm:ml-2 md:ml-5 lg:ml-10 mt-2 ">
                <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                    <input type="radio" id="option1" name="option" value="option1" disabled={edit}/>
                    <label for="option1">Upload Appointment PDF</label>
                </div>
            
                <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                    <input type="radio" id="option2" name="option" value="option2"  disabled={edit}/>
                    <label for="option2">Use Appointment EHR API</label>
                </div>
                </div>
            {:else}
                <div class =" flex sm:flex-col flex-col md:flex-col gap-6 lg:flex-row bg-white text-sm ml-0 pb-4 sm:ml-2 md:ml-5 lg:ml-10 mt-2">
                    <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                        <input type="radio" id="option1" name="option" value="option1" bind:group={selectedOption} on:change={handleChange}  />
                        <label for="option1">Upload Appointment PDF</label>
                    </div>
                
                    <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                        <input type="radio" id="option2" name="option" value="option2" bind:group={selectedOption} on:change={handleChange} />
                        <label for="option2">Use Appointment EHR API</label>
                    </div>
                    </div>
               
                {#if selectedOption === 'option2'}
                
                    <div class="flex flex-row gap-4 pb-2 bg-white">
                        <Icons
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 w-14 ml-0 sm:ml-2 md:ml-5 lg:ml-10"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/chatbot/api_select.svg#icon"
                        />
                        <td class="flex-initial ml-0 sm:ml-2 md:ml-5 lg:ml-10">Use Appointment EHR API</td>
                        <InfoIcon
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/info.svg#icon"
                            title={infoIconTitles.appointmentEhrApi}
                        />
                    </div>
                <div class = "flex sm:flex-col flex-col md:flex-col gap-6 pb-4 bg-white mt-2 lg:flex-row text-sm ml-0 sm:ml-2 md:ml-5 lg:ml-10">
	
                    <div class="flex flex-row gap-2 ml-16 sm:ml-16 md:ml-15 lg:ml-24 ">
                        <input type="radio" id="option3" name="option" value="option3" bind:group={subOption} on:change={handleApiChange} />
                        <label for="option3">Integrate with custom API</label>
                      </div>
                
                      <div class="flex flex-row gap-2 ml-16 sm:ml-16 md:ml-15 lg:ml-24">
                        <input type="radio" id="option4" name="option" value="option4" bind:group={subOption} on:change={handleApiChange} />
                        <label for="option4">Integrate with FHIR API</label>
                      </div>
                    </div>
                
                {#if subOption === 'option3'}
                    <div class = " bg-white pt-2 pr-2 pl-0 sm:pl-2 md:pl-5 lg:pl-10">
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
                                        bind:value={triggerCustomApiUrl}
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
                                        bind:value={triggerCustomApiUsername}
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
                                        bind:value={triggerCustomApiPassword}
                                        required
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                {/if}
        
        
                {#if subOption === 'option4'}
                <div class = "bg-white pt-2 pr-2 pl-0 sm:pl-2 md:pl-5 lg:pl-10">
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
                                        bind:value={triggerFhirApiUrl}
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
                                        bind:value={triggerFhirApiUsername}
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
                                        bind:value={triggerFhirApiPassword}
                                        required
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                {/if}
           
                <div class="flex flex-row gap- 4 bg-white mt-2">
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 w-14 ml-0 sm:ml-2 md:ml-5 lg:ml-10"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/chatbot/follow_up_mechanism.svg#icon"
                    />
                    <td class="flex-initial ml-0 sm:ml-2 md:ml-5 lg:ml-10">Follow-Up Mechanism</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.followUpMechanism}
                    />
                </div>

                <div class="bg-white flex sm:flex-col flex-col md:flex-col lg:flex-row pb-2">
                    <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                        {#if edit === true && isManualchecked === true}
                            <span class="tick text-green-500 mt-4">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="whatsApp"
                                disabled={edit}
                                bind:checked={isManualchecked}
                                class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                        <Icons
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/chatbot/manually.svg#icon"
                        />
                        <td class="ml-5">Manually Trigger Appointent Reminder</td>
                        <InfoIcon
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/info.svg#icon"
                            title={infoIconTitles.triggerManually}
                        />
                    </div>

                    <div class="flex flex-row ml-10 sm:ml-16 md:ml-16 lg:ml-7 xl:ml-24">
                        {#if edit === true && isScheduleTriggerchecked === true}
                            <span class="tick text-green-500 mt-4">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="telegram"
                                disabled={edit}
                                bind:checked={isScheduleTriggerchecked}
                                class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                        <Icons
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/chatbot/schedule_job.svg#icon"
                        />
                        <td class="ml-5">Schedule Trigger for Appointment Reminder</td>
                        <InfoIcon
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/info.svg#icon"
                            title={infoIconTitles.scheduleTrigger}
                        />
                    </div>
                </div>
                {#if isScheduleTriggerchecked === true}
                    <div class="flex flex-row bg-white ml-4 mt-2">
                        <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/chatbot/schedule_frequency.svg#icon"
                    />
                    <td class="ml-5">Schedule frequency</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.scheduleFrequency}
                    />
                 </div>  
                    
                            <div class =" flex sm:flex-col flex-col md:flex-col mt-3 pb-2 gap-6 lg:flex-row bg-white text-sm ml-0 sm:ml-2 md:ml-5 lg:ml-10 ">
                            <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                <input type="radio" id="option6" name="option" value="option6" bind:group={selectOp} on:change={handleFrequencyChange} />
                                <label for="option6">Daily</label>
                            </div>
                        
                            <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                <input type="radio" id="option7" name="option" value="option7" bind:group={selectOp} on:change={handleFrequencyChange}/>
                                <label for="option7">Weekly</label>
                            </div>

                            <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                <input type="radio" id="option8" name="option" value="option8" bind:group={selectOp} on:change={handleFrequencyChange}/>
                                <label for="option8">Monthly</label>
                            </div>
                        </div>
                        {#if selectOp === 'option7'}
                        <div class ="ml-14 mt-2">
                            <td class="ml-8">Select day</td>
                            
                            <div>
                                <select id="dropdown" name="Weekday" required bind:value={weekDay} class = " h-[40px] w-[175px] max-[175px]:w-full py-2  px-2 border rounded-lg bg-white mt-1 text-sm ">
                                    <option value="" disabled selected hidden>Select Day</option>
                                    <option value="Sunday">Sunday</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thrusday">Thrusday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                </select>
                            </div>
                        </div>
                        {/if}
                        {#if selectOp === 'option8'}
                        <div class ="ml-14 mt-2">
                            <td class="ml-8">Select day</td>
                            <select id="day-select" bind:value={selectedDayOfMonth} class = " h-[40px] w-[175px] max-[175px]:w-full py-2  px-2 border rounded-lg bg-white mt-1 text-sm ">
                                <option value="" disabled selected>Select a day</option>
                                {#each datesOfMonth as day}
                                  <option value={day}>{day}</option>
                                {/each}
                              </select>
                            </div>
                        {/if}

                        <div class="flex flex-row bg-white pl-4 mt-4">
                                <Icons
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/chatbot/schedule_time.svg#icon"
                            />
                            <td class="ml-5">Schedule Time</td>
                            <InfoIcon
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/info.svg#icon"
                                title={infoIconTitles.scheduleTime}
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
                                                            bind:value={scheduleReminderTime}
                                                            required
                                                        />
                                                    </td>
                                                </tr>
<!--                     
                                                
                                                </tr> -->
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    <div class="bg-white flex sm:flex-col flex-col md:flex-col lg:flex-row pb-2">
                                        <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                            {#if edit === true && followUpMessageschecked === true}
                                            <span class="tick text-green-500 mt-4">✔</span>
                                            {:else}
                                                <input
                                                    type="checkbox"
                                                    name="whatsApp"
                                                    disabled={edit}
                                                    bind:checked={followUpMessageschecked}
                                                    class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                                />
                                            {/if}
                                            <Icons
                                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                                                h="100%"
                                                w="100%"
                                                iconPath="/tenant-setting/chatbot/message_schedule.svg#icon"
                                            />
                                            <td class="ml-5">Follow-up Messages</td>
                                            <InfoIcon
                                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                                h="100%"
                                                w="100%"
                                                iconPath="/tenant-setting/info.svg#icon"
                                                title={infoIconTitles.followUpMessage}
                                            />
                                        </div> 
                                        </div> 
                                        
                                        {#if followUpMessageschecked === true} 
                                        <div class = "bg-white"> 
                                            <div class =" flex sm:flex-col flex-col md:flex-col mt-3 pb-2 gap-6 lg:flex-row bg-white text-sm ml-0 sm:ml-2 md:ml-5 lg:ml-10 ">
                                            <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                                <input type="radio" id="option1" name="option" value="op1" bind:group={selectOption} on:change={handleMessageFreqChange}/>
                                                <label for="option1">1 Hour before</label>
                                            </div>
                                        
                                            <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                                <input type="radio" id="option2" name="option" value="op2" bind:group={selectOption} on:change={handleMessageFreqChange}/>
                                                <label for="option2">1 Day before</label>
                                            </div>
                
                                            <div class="flex flex-row gap-2 ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                                <input type="radio" id="option3" name="option" value="op3" bind:group={selectOption} on:change={handleMessageFreqChange}/>
                                                <label for="option3">1 Week before</label>
                                            </div>
                                        </div>
                                    </div>
                                    {/if}
                                 
                            {/if}
                            {/if} 
                            {/if}
            </div> 
                        
                       
           
              
        </tbody>
       
    </table>
</form>
