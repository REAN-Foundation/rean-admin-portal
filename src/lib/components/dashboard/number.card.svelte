<script lang="ts">
    export let cardTitle: string;
    export let cardContent: string;
    export let additional: string = undefined;
    export let prefix: string = undefined;
</script>

<div  class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-28 sm:p-4">
    <dt class="truncate text-md font-normal text-primary-500 dark:text-primary-100">
        {cardTitle}
    </dt>
    {#if additional}
        <dd class="mt-1 flex items-baseline pb-6 sm:pb-7">
            <div class="text-5xl  font-semibold text-primary-500 dark:text-primary-100">{cardContent}</div>
            <div class="ml-2 flex items-baseline text-md font-normal text-primary-500 dark:text-primary-100">
                {additional}
                <div class="text-xs">{prefix}</div>
            </div>
        </dd>
    {:else}
        <dd class="mt-2 text-5xl font-semibold tracking-tight text-primary-500 dark:text-primary-100">
            {cardContent}
        </dd>
    {/if}
</div>
