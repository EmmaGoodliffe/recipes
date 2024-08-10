<script lang="ts">
  import { getKeys } from "$lib/util";

  export let obj: unknown;
  export let editable: boolean;
  export let pathPrefix = "";
  export let editPath: string | undefined = undefined;
  export let onEdit: (
    edits: {
      mode: "overwrite";
      path: string;
      value: unknown;
    }[],
  ) => void;

  let value = `${obj}`;

  const submitValue = () => {
    onEdit([{ mode: "overwrite", path: editPath ?? "", value }]);
    editPath = undefined;
  };
</script>

{#if pathPrefix === editPath}
  <input
    type="text"
    bind:value
    on:keypress={e => e.key === "Enter" && submitValue()}
  />
  <button class="square bg-button" on:click={submitValue}
    ><i class="bx bx-check"></i></button
  >
{:else if obj === undefined || obj === null || typeof obj === "string"}
  <button
    disabled={!editable}
    on:click={() => {
      editPath = pathPrefix;
    }}>{obj}</button
  >
{:else if typeof obj === "object"}
  <table class="json">
    <tbody>
      {#each getKeys(obj) as key}
        <tr>
          <td>{key}</td>
          <td>
            {#if `${pathPrefix}.${key}` === editPath}
              <input type="text" />
            {:else}
              <svelte:self
                obj={obj[key]}
                {editable}
                pathPrefix="{pathPrefix}.{key}"
                {editPath}
                {onEdit}
              ></svelte:self>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <span>Don't know how to display type {typeof obj}</span>
{/if}
