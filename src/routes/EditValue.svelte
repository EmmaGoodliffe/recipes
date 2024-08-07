<script lang="ts">
  import type { Recipe } from "$lib/types";
  import { getKeys } from "$lib/util";
  import SetValue from "./SetValue.svelte";

  export let value: string | number | unknown[] | object | undefined;

  let additionIndex: number | undefined;
</script>

{#if typeof value === "string" || typeof value === "number"}
  <span class="font-mono">{value}</span>
{:else if Array.isArray(value)}
  <ol>
    {#each value as x, i}
      <li class="px-2 py-1 group flex flex-col">
        <div class="flex items-center">
          <span class="px-1 font-mono">{i}.</span>
          <svelte:self value={x}></svelte:self>
        </div>
        <button
          class="-my-2 square bg-button self-center opacity-0 group-hover:opacity-100 transition-all"
          on:click={() => (additionIndex = i)}
          ><i class="bx bx-plus"></i></button
        >
      </li>
      {#if additionIndex === i}
        <li class="px-2 py-1 group flex flex-col">
          <div class="flex items-center">
            <span class="px-1 font-mono">?.</span>
            <SetValue typeOf={x} />
          </div>
          <button
            class="-my-2 square bg-button self-center"
            on:click={() => (additionIndex = i)}
            ><i class="bx bx-check"></i></button
          >
        </li>
      {/if}
    {/each}
  </ol>
{:else if typeof value === "object"}
  <table class="enforced-rounded">
    <tbody>
      {#each getKeys(value) as key, i}
        <tr>
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
