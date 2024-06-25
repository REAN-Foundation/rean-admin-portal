<script lang="ts">
    import Icon from '@iconify/svelte';

    //////////////////////////////////////////////////////////////////

    export let name = 'password';
    export let password = '';
    let showPassword = false;
    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }
</script>

<div class="flex relative items-center">
    <!-- <input 
    type={showPassword ? 'text' : 'password'} 
    name = {name} 
    bind:value={password}
    required 
    class="input mb-4 mt-2" 
  /> -->
    {#if showPassword}
        <input
            type="text"
            {name}
            bind:value={password}
            required
            class="input"
        />
    {:else}
        <input
            type="password"
            {name}
            bind:value={password}
            required
            class="input"
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
