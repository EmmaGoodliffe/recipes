<script lang="ts">
  import { getKeys } from "$lib/util";

  export let obj: unknown;
</script>

{#if obj === undefined || obj === null}
  <span>{obj}</span>
{:else if typeof obj === "string"}
  <span>{obj}</span>
{:else if typeof obj === "object"}
  <table class="json">
    <tbody>
      {#each getKeys(obj) as key}
        <tr>
          <td>{key}</td>
          <td><svelte:self obj={obj[key]}></svelte:self></td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <span>Don't know how to display type {typeof obj}</span>
{/if}
