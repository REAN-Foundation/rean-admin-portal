<script lang="ts">
    import { page } from '$app/stores';
    import { createEventDispatcher } from 'svelte';
    import Icon from '@iconify/svelte';
    import Icons from '$lib/components/icons.svelte';
    import InfoIcon from '$lib/components/infoIcon.svelte';

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const userId = $page.params.userId;
    const tenantRoute = `/users/${userId}/tenants`;

    export let isTerrachecked = false;
    export let isSenseSemichecked = false;
    export let isExerciseschecked = false;
    export let isNutritionschecked = false;
    export let edit;
    export let patientAppSettingOptions;
    $: console.log('IS EDIT ALLOWED ', edit);

    $: {
        patientAppSettingOptions.isTerrachecked = isTerrachecked;
        patientAppSettingOptions.isSenseSemichecked = isSenseSemichecked;
        patientAppSettingOptions.isExerciseschecked = isExerciseschecked;
        patientAppSettingOptions.isNutritionschecked = isNutritionschecked;
    }

    const infoIconTitles = {
        deviceIntegration: 'Please select the values for device integration if you want to include in your patient app',
        terra: 'Please select the terra if you want to include in your patient app',
        senseSemi: 'Please select the sensesemi if you want to include in your patient app',
        community: 'Please select the community if you want to include in your patient app',
        exercise: 'Please select the exercise if you want to include in your patient app',
        nutrition: 'Please select the nutrition if you want to include in your patient app'
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
                    Patient App
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
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700 w-full">
                <div class="flex">
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 w-14 ml-2 md:ml-10 lg:ml-10"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/patient-app/device.svg#icon"
                    />
                    <td class="flex-initial md:w-40 lg:w-40 ml-2 md:ml-10 lg:ml-10">Device Integration</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.deviceIntegration}
                    />
                </div>
                <div class="flex">
                    <div class="flex-none mt-3 w-20 md:w-32 lg:w-32">
                        {#if edit === true && isTerrachecked === true}
                            <span class="tick text-green-500 ml-[50px] md:ml-[93px] lg:ml-[93px]">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="terra"
                                disabled={edit}
                                bind:checked={isTerrachecked}
                                class="ml-[50px] md:ml-[93px] lg:ml-[93px] checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                    </div>
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 flex-initial w-14"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/patient-app/terra.svg#icon"
                    />
                    <td class="flex-initial w-32">Terra</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.terra}
                    />
                </div>
                <div class="flex">
                    <div class="flex-none mt-3 w-20 md:w-32 lg:w-32">
                        {#if edit === true && isSenseSemichecked === true}
                            <span class="tick text-green-500 ml-[50px] md:ml-[93px] lg:ml-[93px]">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="senseSemi"
                                disabled={edit}
                                bind:checked={isSenseSemichecked}
                                class="ml-[50px] md:ml-[93px] lg:ml-[93px] checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                    </div>
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 ml-2 flex-initial w-14"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/patient-app/black.svg#icon"
                    />
                    <td class="flex-initial w-32">SenseSemi</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.senseSemi}
                    />
                </div>
                <hr class="!border-b-secondary-100 dark:!border-b-surface-700" />
                <div class="flex">
                    <div class="flex-none mt-3 w-10 md:w-24 lg:w-24">
                        {#if edit === true && isExerciseschecked === true}
                            <span class="tick text-green-500 ml-6 md:ml-14 lg:ml-14">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="exercise"
                                disabled={edit}
                                bind:checked={isExerciseschecked}
                                class="ml-6 md:ml-14 lg:ml-14 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                    </div>
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 flex-initial ml-4 w-14 md:ml-[-5px]"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/patient-app/exercise.svg#icon"
                    />
                    <td class="flex-initial w-24 md:w-28 lg:w-28 ml-3 md:ml-[-10px]">Exercise</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.exercise}
                    />
                </div>
                <hr class="!border-b-secondary-100 dark:!border-b-surface-700" />
                <div class="flex">
                    <div class="flex-none mt-3 w-10 md:w-24 lg:w-24">
                        {#if edit === true && isNutritionschecked === true}
                            <span class="tick text-green-500 ml-6 md:ml-14 lg:ml-14">✔</span>
                        {:else}
                            <input
                                type="checkbox"
                                name="nutrition"
                                disabled={edit}
                                bind:checked={isNutritionschecked}
                                class="ml-6 md:ml-14 lg:ml-14 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                            />
                        {/if}
                    </div>
                    <Icons
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 fill-none mt-4 flex-initial ml-4 w-14 md:ml-[-5px]"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/patient-app/nutrition.svg#icon"
                    />
                    <td class="flex-initial w-24 md:w-28 lg:w-28 ml-3 md:ml-[-10px]">Nutrition</td>
                    <InfoIcon
                        cls="stroke-slate-800 dark:!stroke-surface-100 stroke-2 cursor-pointer fill-none mt-4"
                        h="100%"
                        w="100%"
                        iconPath="/tenant-setting/info.svg#icon"
                        title={infoIconTitles.nutrition}
                    />
                </div></tr
            ></tbody
        >
    </table>
</form>
