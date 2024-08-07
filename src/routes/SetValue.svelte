<script lang="ts">
  import { getKeys } from "$lib/util";

  export let typeOf: string | number | unknown[] | object;
  export let value: typeof typeOf;

</script>

{#if typeof typeOf === "string"}
  <input type="text" bind:value />
{:else if typeof typeOf === "number"}
  <input type="number" bind:value />
{:else if Array.isArray(typeOf)}
  {#each typeOf as x}
    <svelte:self typeOf={x}></svelte:self>
  {/each}
{:else}
  <table class="enforced-rounded">
    <tbody>
      {#each getKeys(typeOf) as key, i}
        <tr>
          <td class="px-2 border-r-2 border-input">{key}</td>
          <td class="px-2"><svelte:self typeOf={typeOf[key]} bind:value={value[i]}></svelte:self></td>
        </tr>
      {/each}
    </tbody>
  </table>
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
