<script lang="ts">
  import Dialog from "$lib/Dialog.svelte";
  import type { Recipe } from "$lib/types";
  import { getKeys, type toEditable } from "$lib/util";

  export let show: boolean;
  export let recEdit: ReturnType<typeof toEditable<Recipe>>;
  export let key: string & keyof Recipe;
  $: value = recEdit.get(key);
</script>

<Dialog {show} title="edit {key}">
  <form on:submit={() => console.log(recEdit.data)}>
    {#if typeof value === "string"}
      <input
        type="text"
        {value}
        on:input={e => recEdit.set(key, e.currentTarget.value)}
      />
    {:else if typeof value === "object"}
      <table class="json">
        <tbody>
          {#each getKeys(value) as k}
            <tr>
              <td>{k}</td>
              <td>{JSON.stringify(value[k], null, 2)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p>Don't know how to edit {typeof value}</p>
    {/if}
    <button type="submit" class="long bg-button">confirm edit</button>
  </form>
</Dialog>
