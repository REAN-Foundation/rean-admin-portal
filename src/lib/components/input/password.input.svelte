<script lang="ts">
    import Icon from '@iconify/svelte';
    import { createEventDispatcher } from 'svelte';

    export let name = 'password';
    export let password = '';
    let showPassword = false;
    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }

    const dispatch = createEventDispatcher();

    function onFocus() {
        dispatch('focus');
    }

    function onBlur() {
        dispatch('blur');
    }

</script>

<div class="flex relative items-center">
    {#if showPassword}
        <input
            type="text"
            {name}
            bind:value={password}
            required
            class="input"
            on:focus={onFocus}
            on:blur={onBlur}
        />
    {:else}
        <input
            type="password"
            {name}
            bind:value={password}
            required
            class="input"
            on:focus={onFocus}
            on:blur={onBlur}
        />
    {/if}
    {#if password !== ''}
        <button
            type="button"
            class="absolute bg-none border-none cursor-pointer right-4"
            on:click={togglePasswordVisibility}
        >
            {#if showPassword}
                <Icon
                    icon="material-symbols:visibility-outline"
                    class="text-lg"
                />
            {:else}
                <Icon
                    icon="material-symbols:visibility-off-outline"
                    class="text-lg"
                />
            {/if}
        </button>
    {/if}
</div>
