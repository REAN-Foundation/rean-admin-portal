<script lang="ts">
    import { page } from '$app/stores';
    import Icon from '@iconify/svelte';
    import Icons from '$lib/components/icons.svelte';
    import InfoIcon from '$lib/components/infoIcon.svelte';

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const userId = $page.params.userId;
    const tenantRoute = `/users/${userId}/tenants`;

    export let iskoboToolboxchecked = false;
    export let isodkchecked = false;
    export let isgoogleFormschecked = false;
    export let isofflineSupportchecked = false;
    export let isfieldAppchecked = false;
    export let edit;
    export let formSettingOptions;

    $: {
        formSettingOptions.iskoboToolboxchecked = iskoboToolboxchecked;
        formSettingOptions.isgoogleFormschecked = isgoogleFormschecked;
        formSettingOptions.isodkchecked = isodkchecked;
        formSettingOptions.isofflineSupportchecked = isofflineSupportchecked;
        formSettingOptions.isfieldAppchecked = isfieldAppchecked;
    }

    const infoIconTitles = {
        integration: 'Please select the integration if you want to include in your form',
        koboToolbox: 'Please select the koboToolbox if you want to include in your form',
        odk: 'Please select the ODK if you want to include in your form',
        googleForms: 'Please select the google forms if you want to include in your form',
        offlineSupport: 'Please select the offline support if you want to include in your form',
        fieldApp: 'Please select the field app if you want to include in your form'
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
                    Forms
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
            <tr class="!border-b !border-b-secondary-100 justify-start dark:!border-b-surface-700 w-full">
                <div class="flex">
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 w-14 ml-2 md:ml-10 lg:ml-10"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/form/integration.svg#icon"
                    />
                    <td class="flex-initial md:w-40 lg:w-40 ml-2 md:ml-10 lg:ml-10">Integrations</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.integration}
                    />
                </div>
                <div class="flex">
                    <div class="flex-none mt-3 w-20 md:w-32 lg:w-32">
                        {#if edit === true && iskoboToolboxchecked === true}
                            <span class="tick text-green-500 ml-[50px] md:ml-[93px] lg:ml-[93px]">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="koboToolbox"
                                value="koboToolbox"
                                disabled={edit}
                                bind:checked={iskoboToolboxchecked}
                                class="ml-[50px] md:ml-[93px] lg:ml-[93px] checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                    </div>
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none flex-initial mt-4 w-14"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/form/kobotoolbox.svg#icon"
                    />
                    <td class="flex-initial w-40">Kobo Toolbox</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.koboToolbox}
                    />
                </div>
                <div class="flex">
                    <div class="flex-none mt-3 w-20 md:w-32 lg:w-32">
                        {#if edit === true && isodkchecked === true}
                            <span class="tick text-green-500 ml-[50px] md:ml-[93px] lg:ml-[93px]">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="odk"
                                disabled={edit}
                                bind:checked={isodkchecked}
                                class="ml-[50px] md:ml-[93px] lg:ml-[93px] checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                    </div>
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-1 mt-4 flex-initial w-14"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/form/odk.svg#icon"
                    />
                    <td class="flex-initial w-40">ODK</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.odk}
                    />
                </div>
                <div class="flex">
                    <div class="flex-none mt-3 w-20 md:w-32 lg:w-32">
                        {#if edit === true && isgoogleFormschecked === true}
                            <span class="tick text-green-500 ml-[50px] md:ml-[93px] lg:ml-[93px]">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="googleForms"
                                disabled={edit}
                                bind:checked={isgoogleFormschecked}
                                class="ml-[50px] md:ml-[93px] lg:ml-[93px] checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                    </div>
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 flex-initial w-14"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/form/form.svg#icon"
                    />
                    <td class="flex-initial w-40">Google Forms</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.googleForms}
                    />
                </div>
                <hr class="!border-b-secondary-100 dark:!border-b-surface-700" />
                <div class="flex">
                    <div class="flex-none mt-3 w-10 md:w-24 lg:w-24">
                        {#if edit === true && isofflineSupportchecked === true}
                            <span class="tick text-green-500 ml-6 md:ml-14 lg:ml-14">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="offlineSupport"
                                disabled={edit}
                                bind:checked={isofflineSupportchecked}
                                class="ml-6 md:ml-14 lg:ml-14 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                    </div>
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 flex-initial ml-4 w-14 md:ml-[-5px]"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/form/offline.svg#icon"
                    />
                    <td class="flex-initial w-36 md:w-40 lg:w-40 ml-3 md:ml-[-10px]">Offline Support</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.offlineSupport}
                    />
                </div>
                <hr class="!border-b-secondary-100 dark:!border-b-surface-700" />
                <div class="flex">
                    <div class="flex-none mt-3 w-10 md:w-24 lg:w-24">
                        {#if edit === true && isfieldAppchecked === true}
                            <span class="tick text-green-500 ml-6 md:ml-14 lg:ml-14">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="fieldApp"
                                disabled={edit}
                                bind:checked={isfieldAppchecked}
                                class="ml-6 md:ml-14 lg:ml-14 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                    </div>
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 flex-initial ml-4 w-14 md:ml-[-5px]"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/form/field_app.svg#icon"
                    />
                    <td class="flex-initial w-36 md:w-40 lg:w-40 ml-3 md:ml-[-10px]">Field App</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.fieldApp}
                    />
                </div>
            </tr>
        </tbody>
    </table>
</form>
