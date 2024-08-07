<script lang="ts">
  import type { Recipe } from "$lib/types";
  import { getKeys } from "$lib/util";

  export let value: Recipe[keyof Recipe];
</script>

{#if typeof value === "string"}
  <span class="font-mono">{value}</span>
{:else if Array.isArray(value)}
  <ol>
    {#each value as x, i}
      <li class="px-2 py-1 rounded flex items-center">
        <span class="px-1 font-mono">{i}.</span>
        <svelte:self value={x}></svelte:self>
      </li>
    {/each}
  </ol>
{:else if typeof value === "object"}
  <table class="enforced-rounded">
    <tbody>
      {#each getKeys(value) as key, i}
        <tr class="">
          <td class="px-2 border-r-2 border-input">{key}</td>
          <td class="px-2"><svelte:self value={value[key]}></svelte:self></td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <p>
    Don't know how to display type <span class="font-mono">{typeof value}</span>
  </p>
{/if}

<style lang="postcss">
  table {
    @apply font-mono border-2 border-input;
  }

  tr {
    @apply border-input;
  }

  tr:not(:last-child) {
    @apply border-b-2;
  }
</style>
