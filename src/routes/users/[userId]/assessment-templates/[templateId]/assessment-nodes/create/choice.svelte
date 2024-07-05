<script lang="ts">
	import Icon from '@iconify/svelte';

	export let optionValueStore = [{ Text: '' }];
	export let readonly = false;

	const addOptionField = () => (optionValueStore = [...optionValueStore, { Text: '' }]);
	const removeOptionField = (value?: string) => {
    optionValueStore = optionValueStore.filter(optionValue => optionValue.Text !== value);
  }
		
</script>

<div class="border dark:border-surface-700 flex flex-col rounded my-2 p-2 gap-2">
	{#each optionValueStore as v, i}
		<div class="flex items-center gap-2">
			<input
				type="text"
				class="input"
				name="options"
        required
				bind:value={optionValueStore[i].Text}
				placeholder="Add option here..."
				disabled={readonly}
			/>
			{#if !readonly} 
				<button class="btn p-2 variant-soft-error" on:click|preventDefault={removeOptionField(optionValueStore[i].Text)}>
					<Icon icon="material-symbols:close-rounded" />
				</button>
			{/if}
		</div>
	{/each}
	
<!-- Only show the add button if not readonly -->
	{#if !readonly} 
		<button class="btn btn-sm variant-soft-secondary" on:click|preventDefault={addOptionField}>
			Add Option
		</button>
	{/if}
</div>
