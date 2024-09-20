<script lang="ts">
    import { page } from '$app/stores';
    import { invalidateAll } from '$app/navigation';
    import { createEventDispatcher } from 'svelte';
    import Icon from '@iconify/svelte';
    
    const dispatch = createEventDispatcher();
    function handleDownloadReportClick() {
        console.log('Created custom event: downloadReport');
        dispatch('downloadReport', {});
    }
    export let userId = undefined;
    let homeLink = `/users/${userId}/home`;
    let usersLink = `/users/${userId}/home/users-stats`;
    let basicStatsLink = `/users/${userId}/home/analytics-overview`;
    let demographicsLink = `/users/${userId}/home/patient-demographics`;
    let genericLink = `/users/${userId}/home/generic-engagement`;
    let featureLink = `/users/${userId}/home/feature-engagement`;
    // let rhgLink;
    // let botLink;

    let isOpen = false;
    let buttonLabel = 'Download';

    const options = ['JSON', 'Excel', 'PDF'];

    function handleDownloadAnalyticsReportInJSONClick() {
        console.log('Created custom event: downloadAnalyticsJSONReport');
        dispatch('downloadAnalyticsJSONReport',{});
    }

    function handleDownloadAnalyticsReportInExcelClick() {
        console.log('Created custom event: downloadAnalyticsExcelReport');
        dispatch('downloadAnalyticsExcelReport',{});
    }

    function handleDownloadAnalyticsReportInPdfClick() {
        console.log('Created custom event: downloadAnalyticsPdfReport');
        dispatch('downloadAnalyticsPdfReport',{});
    }

    function handleSelect(selectedValue) {
        // This function would handle the selected option
        console.log(`Selected: ${selectedValue}`);
        switch (selectedValue) {
        case 'JSON':
            handleDownloadAnalyticsReportInJSONClick();
            break;
        case 'Excel':
            handleDownloadAnalyticsReportInExcelClick();
            break;
        case 'PDF':
            handleDownloadAnalyticsReportInPdfClick();
            break;
        default:
            // Handle the case where no valid option is selected
            break;
        }
        buttonLabel = 'Download';
        isOpen = false;
   
    }

    function toggleDropdown() {
        isOpen = !isOpen;
    }
</script>

<div class="flex w-full items-center">
    <div class="flex gap-4 flex-grow">
      <a
        class="btn {$page.url.pathname === homeLink ? 'variant-filled-secondary' : 'variant-soft-secondary'}"
        href={homeLink}
      >
        Overall
      </a>
      <a
        class="btn {$page.url.pathname === usersLink ? 'variant-filled-secondary' : 'variant-soft-secondary'}"
        href={usersLink}
      >
        Distribution
      </a>
      <a
        class="btn {$page.url.pathname === basicStatsLink ? 'variant-filled-secondary' : 'variant-soft-secondary'}"
        href={basicStatsLink}
      >
        Basic
      </a>
      <a
        class="btn {$page.url.pathname === demographicsLink ? 'variant-filled-secondary' : 'variant-soft-secondary'}"
        href={demographicsLink}
      >
        Demographics
      </a>
      <a
        class="btn {$page.url.pathname === genericLink ? 'variant-filled-secondary' : 'variant-soft-secondary'}"
        href={genericLink}
      >
        Generic
      </a>
      <a
        class="btn {$page.url.pathname === featureLink ? 'variant-filled-secondary' : 'variant-soft-secondary'}"
        href={featureLink}
      >
        Feature
      </a>
    </div>
    <div class="relative inline-block text-left ml-auto">
      <div>
        <button
          type="button"
          class="inline-flex btn variant-filled-secondary justify-center"
          on:click={toggleDropdown}
        >
          {buttonLabel}
          <Icon
            icon="gridicons:dropdown"
            width="16"
            height="16"
            class="ml-2 -mr-1 h-5 w-5"
          />
        </button>
      </div>
      {#if isOpen}
        <div
          class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div
            class="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {#each options as option}
              <button
                class="block w-full text-center px-4 py-2 text-sm text-primary-500 dark:text-primary-100 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                on:click={() => handleSelect(option)}
              >
                {option}
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>

