<script lang="ts">
    export let text: string;

    let showTooltip = false;
    let tooltipElement: HTMLSpanElement;
    let shouldShowTooltip = false;

    $: shouldShowTooltip = text.length > 40;

    function handleMouseEnter() {
        if (shouldShowTooltip) {
            showTooltip = true;
        }
    }

    function handleMouseLeave() {
        showTooltip = false;
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<span
    class="relative inline-block"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
>
    <slot></slot>
    {#if showTooltip && shouldShowTooltip}
        <span
            bind:this={tooltipElement}
            class="absolute z-10 text-xs rounded-lg shadow-lg"
            style="bottom: 100%; left: 50%; transform: translateX(-50%); background-color: rgba(71, 85, 105, 0.95); border: 1px solid rgba(51, 65, 85, 0.1); color: #ffffff; margin-top: 10px; padding: 8px; font-size: 12px; min-width: 200px; max-width: 400px; text-align: left; white-space: normal; word-wrap: break-word; overflow-wrap: break-word; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);"
        >
            {text}
            <span
                class="absolute"
                style="top: 100%; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid rgba(71, 85, 105, 0.95);"
            >
            </span>
        </span>
    {/if}
</span>
