<script lang="ts">
    import { page } from '$app/stores';
    import Icon from '@iconify/svelte';
    import Icons from '$lib/components/icons.svelte';
    import InfoIcon from '$lib/components/infoIcon.svelte';
    import type { Common } from '$lib/types/tenant.settings.types';

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const userId = $page.params.userId;
    const tenantRoute = `/users/${userId}/tenants`;

    export let isVitalsChecked;
    export let isLabRecordsChecked;
    export let isSymptomsChecked;
    export let isDrugManagementsChecked;
    export let isMedicationsChecked;
    export let isCareplansChecked;

    export let isAssessmentsChecked;

    export let isFhirStoragesChecked;

    export let isEHRIntegrationsChecked;
    
    export let isABDMIntegrationsChecked;
    export let isHospitalSystemsChecked;
    export let isGamificationsChecked;
    export let isLearningJourneysChecked;
    export let isCommunityChecked;
    export let isPatientSelfServicePortalsChecked;
    export let isPatientStatusReportsChecked;
    export let isDocumentManagementsChecked;
    export let isAppointmentRemindersChecked;
    export let isOrganizationsChecked;
    export let isCohortsChecked;
    export let isNotificationsChecked;
    export let isNewsfeedsChecked;
    export let isNoticesChecked;
    export let isCustomQueriesChecked;

    export let isQuicksightsChecked;

    export let edit;
    export let commonSettingOptions;


    $: {
        commonSettingOptions.isVitalsChecked = isVitalsChecked;
        commonSettingOptions.isLabRecordsChecked = isLabRecordsChecked;
        commonSettingOptions.isSymptomsChecked = isSymptomsChecked;
        commonSettingOptions.isDrugManagementsChecked = isDrugManagementsChecked;
        commonSettingOptions.isMedicationsChecked = isMedicationsChecked;
        commonSettingOptions.isCareplansChecked = isCareplansChecked;
        commonSettingOptions.isAssessmentsChecked = isAssessmentsChecked;

        commonSettingOptions.isFhirStoragesChecked = isFhirStoragesChecked;
        commonSettingOptions.isEHRIntegrationsChecked = isEHRIntegrationsChecked;
        commonSettingOptions.isABDMIntegrationsChecked = isABDMIntegrationsChecked;
        
        commonSettingOptions.isHospitalSystemsChecked = isHospitalSystemsChecked;
        commonSettingOptions.isGamificationsChecked = isGamificationsChecked;
        commonSettingOptions.isLearningJourneysChecked = isLearningJourneysChecked;
        commonSettingOptions.isCommunityChecked = isCommunityChecked;
        commonSettingOptions.isPatientSelfServicePortalsChecked = isPatientSelfServicePortalsChecked;
        commonSettingOptions.isPatientStatusReportsChecked = isPatientStatusReportsChecked;
        commonSettingOptions.isDocumentManagementsChecked = isDocumentManagementsChecked;
        commonSettingOptions.isAppointmentRemindersChecked = isAppointmentRemindersChecked;
        commonSettingOptions.isOrganizationsChecked = isOrganizationsChecked;
        commonSettingOptions.isCohortsChecked = isCohortsChecked;
        commonSettingOptions.isNotificationsChecked = isNotificationsChecked;
        commonSettingOptions.isNewsfeedsChecked = isNewsfeedsChecked;
        commonSettingOptions.isNoticesChecked = isNoticesChecked;
        commonSettingOptions.isCustomQueriesChecked = isCustomQueriesChecked;
        commonSettingOptions.isQuicksightsChecked = isQuicksightsChecked;
    }

    const infoIconTitles = {
        clinical: 'Please select the values for clinical if you want to include in your common setting',
        vital: 'Please select the vitals if you want to include in your common setting',
        labRecord: 'Please select the lab record if you want to include in your common setting',
        symptom: 'Please select the symptoms if you want to include in your common setting',
        drugManagement: 'Please select the drug management if you want to include in your common setting',
        medication: 'Please select the medications if you want to include in your common setting',
        careplan: 'Please select the careplan if you want to include in your common setting',
        assessment: 'Please select the assessment if you want to include in your common setting',
        external: 'Please select the values for external if you want to include in your common setting',
        fhirStorage: 'Please select the fhir storage if you want to include in your common setting',
        ehrIntegration: 'Please select the ehr integration if you want to include in your common setting',
        abdmIntegration: 'Please select the abdm integration if you want to include in your common setting',
        addons: 'Please select the values for addons if you want to include in your common setting',
        gamification: 'Please select the gamification if you want to include in your common setting',
        learningJourney: 'Please select the learning journey if you want to include in your common setting',
        community: 'Please select the community if you want to include in your common setting',
        patientSelfServicePortal:
            'Please select the patient self service portal if you want to include in your common setting',
        hospitalSystem: 'Please select the hospital systems if you want to include in your common setting',
        patientStatusReport: 'Please select the patient status reports if you want to include in your common setting',
        appointmentReminder: 'Please select the appointment reminder if you want to include in your common setting',
        documentManagement: 'Please select the document management if you want to include in your common setting',
        organization: 'Please select the organization if you want to include in your common setting',
        cohort: 'Please select the cohorts if you want to include in your common setting',
        notification: 'Please select the notifications if you want to include in your common setting',
        newsfeed: 'Please select the newsfeeds if you want to include in your common setting',
        notice: 'Please select the notices if you want to include in your common setting',
        analysisSettings:
            'Please select the values for analysis settings if you want to include in your common setting',
        customQuery: 'Please select the custom query if you want to include in your common setting',
        quickSight: 'Please select the quicksight if you want to include in your common setting'
    };
</script>

<form
    method="post"
    class="bg-white table-container my-0 border border-secondary-100 dark:!border-surface-700 overflow-x-auto"
>
    <table class="table">
        <thead class="!variant-soft-secondary">
            <tr>
                <th class="flex items-center">
                    Common Setting
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
        <tbody class="!bg-white dark:!bg-inherit">
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <div class="flex">
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 w-14 ml-0 sm:ml-2 md:ml-5 lg:ml-10"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/common-setting/clinical.svg#icon"
                    />
                    <td class="flex-initial w-32 md:w-32 lg:w-40 ml-0 sm:ml-2 md:ml-5 lg:ml-10">Clinical</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.clinical}
                    />
                </div>
                <div>
                    <div class="flex sm:flex-col flex-col md:flex-col lg:flex-row">
                        <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                            {#if edit === true && isVitalsChecked === true}
                                <span class="tick text-green-500 mt-4">✔</span>
                            {:else}
                                <input
                                    type="checkbox"
                                    name="vitals"
                                    disabled={edit}
                                    bind:checked={isVitalsChecked}
                                    class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                />
                            {/if}
                            <Icons
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/common-setting/vitals.svg#icon"
                            />
                            <td class="ml-5 w-48 md:w-40 lg:w-32">Vitals</td>
                            <InfoIcon
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/info.svg#icon"
                                title={infoIconTitles.vital}
                            />
                        </div>
                        <div class="flex flex-row ml-10 sm:ml-16 md:ml-16 lg:ml-7 xl:ml-24">
                            {#if edit === true && isLabRecordsChecked === true}
                                <span class="tick text-green-500 mt-4">✔</span>
                            {:else}
                                <input
                                    type="checkbox"
                                    name="labRecords"
                                    disabled={edit}
                                    bind:checked={isLabRecordsChecked}
                                    class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                />
                            {/if}
                            <Icons
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/common-setting/records.svg#icon"
                            />
                            <td class="ml-5 w-48 md:w-40 lg:w-40">Lab Records</td>
                            <InfoIcon
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/info.svg#icon"
                                title={infoIconTitles.labRecord}
                            />
                        </div>
                    </div>
                    <div class="flex sm:flex-col flex-col md:flex-col lg:flex-row">
                        <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                            {#if edit === true && isSymptomsChecked === true}
                                <span class="tick text-green-500 mt-4">✔</span>
                            {:else}
                                <input
                                    type="checkbox"
                                    name="symptoms"
                                    disabled={edit}
                                    bind:checked={isSymptomsChecked}
                                    class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                />
                            {/if}
                            <Icons
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/common-setting/symptom.svg#icon"
                            />
                            <td class="ml-5 w-48 md:w-40 lg:w-32">Symptoms</td>
                            <InfoIcon
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/info.svg#icon"
                                title={infoIconTitles.symptom}
                            />
                        </div>
                        <div class="flex flex-row ml-10 sm:ml-16 md:ml-16 lg:ml-7 xl:ml-24">
                            {#if edit === true && isDrugManagementsChecked === true}
                                <span class="tick text-green-500 mt-4">✔</span>
                            {:else}
                                <input
                                    type="checkbox"
                                    name="drugManagements"
                                    disabled={edit}
                                    bind:checked={isDrugManagementsChecked}
                                    class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                />
                            {/if}
                            <Icons
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/common-setting/drug.svg#icon"
                            />
                            <td class="ml-5 w-48 md:w-40 lg:w-40">Drug Management</td>
                            <InfoIcon
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/info.svg#icon"
                                title={infoIconTitles.drugManagement}
                            />
                        </div>
                    </div>
                    <div class="flex sm:flex-col flex-col md:flex-col lg:flex-row">
                        <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                            {#if edit === true && isMedicationsChecked === true}
                                <span class="tick text-green-500 mt-4">✔</span>
                            {:else}
                                <input
                                    type="checkbox"
                                    name="medications"
                                    disabled={edit}
                                    bind:checked={isMedicationsChecked}
                                    class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                />
                            {/if}
                            <Icons
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/common-setting/medication.svg#icon"
                            />
                            <td class="ml-5 w-48 md:w-40 lg:w-32">Medications</td>
                            <InfoIcon
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/info.svg#icon"
                                title={infoIconTitles.medication}
                            />
                        </div>
                        <div class="flex flex-row ml-10 sm:ml-16 md:ml-16 lg:ml-7 xl:ml-24">
                            {#if edit === true && isAssessmentsChecked === true}
                                <span class="tick text-green-500 mt-4">✔</span>
                            {:else}
                                <input
                                    type="checkbox"
                                    name="assessments"
                                    disabled={edit}
                                    bind:checked={isAssessmentsChecked}
                                    class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                />
                            {/if}
                            <Icons
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/common-setting/assessment.svg#icon"
                            />
                            <td class="ml-5 w-48 md:w-40 lg:w-40">Assessments</td>
                            <InfoIcon
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/info.svg#icon"
                                title={infoIconTitles.assessment}
                            />
                        </div>
                    </div>
                    <div class="flex sm:flex-col flex-col md:flex-row lg:flex-row">
                        <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                            {#if edit === true && isCareplansChecked === true}
                                <span class="tick text-green-500 mt-4">✔</span>
                            {:else}
                                <input
                                    type="checkbox"
                                    name="careplans"
                                    disabled={edit}
                                    bind:checked={isCareplansChecked}
                                    class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                />
                            {/if}
                            <Icons
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/common-setting/careplan.svg#icon"
                            />
                            <td class="ml-5 w-48 md:w-40 lg:w-32">Careplans</td>
                            <InfoIcon
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/info.svg#icon"
                                title={infoIconTitles.careplan}
                            />
                        </div>
                    </div>
                    <hr class=" !border-b-secondary-100 dark:!border-b-surface-700" />
                    <div class="flex">
                        <Icons
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 w-14 ml-0 sm:ml-2 md:ml-5 lg:ml-10"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/common-setting/external.svg#icon"
                        />
                        <td class="flex-initial w-32 md:w-32 lg:w-40 ml-0 sm:ml-2 md:ml-5 lg:ml-10">External</td>
                        <InfoIcon
                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                            h="100%"
                            w="100%"
                            iconPath="/tenant-setting/info.svg#icon"
                            title={infoIconTitles.external}
                        />
                    </div>
                    <div>
                        <div class="flex sm:flex-col flex-col md:flex-col lg:flex-row">
                            <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                {#if edit === true && isEHRIntegrationsChecked === true}
                                    <span class="tick text-green-500 mt-4">✔</span>
                                {:else}
                                    <input
                                        type="checkbox"
                                        name="ehrIntegrations"
                                        disabled={edit}
                                        bind:checked={isEHRIntegrationsChecked}
                                        class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                    />
                                {/if}
                                <Icons
                                    cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                    h="100%"
                                    w="100%"
                                    iconPath="/tenant-setting/common-setting/ehr.svg#icon"
                                />
                                <td class="ml-5 w-48 md:w-40 lg:w-[145px]">EHIR Integration</td>
                                <InfoIcon
                                    cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                    h="100%"
                                    w="100%"
                                    iconPath="/tenant-setting/info.svg#icon"
                                    title={infoIconTitles.ehrIntegration}
                                />
                            </div>
                            <div class="flex flex-row ml-10 sm:ml-16 md:ml-16 lg:ml-4 xl:ml-24">
                                {#if edit === true && isABDMIntegrationsChecked === true}
                                    <span class="tick text-green-500 mt-4">✔</span>
                                {:else}
                                    <input
                                        type="checkbox"
                                        name="abdmIntegrations"
                                        disabled={edit}
                                        bind:checked={isABDMIntegrationsChecked}
                                        class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                    />
                                {/if}
                                <Icons
                                    cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                    h="100%"
                                    w="100%"
                                    iconPath="/tenant-setting/common-setting/abdm.svg#icon"
                                />
                                <td class="ml-5 w-48 md:w-40 lg:w-[155px]">ABDM Integration</td>
                                <InfoIcon
                                    cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                    h="100%"
                                    w="100%"
                                    iconPath="/tenant-setting/info.svg#icon"
                                    title={infoIconTitles.abdmIntegration}
                                />
                            </div>
                        </div>
                        <div class="flex sm:flex-col flex-col md:flex-row lg:flex-row">
                            <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                {#if edit === true && isFhirStoragesChecked === true}
                                    <span class="tick text-green-500 mt-4">✔</span>
                                {:else}
                                    <input
                                        type="checkbox"
                                        name="fhirStorages"
                                        disabled={edit}
                                        bind:checked={isFhirStoragesChecked}
                                        class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                    />
                                {/if}
                                <Icons
                                    cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                    h="100%"
                                    w="100%"
                                    iconPath="/tenant-setting/common-setting/fhir.svg#icon"
                                />
                                <td class="ml-5 w-48 md:w-40 lg:w-[145px]">FHIR Storage</td>
                                <InfoIcon
                                    cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer mt-4"
                                    h="100%"
                                    w="100%"
                                    iconPath="/tenant-setting/info.svg#icon"
                                    title={infoIconTitles.fhirStorage}
                                />
                            </div>
                        </div>
                        <hr class=" !border-b-secondary-100 dark:!border-b-surface-700" />
                        <div class="flex">
                            <Icons
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 w-14 ml-0 sm:ml-2 md:ml-5 lg:ml-10"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/common-setting/add.svg#icon"
                            />
                            <td class="flex-initial w-32 md:w-32 lg:w-40 ml-0 sm:ml-2 md:ml-5 lg:ml-10">AddOns</td>
                            <InfoIcon
                                cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                h="100%"
                                w="100%"
                                iconPath="/tenant-setting/info.svg#icon"
                                title={infoIconTitles.addons}
                            />
                        </div>
                        <div>
                            <div class="flex sm:flex-col flex-col md:flex-col lg:flex-row">
                                <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                    {#if edit === true && isGamificationsChecked === true}
                                        <span class="tick text-green-500 mt-4">✔</span>
                                    {:else}
                                        <input
                                            type="checkbox"
                                            name="gamifications"
                                            disabled={edit}
                                            bind:checked={isGamificationsChecked}
                                            class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                        />
                                    {/if}
                                    <Icons
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-5"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/common-setting/gamification.svg#icon"
                                    />
                                    <td class="ml-5 w-48 md:w-48 lg:w-[147px]">Gamification</td>
                                    <InfoIcon
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/info.svg#icon"
                                        title={infoIconTitles.gamification}
                                    />
                                </div>
                                <div class="flex flex-row ml-10 sm:ml-16 md:ml-16 lg:ml-7 xl:ml-24">
                                    {#if edit === true && isCohortsChecked === true}
                                        <span class="tick text-green-500 mt-4">✔</span>
                                    {:else}
                                        <input
                                            type="checkbox"
                                            name="learningJourneys"
                                            disabled={edit}
                                            bind:checked={isCohortsChecked}
                                            class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                        />
                                    {/if}
                                    <Icons
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/common-setting/cohort.svg#icon"
                                    />
                                    <td class="ml-5 w-48 md:w-48 lg:w-52">Cohorts</td>
                                    <InfoIcon
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/info.svg#icon"
                                        title={infoIconTitles.cohort}
                                    />
                                </div>
                            </div>
                            <div class="flex sm:flex-col flex-col md:flex-col lg:flex-row">
                                <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                    {#if edit === true && isCommunityChecked === true}
                                        <span class="tick text-green-500 mt-4">✔</span>
                                    {:else}
                                        <input
                                            type="checkbox"
                                            name="community"
                                            disabled={edit}
                                            bind:checked={isCommunityChecked}
                                            class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                        />
                                    {/if}
                                    <Icons
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/common-setting/community.svg#icon"
                                    />
                                    <td class="ml-5 w-48 md:w-48 lg:w-[147px]">Community</td>
                                    <InfoIcon
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/info.svg#icon"
                                        title={infoIconTitles.community}
                                    />
                                </div>
                                <div class="flex flex-row ml-10 sm:ml-16 md:ml-16 lg:ml-7 xl:ml-24">
                                    {#if edit === true && isPatientSelfServicePortalsChecked === true}
                                        <span class="tick text-green-500 mt-4">✔</span>
                                    {:else}
                                        <input
                                            type="checkbox"
                                            name="patientSelfServicePortals"
                                            disabled={edit}
                                            bind:checked={isPatientSelfServicePortalsChecked}
                                            class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                        />
                                    {/if}

                                    <Icons
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/common-setting/patient_self_service.svg#icon"
                                    />
                                    <td class="ml-5 w-48 md:w-48 lg:w-52">Patient Self Service Portal</td>
                                    <InfoIcon
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/info.svg#icon"
                                        title={infoIconTitles.patientSelfServicePortal}
                                    />
                                </div>
                            </div>
                            <div class="flex sm:flex-col flex-col md:flex-col lg:flex-row">
                                <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                    {#if edit === true && isHospitalSystemsChecked === true}
                                        <span class="tick text-green-500 mt-4">✔</span>
                                    {:else}
                                        <input
                                            type="checkbox"
                                            name="hospitalSystems"
                                            disabled={edit}
                                            bind:checked={isHospitalSystemsChecked}
                                            class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                        />
                                    {/if}
                                    <Icons
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/common-setting/hospital.svg#icon"
                                    />
                                    <td class="ml-5 w-48 md:w-48 lg:w-[147px]">Hospital Systems</td>
                                    <InfoIcon
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/info.svg#icon"
                                        title={infoIconTitles.hospitalSystem}
                                    />
                                </div>
                                <div class="flex flex-row ml-10 sm:ml-16 md:ml-16 lg:ml-7 xl:ml-24">
                                    {#if edit === true && isPatientStatusReportsChecked === true}
                                        <span class="tick text-green-500 mt-4">✔</span>
                                    {:else}
                                        <input
                                            type="checkbox"
                                            name="patientStatusReports"
                                            disabled={edit}
                                            bind:checked={isPatientStatusReportsChecked}
                                            class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                        />
                                    {/if}
                                    <Icons
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/common-setting/report.svg#icon"
                                    />
                                    <td class="ml-5 w-48 md:w-48 lg:w-52">Patient Status Reports</td>
                                    <InfoIcon
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/info.svg#icon"
                                        title={infoIconTitles.patientStatusReport}
                                    />
                                </div>
                            </div>
                            <div class="flex sm:flex-col flex-col md:flex-col lg:flex-row">
                                <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                    {#if edit === true && isLearningJourneysChecked === true}
                                        <span class="tick text-green-500 mt-4">✔</span>
                                    {:else}
                                        <input
                                            type="checkbox"
                                            name="cohorts"
                                            disabled={edit}
                                            bind:checked={isLearningJourneysChecked}
                                            class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                        />
                                    {/if}
                                    <Icons
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/common-setting/learning.svg#icon"
                                    />
                                    <td class="ml-5 w-48 md:w-48 lg:w-[147px]">Learning Journey</td>
                                    <InfoIcon
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/info.svg#icon"
                                        title={infoIconTitles.learningJourney}
                                    />
                                </div>
                                <div class="flex flex-row ml-10 sm:ml-16 md:ml-16 lg:ml-7 xl:ml-24">
                                    {#if edit === true && isAppointmentRemindersChecked === true}
                                        <span class="tick text-green-500 mt-4">✔</span>
                                    {:else}
                                        <input
                                            type="checkbox"
                                            name="appointmentReminders"
                                            disabled={edit}
                                            bind:checked={isAppointmentRemindersChecked}
                                            class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                        />
                                    {/if}
                                    <Icons
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/common-setting/reminder.svg#icon"
                                    />
                                    <td class="ml-5 w-48 md:w-48 lg:w-52">Appointment Reminders</td>
                                    <InfoIcon
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/info.svg#icon"
                                        title={infoIconTitles.appointmentReminder}
                                    />
                                </div>
                            </div>
                            <div class="flex sm:flex-col flex-col md:flex-col lg:flex-row">
                                <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                    {#if edit === true && isOrganizationsChecked === true}
                                        <span class="tick text-green-500 mt-4">✔</span>
                                    {:else}
                                        <input
                                            type="checkbox"
                                            name="organizations"
                                            disabled={edit}
                                            bind:checked={isOrganizationsChecked}
                                            class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                        />
                                    {/if}
                                    <Icons
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-3 ml-6"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/common-setting/organization.svg#icon"
                                    />
                                    <td class="ml-5 w-48 md:w-48 lg:w-[147px]">Organizations</td>
                                    <InfoIcon
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/info.svg#icon"
                                        title={infoIconTitles.organization}
                                    />
                                </div>
                                <div class="flex flex-row ml-10 sm:ml-16 md:ml-16 lg:ml-7 xl:ml-24">
                                    {#if edit === true && isDocumentManagementsChecked === true}
                                        <span class="tick text-green-500 mt-4">✔</span>
                                    {:else}
                                        <input
                                            type="checkbox"
                                            name="documentManagement"
                                            disabled={edit}
                                            bind:checked={isDocumentManagementsChecked}
                                            class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                        />
                                    {/if}
                                    <Icons
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/common-setting/document.svg#icon"
                                    />
                                    <td class="ml-5 w-48 md:w-48 lg:w-52">Documents Management</td>
                                    <InfoIcon
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/info.svg#icon"
                                        title={infoIconTitles.documentManagement}
                                    />
                                </div>
                            </div>
                            <div class="flex sm:flex-col flex-col md:flex-col lg:flex-row">
                                <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                    {#if edit === true && isNotificationsChecked === true}
                                        <span class="tick text-green-500 mt-4">✔</span>
                                    {:else}
                                        <input
                                            type="checkbox"
                                            name="notifications"
                                            disabled={edit}
                                            bind:checked={isNotificationsChecked}
                                            class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                        />
                                    {/if}
                                    <Icons
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/common-setting/notification.svg#icon"
                                    />
                                    <td class="ml-5 w-48 md:w-48 lg:w-[147px]">Notifications</td>
                                    <InfoIcon
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/info.svg#icon"
                                        title={infoIconTitles.notification}
                                    />
                                </div>
                                <div class="flex flex-row ml-10 sm:ml-16 md:ml-16 lg:ml-7 xl:ml-24">
                                    {#if edit === true && isNewsfeedsChecked === true}
                                        <span class="tick text-green-500 mt-4">✔</span>
                                    {:else}
                                        <input
                                            type="checkbox"
                                            name="newsfeeds"
                                            disabled={edit}
                                            bind:checked={isNewsfeedsChecked}
                                            class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                        />
                                    {/if}
                                    <Icons
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/common-setting/newsfeed.svg#icon"
                                    />
                                    <td class="ml-5 w-48 md:w-48 lg:w-52">Newsfeeds</td>
                                    <InfoIcon
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/info.svg#icon"
                                        title={infoIconTitles.newsfeed}
                                    />
                                </div>
                            </div>
                            <div class="flex sm:flex-col flex-col md:flex-col lg:flex-row">
                                <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                    {#if edit === true && isNoticesChecked === true}
                                        <span class="tick text-green-500 mt-4">✔</span>
                                    {:else}
                                        <input
                                            type="checkbox"
                                            name="notices"
                                            disabled={edit}
                                            bind:checked={isNoticesChecked}
                                            class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                        />
                                    {/if}
                                    <Icons
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/common-setting/notice.svg#icon"
                                    />
                                    <td class="ml-5 w-48 md:w-48 lg:w-[147px]">Notices</td>
                                    <InfoIcon
                                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                        h="100%"
                                        w="100%"
                                        iconPath="/tenant-setting/info.svg#icon"
                                        title={infoIconTitles.notice}
                                    />
                                </div>
                            </div>
                            <hr class=" !border-b-secondary-100 dark:!border-b-surface-700" />
                            <div class="flex">
                                <Icons
                                    cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 w-14 ml-0 sm:ml-2 md:ml-5 lg:ml-10"
                                    h="100%"
                                    w="100%"
                                    iconPath="/tenant-setting/common-setting/analysis.svg#icon"
                                />
                                <td class="flex-initial w-32 md:w-32 lg:w-40 ml-0 sm:ml-2 md:ml-5 lg:ml-10"
                                    >Analysis Settings</td
                                >
                                <InfoIcon
                                    cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                    h="100%"
                                    w="100%"
                                    iconPath="/tenant-setting/info.svg#icon"
                                    title={infoIconTitles.analysisSettings}
                                />
                            </div>
                            <div>
                                <div class="flex sm:flex-col flex-col md:flex-col lg:flex-row">
                                    <div class="flex flex-row ml-10 sm:ml-16 md:ml-15 lg:ml-24">
                                        {#if edit === true && isCustomQueriesChecked === true}
                                            <span class="tick text-green-500 mt-4">✔</span>
                                        {:else}
                                            <input
                                                type="checkbox"
                                                name="customQueries"
                                                disabled={edit}
                                                bind:checked={isCustomQueriesChecked}
                                                class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                            />
                                        {/if}
                                        <Icons
                                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                            h="100%"
                                            w="100%"
                                            iconPath="/tenant-setting/common-setting/custom.svg#icon"
                                        />
                                        <td class="ml-5 w-48 md:w-40 lg:w-[147px]">Custom Queries</td>
                                        <InfoIcon
                                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                            h="100%"
                                            w="100%"
                                            iconPath="/tenant-setting/info.svg#icon"
                                            title={infoIconTitles.customQuery}
                                        />
                                    </div>
                                    <div class="flex flex-row ml-10 sm:ml-16 md:ml-16 lg:ml-7 xl:ml-24">
                                        {#if edit === true && isQuicksightsChecked === true}
                                            <span class="tick text-green-500 mt-4">✔</span>
                                        {:else}
                                            <input
                                                type="checkbox"
                                                name="quicksights"
                                                disabled={edit}
                                                bind:checked={isQuicksightsChecked}
                                                class="mt-4 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                                            />
                                        {/if}
                                        <Icons
                                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-6"
                                            h="100%"
                                            w="100%"
                                            iconPath="/tenant-setting/common-setting/quicksight.svg#icon"
                                        />
                                        <td class="ml-5 w-48 md:w-40 lg:w-32">Quicksight</td>
                                        <InfoIcon
                                            cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                                            h="100%"
                                            w="100%"
                                            iconPath="/tenant-setting/info.svg#icon"
                                            title={infoIconTitles.quickSight}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></tr
            >
        </tbody>
    </table>
</form>
