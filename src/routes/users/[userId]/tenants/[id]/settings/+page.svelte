<script lang="ts">
    import Form from '$lib/components/tenant-settings/forms.svelte';
    import PatientApp from '$lib/components/tenant-settings/patient-app.svelte';
    import ChatBot from '$lib/components/tenant-settings/chat-bot.svelte';
    import CommonSetting from '$lib/components/tenant-settings/common-setting.svelte';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import { page } from '$app/stores';
    import Icon from '@iconify/svelte';
    import { goto } from '$app/navigation';
    import type { PageServerData } from './$types';
    
    /////////////////////////////////////////////////////////////////////////
    
    $:integrationSettings = {
            PatientInterface: false,
            ChatBotInterface: false,
            FormsInterface: false
        }
    
    const userId = $page.params.userId;
	const tenantId = $page.params.id;
    const viewRoute = `/users/${userId}/tenants/${tenantId}/view`;
	const tenantRoute = `/users/${userId}/tenants`;

	const breadCrumbs = [
		{
			name: 'Tenants',
			path: tenantRoute
		},
		{
			name: 'Settings',
			path: viewRoute
		}
	];
    let disabled = false;

    $: edit = disabled;
    const id = $page.params.id;
    export let data: PageServerData;
    $:createSetting = data.tenantSettingId ? 0 : 1;
    const tenantSetting = data.settings;
    const integrations = [];
    let isPatientAppChecked = false;
    let isChatbotChecked = false;
    let isFormsChecked = false;

    let commonSettingOptions = {
		isVitalsAndLabRecordsChecked : false,
		isRemindersChecked : false,
		isMedicationManagementChecked : false,
		isDocumentManagementChecked : false,
		isScheduledAssessmentsChecked : false,
		isEHRIntegrationsChecked : false,
		isABDMIntegrationChecked : false,
		isNutritionChecked : false,
		isExerciseAndFitnessChecked : false,
		isDefaultCareplanChecked : false,
		isCustomCareplanChecked : false,
		isFHIRResourceStorageChecked : false,
	};

    let patientAppSettingOptions = {
        isTerrachecked : false,
        isSenseSemichecked : false,
        isGamificationAndAwardschecked : false,
        isCommunityAndUserGroupschecked : false,
        isDefaultchecked : false,
        isCustomchecked : false,
        isCoursesAndLearningJourneyschecked : false,
        isAppointmentsAndVisitschecked : false
    }

    let chatBotSettingOptions = {
        isDefaultchecked : false,
	    isCustomchecked : false,
	    isClickUpchecked : false,
	    isQuicksightDashboardchecked : false,
	    isLocalizationSupportchecked : false,
	    isWhatsAppchecked : false,
	    isTelegramchecked : false,
	    isSlackchecked : false,
	    isChatPersonlizationchecked : false,
	    isCustomUserDBQuerieschecked : false,
	    isLocalizationContextualQuerieschecked : false,
    }

    let formSettingOptions = {
        iskoboToolboxchecked : false,
        isodkchecked : false,
        isgoogleFormschecked : false,
        isofflineSupportchecked : false,
        isfieldAppchecked : false,
    }

   if (data.settings) {
        isPatientAppChecked = data.settings.Integrations.PatientInterface,
        isChatbotChecked = data.settings.Integrations.ChatBotInterface,
        isFormsChecked = data.settings.Integrations.FormsInterface
        
        commonSettingOptions.isVitalsAndLabRecordsChecked = data.settings.Common.VitalAndLabRecords;
        commonSettingOptions.isRemindersChecked = data.settings.Common.Reminders;
        commonSettingOptions.isMedicationManagementChecked = data.settings.Common.MedicationManagement;
        commonSettingOptions.isDocumentManagementChecked = data.settings.Common.DocumentManagement;
        commonSettingOptions.isScheduledAssessmentsChecked = data.settings.Common.ScheduledAssesments;
        commonSettingOptions.isEHRIntegrationsChecked = data.settings.Common.EHIRIntegrations;
        commonSettingOptions.isABDMIntegrationChecked = data.settings.Common.ABDMIntegrations;
        commonSettingOptions.isNutritionChecked = data.settings.Common.Nutrition;
        commonSettingOptions.isExerciseAndFitnessChecked = data.settings.Common.ExcerciseAndFitness;
        commonSettingOptions.isDefaultCareplanChecked = data.settings.Common.Careplans.Default;
        commonSettingOptions.isCustomCareplanChecked = data.settings.Common.Careplans.Custom;
        commonSettingOptions.isFHIRResourceStorageChecked = data.settings.Common.FHIRResourceStorage;

        patientAppSettingOptions.isGamificationAndAwardschecked = data.settings.PatientInterface.GamificationAndAwards;
        patientAppSettingOptions.isCoursesAndLearningJourneyschecked = data.settings.PatientInterface.CoursesAndLearningJourneys;
        patientAppSettingOptions.isCommunityAndUserGroupschecked = data.settings.PatientInterface.CommunityAndUserGroups;
        patientAppSettingOptions.isAppointmentsAndVisitschecked = data.settings.PatientInterface.AppointmentsAndVisits;
        patientAppSettingOptions.isTerrachecked = data.settings.PatientInterface.DeviceIntegration.Terra;
        patientAppSettingOptions.isSenseSemichecked = data.settings.PatientInterface.DeviceIntegration.SenseSemi;
        patientAppSettingOptions.isDefaultchecked = data.settings.PatientInterface.PatientReports.Default;
        patientAppSettingOptions.isCustomchecked = data.settings.PatientInterface.PatientReports.Custom;
    
        chatBotSettingOptions.isDefaultchecked = data.settings.ChatBotInterface.FAQ.Default;
        chatBotSettingOptions.isCustomchecked = data.settings.ChatBotInterface.FAQ.Custom;
        chatBotSettingOptions.isClickUpchecked = data.settings.ChatBotInterface.Integrations.ClickUp;
        chatBotSettingOptions.isQuicksightDashboardchecked = data.settings.ChatBotInterface.QuicksightDashboard;
        chatBotSettingOptions.isLocalizationSupportchecked = data.settings.ChatBotInterface.LocalizationSupport;
        chatBotSettingOptions.isWhatsAppchecked = data.settings.ChatBotInterface.WhatsApp;
        chatBotSettingOptions.isTelegramchecked = data.settings.ChatBotInterface.Telegram;
        chatBotSettingOptions.isSlackchecked = data.settings.ChatBotInterface.Integrations.Slack;
        chatBotSettingOptions.isChatPersonlizationchecked = data.settings.ChatBotInterface.ChatPersonalization;
        chatBotSettingOptions.isCustomUserDBQuerieschecked = data.settings.ChatBotInterface.CustomUserDBQueries;
        chatBotSettingOptions.isLocalizationContextualQuerieschecked = data.settings.ChatBotInterface.LocationContextualQueries;

        formSettingOptions.iskoboToolboxchecked = data.settings.FormsInterface.Integrations.KoboToolbox
        formSettingOptions.isodkchecked = data.settings.FormsInterface.Integrations.ODK
        formSettingOptions.isgoogleFormschecked = data.settings.FormsInterface.Integrations.GoogleForm
        formSettingOptions.isofflineSupportchecked = data.settings.FormsInterface.OfflineSupport
        formSettingOptions.isfieldAppchecked = data.settings.FormsInterface.FieldApp

        disabled = true;
        edit = disabled;
    }

    let submit;
    let index = -1;
    $: initial = true;
    $: chatBotSetting = false;
    $: commonSetting = false;
    $: patientAppSetting = false;
    $: formSetting = false;
    function goToNextSetting(index) {
        if (index === -1) {
            initial = false;
            commonSetting = true;
        }
        if (index === 0) {
            commonSetting = false;
            patientAppSetting = true;
        }
        if (index === 1) {
            commonSetting = false;
            patientAppSetting = false;
            chatBotSetting = true;
        }
        if (index === 2) {
            commonSetting = false;
            patientAppSetting = false;
            chatBotSetting = false;
            formSetting = true;
        }
    }
    function setIntegrationOptions() {
       let submitCount = 0;
        if (isPatientAppChecked) {
            submitCount +=1;
        }
        if (isChatbotChecked) {
            submitCount +=1;
        }
        if (isFormsChecked) {
            submitCount +=1;
        }
        submit = submitCount
        integrations.push(isPatientAppChecked);
        integrations.push(isChatbotChecked);
        integrations.push(isFormsChecked);
    }
    
    async function handleCreateTenantSettings() {
        const tenantId = id;
        const settings = {
        Integrations: {
            PatientInterface: false,
            ChatBotInterface: false,
            FormsInterface: false
        },
        Common: {
            VitalAndLabRecords: false,
            Nutrition:false,
            MedicationManagement:false,
            Reminders:false,
            ScheduledAssesments:false,
            ExcerciseAndFitness:false,
            FHIRResourceStorage:false,
            Careplans: {
                Default:false,
                Custom:false
            },
            EHIRIntegrations:false,
            ABDMIntegrations:false,
            DocumentManagement:false
        },
        PatientInterface: {
            GamificationAndAwards:false,
            CoursesAndLearningJourneys:false,
            CommunityAndUserGroups:false,
            AppointmentsAndVisits:false,
            DeviceIntegration: {
                Terra:false,
                SenseSemi:false
            },
            PatientReports: {
                Default:false,
                Custom:false
            }
        },
        ChatBotInterface: {
            FAQ: {
                Default:false,
               Custom:false
            },
            Integrations: {
                ClickUp:false,
               Slack:false
            },
            WhatsApp:false,
           Telegram:false,
           QuicksightDashboard:false,
           ChatPersonalization:false,
           CustomUserDBQueries:false,
           LocationContextualQueries:false,
           LocalizationSupport:false
        },
        FormsInterface: {
            Integrations: {
                KoboToolbox:false,
                ODK:false,
                GoogleForm:false
            },
            OfflineSupport:false,
            FieldApp:false
        }
    }
        settings.Integrations.PatientInterface = isPatientAppChecked,
        settings.Integrations.ChatBotInterface = isChatbotChecked,
        settings.Integrations.FormsInterface = isFormsChecked,

        settings.Common.VitalAndLabRecords = commonSettingOptions.isVitalsAndLabRecordsChecked;
        settings.Common.Nutrition = commonSettingOptions.isNutritionChecked;
        settings.Common.MedicationManagement = commonSettingOptions.isMedicationManagementChecked;
        settings.Common.Reminders = commonSettingOptions.isRemindersChecked;
        settings.Common.ScheduledAssesments = commonSettingOptions.isScheduledAssessmentsChecked;
        settings.Common.ExcerciseAndFitness = commonSettingOptions.isExerciseAndFitnessChecked;
        settings.Common.FHIRResourceStorage = commonSettingOptions.isFHIRResourceStorageChecked;
        settings.Common.Careplans.Default = commonSettingOptions.isDefaultCareplanChecked;
        settings.Common.Careplans.Custom = commonSettingOptions.isCustomCareplanChecked;
        settings.Common.EHIRIntegrations = commonSettingOptions.isEHRIntegrationsChecked;
        settings.Common.ABDMIntegrations = commonSettingOptions.isABDMIntegrationChecked;
        settings.Common.DocumentManagement = commonSettingOptions.isDocumentManagementChecked;

        settings.PatientInterface.GamificationAndAwards = patientAppSettingOptions.isGamificationAndAwardschecked;
        settings.PatientInterface.CoursesAndLearningJourneys = patientAppSettingOptions.isCoursesAndLearningJourneyschecked;
        settings.PatientInterface.CommunityAndUserGroups = patientAppSettingOptions.isCommunityAndUserGroupschecked;
        settings.PatientInterface.AppointmentsAndVisits = patientAppSettingOptions.isAppointmentsAndVisitschecked;
        settings.PatientInterface.DeviceIntegration.Terra = patientAppSettingOptions.isTerrachecked;
        settings.PatientInterface.DeviceIntegration.SenseSemi = patientAppSettingOptions.isSenseSemichecked;
        settings.PatientInterface.PatientReports.Default = patientAppSettingOptions.isDefaultchecked;
        settings.PatientInterface.PatientReports.Custom = patientAppSettingOptions.isCustomchecked;

        settings.ChatBotInterface.FAQ.Default = chatBotSettingOptions.isDefaultchecked;
        settings.ChatBotInterface.FAQ.Custom = chatBotSettingOptions.isCustomchecked;
        settings.ChatBotInterface.Integrations.ClickUp = chatBotSettingOptions.isClickUpchecked;
        settings.ChatBotInterface.QuicksightDashboard = chatBotSettingOptions.isQuicksightDashboardchecked;
        settings.ChatBotInterface.LocalizationSupport = chatBotSettingOptions.isLocalizationSupportchecked;
        settings.ChatBotInterface.WhatsApp = chatBotSettingOptions.isWhatsAppchecked;
        settings.ChatBotInterface.Telegram = chatBotSettingOptions.isTelegramchecked;
        settings.ChatBotInterface.Integrations.Slack = chatBotSettingOptions.isSlackchecked;
        settings.ChatBotInterface.ChatPersonalization = chatBotSettingOptions.isChatPersonlizationchecked;
        settings.ChatBotInterface.CustomUserDBQueries = chatBotSettingOptions.isCustomUserDBQuerieschecked;
        settings.ChatBotInterface.LocationContextualQueries = chatBotSettingOptions.isLocalizationContextualQuerieschecked;

        settings.FormsInterface.Integrations.KoboToolbox = formSettingOptions.iskoboToolboxchecked
        settings.FormsInterface.Integrations.ODK = formSettingOptions.isodkchecked
        settings.FormsInterface.Integrations.GoogleForm = formSettingOptions.isgoogleFormschecked
        settings.FormsInterface.OfflineSupport = formSettingOptions.isofflineSupportchecked
        settings.FormsInterface.FieldApp = formSettingOptions.isfieldAppchecked

        await Create({
            sessionId: data.sessionId,
            tenantId,
            settings
        });
        goto(`/users/${userId}/tenants/${id}/view`)
    }

    async function handleUpdateTenantSettings() {
        console.log('handledUpdateTenantSettings() get called.....');
        const tenantSettingId = data.tenantSettingId;
        const settings = {
        Integrations: {
            PatientInterface: false,
            ChatBotInterface: false,
            FormsInterface: false
        },
        Common: {
            VitalAndLabRecords: false,
            Nutrition:false,
            MedicationManagement:false,
            Reminders:false,
            ScheduledAssesments:false,
            ExcerciseAndFitness:false,
            FHIRResourceStorage:false,
            Careplans: {
                Default:false,
                Custom:false
            },
            EHIRIntegrations:false,
            ABDMIntegrations:false,
            DocumentManagement:false
        },
        PatientInterface: {
            GamificationAndAwards:false,
            CoursesAndLearningJourneys:false,
            CommunityAndUserGroups:false,
            AppointmentsAndVisits:false,
            DeviceIntegration: {
                Terra:false,
                SenseSemi:false
            },
            PatientReports: {
                Default:false,
                Custom:false
            }
        },
        ChatBotInterface: {
            FAQ: {
                Default:false,
               Custom:false
            },
            Integrations: {
                ClickUp:false,
               Slack:false
            },
            WhatsApp:false,
           Telegram:false,
           QuicksightDashboard:false,
           ChatPersonalization:false,
           CustomUserDBQueries:false,
           LocationContextualQueries:false,
           LocalizationSupport:false
        },
        FormsInterface: {
            Integrations: {
                KoboToolbox:false,
                ODK:false,
                GoogleForm:false
            },
            OfflineSupport:false,
            FieldApp:false
        }
    }
        settings.Integrations.PatientInterface = isPatientAppChecked,
        settings.Integrations.ChatBotInterface = isChatbotChecked,
        settings.Integrations.FormsInterface = isFormsChecked,

        settings.Common.VitalAndLabRecords = commonSettingOptions.isVitalsAndLabRecordsChecked;
        settings.Common.Nutrition = commonSettingOptions.isNutritionChecked;
        settings.Common.MedicationManagement = commonSettingOptions.isMedicationManagementChecked;
        settings.Common.Reminders = commonSettingOptions.isRemindersChecked;
        settings.Common.ScheduledAssesments = commonSettingOptions.isScheduledAssessmentsChecked;
        settings.Common.ExcerciseAndFitness = commonSettingOptions.isExerciseAndFitnessChecked;
        settings.Common.FHIRResourceStorage = commonSettingOptions.isFHIRResourceStorageChecked;
        settings.Common.Careplans.Default = commonSettingOptions.isDefaultCareplanChecked;
        settings.Common.Careplans.Custom = commonSettingOptions.isCustomCareplanChecked;
        settings.Common.EHIRIntegrations = commonSettingOptions.isEHRIntegrationsChecked;
        settings.Common.ABDMIntegrations = commonSettingOptions.isABDMIntegrationChecked;
        settings.Common.DocumentManagement = commonSettingOptions.isDocumentManagementChecked;

        if (settings.Integrations.PatientInterface) {
            settings.PatientInterface.GamificationAndAwards = patientAppSettingOptions.isGamificationAndAwardschecked;
            settings.PatientInterface.CoursesAndLearningJourneys = patientAppSettingOptions.isCoursesAndLearningJourneyschecked;
            settings.PatientInterface.CommunityAndUserGroups = patientAppSettingOptions.isCommunityAndUserGroupschecked;
            settings.PatientInterface.AppointmentsAndVisits = patientAppSettingOptions.isAppointmentsAndVisitschecked;
            settings.PatientInterface.DeviceIntegration.Terra = patientAppSettingOptions.isTerrachecked;
            settings.PatientInterface.DeviceIntegration.SenseSemi = patientAppSettingOptions.isSenseSemichecked;
            settings.PatientInterface.PatientReports.Default = patientAppSettingOptions.isDefaultchecked;
            settings.PatientInterface.PatientReports.Custom = patientAppSettingOptions.isCustomchecked;
        }
        
        if (settings.Integrations.ChatBotInterface) {
            settings.ChatBotInterface.FAQ.Default = chatBotSettingOptions.isDefaultchecked;
            settings.ChatBotInterface.FAQ.Custom = chatBotSettingOptions.isCustomchecked;
            settings.ChatBotInterface.Integrations.ClickUp = chatBotSettingOptions.isClickUpchecked;
            settings.ChatBotInterface.QuicksightDashboard = chatBotSettingOptions.isQuicksightDashboardchecked;
            settings.ChatBotInterface.LocalizationSupport = chatBotSettingOptions.isLocalizationSupportchecked;
            settings.ChatBotInterface.WhatsApp = chatBotSettingOptions.isWhatsAppchecked;
            settings.ChatBotInterface.Telegram = chatBotSettingOptions.isTelegramchecked;
            settings.ChatBotInterface.Integrations.Slack = chatBotSettingOptions.isSlackchecked;
            settings.ChatBotInterface.ChatPersonalization = chatBotSettingOptions.isChatPersonlizationchecked;
            settings.ChatBotInterface.CustomUserDBQueries = chatBotSettingOptions.isCustomUserDBQuerieschecked;
            settings.ChatBotInterface.LocationContextualQueries = chatBotSettingOptions.isLocalizationContextualQuerieschecked;
        }

        if (settings.Integrations.FormsInterface) {
            settings.FormsInterface.Integrations.KoboToolbox = formSettingOptions.iskoboToolboxchecked
            settings.FormsInterface.Integrations.ODK = formSettingOptions.isodkchecked
            settings.FormsInterface.Integrations.GoogleForm = formSettingOptions.isgoogleFormschecked
            settings.FormsInterface.OfflineSupport = formSettingOptions.isofflineSupportchecked
            settings.FormsInterface.FieldApp = formSettingOptions.isfieldAppchecked
        }

        console.log('Updated Settings ',settings)
        await Update({
            sessionId: data.sessionId,
            tenantSettingId,
            settings
        });
        goto(`/users/${userId}/tenants/${id}/view`)
    }

    async function Create(model) {
        console.log('Model',model)
		await fetch(`/api/server/tenant-settings/create?userId=${userId}`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}

    async function Update(model) {
        console.log('Model',model)
        if (edit == false) {
            await fetch(`/api/server/tenant-settings/update?userId=${userId}`, {
			method: 'PUT',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
        }
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex w-full flex-wrap justify-end gap-2 mb-2">
    <button class="btn variant-filled-secondary" on:click={() => {
        disabled = false;
        edit = disabled;
    }}>
		<Icon icon="material-symbols:edit-outline" />
		<span>Edit</span>
    </button>
</div>

<div>
{#if initial}
<table contenteditable = "false" class="table">
    <thead class="!variant-soft-secondary">
        <tr>
            <th>Integrations</th>
        </tr>
    </thead>
    <tbody class="!bg-white dark:!bg-inherit flex flex-col w-[1183px]">
        <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
            <td>
              {#if edit === true && isPatientAppChecked === true}
                <span class="tick text-green-500 ml-10">✔</span>
              {:else}
                <input
                    type="checkbox"
                    name="patientApp"
                    disabled = {disabled}
                    bind:checked={isPatientAppChecked}
                    class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                />
              {/if}
               </td>
            <td class="ml-4">Patient App</td>
        </tr>
        <tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
            <td>
                {#if edit === true && isChatbotChecked === true}
                    <span class="tick text-green-500 ml-10">✔</span>
                {:else}
                    <input
                        type="checkbox"
                        name="chatBot"
                        disabled = {disabled}
                        bind:checked={isChatbotChecked}
                        class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                    />
                {/if}
                
            </td>
            <td class="ml-4">Chat bot</td>
        </tr>
        <tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
            <td>
                {#if edit === true && isFormsChecked === true}
                    <span class="tick text-green-500 ml-10">✔</span>
                {:else}
                    <input
                        type="checkbox"
                        name="form"
                        disabled = {disabled}
                        bind:checked={isFormsChecked}
                        class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                    />
                {/if}
                
            </td>
            <td class="ml-4">Forms</td>
        </tr>
    </tbody>
</table>
{/if}

{#if commonSetting}
    <CommonSetting bind:commonSettingOptions {...commonSettingOptions} {edit}  />
{/if}

{#if patientAppSetting}
    <PatientApp bind:patientAppSettingOptions {...patientAppSettingOptions} {edit}/>
{/if}

{#if chatBotSetting}
    <ChatBot bind:chatBotSettingOptions {...chatBotSettingOptions} {edit}/>
{/if}

{#if formSetting}
    <Form bind:formSettingOptions {...formSettingOptions} {edit}/>
{/if}

</div>
    <div class="flex p-2 justify-end">
        <button class="btn variant-filled-secondary" disabled={isPatientAppChecked ? false :(isChatbotChecked ? false :(isFormsChecked ? false :true))} on:click={()=>{
            if (initial === true){
                setIntegrationOptions();
            }
            if (index === -1){
                goToNextSetting(index);
                index += 1;
            }else {
                if (integrations[0]) {
                    goToNextSetting(0);
                    integrations[0] = false;
                    submit -= 1;
                } else if (integrations[1]) {
                    goToNextSetting(1);
                    integrations[1] = false;
                    submit -= 1;
                } else if (integrations[2]) {
                    goToNextSetting(2);
                    integrations[2] = false;
                    submit -= 1;
                }else {
                    if (!createSetting) {
                        handleUpdateTenantSettings()
                    } else {
                        handleCreateTenantSettings()
                    }
                }
            }
        }}>{submit === 0 ? !createSetting ? "Update" : "Submit" : "Next"}</button>
</div>
