<script lang="ts">
    export let cls;
    export let w;
    export let h;
    export let iconPath;
    export let title;
  </script>
  <div class="w-12 h-8">
    <svg class={cls} width="{w}" height="{h}" xmlns="http://www.w3.org/2000/svg">
      {#if title}
        <title>{title}</title>
      {/if}
      <use xlink:href={iconPath} />
    </svg>
  </div>
