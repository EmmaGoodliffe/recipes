<script lang="ts">
  import type { Recipe } from "$lib/types";
  import type { toEditable } from "$lib/util";

  export let recEdit: ReturnType<typeof toEditable<Recipe>>;
  export let key: string & keyof Recipe;
</script>

<form on:submit={() => console.log(recEdit.data)}>
  {#if typeof recEdit.get(key) === "string"}
    <input
      type="text"
      value={recEdit.get(key)}
      on:input={e => recEdit.set(key, e.currentTarget.value)}
    />
  {:else}
    <p>Don't know how to edit {typeof recEdit.get(key)}</p>
  {/if}
  <button type="submit" class="long bg-button">confirm edit</button>
</form>
