<script lang="ts">
  import { getKeys } from "$lib/util";

  export let obj: unknown;
  export let editable: boolean;
  export let pathPrefix = "";
  export let onClick: (path: string) => void = () => {};
</script>

{#if obj === undefined || obj === null || typeof obj === "string"}
  <button disabled={!editable} on:click={() => onClick(pathPrefix)}
    >{obj}</button
  >
{:else if typeof obj === "object"}
  <table class="json">
    <tbody>
      {#each getKeys(obj) as key}
        <tr>
          <td
            ><button
              disabled={!editable}
              on:click={() => onClick(`${pathPrefix}.${key}`)}>{key}</button
            ></td
          >
          <td
            ><svelte:self
              obj={obj[key]}
              {editable}
              pathPrefix="{pathPrefix}.{key}"
              {onClick}
            ></svelte:self></td
          >
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <span>Don't know how to display type {typeof obj}</span>
{/if}
