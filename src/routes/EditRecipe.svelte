<script lang="ts">
  import Dialog from "$lib/Dialog.svelte";
  import type { Recipe } from "$lib/types";
  import { getKeys, isKey, type toEditable } from "$lib/util";
  import JsonTable from "./JsonTable.svelte";

  export let show: boolean;
  export let recEdit: ReturnType<typeof toEditable<Recipe>>;
  export let key: string & keyof Recipe;
  export let onEdit: () => void;

  const getByPath = (obj: unknown, path: string | undefined) => {
    if (!path || !obj) {
      return obj;
    }
    const [parentPath, ...childPaths] = path.split(".");
    if (typeof obj === "object" && isKey(obj, parentPath)) {
      return getByPath(obj[parentPath], childPaths.join("."));
    }
    throw new Error(
      `tried to get path ${path} of object ${JSON.stringify(obj)}`,
    );
  };

  $: obj = recEdit.get(key);
  $: path = typeof obj === "string" ? "" : undefined;
  $: valueAtPath = getByPath(obj, path);
</script>

<Dialog {show} title="edit {key}" onClose={() => onEdit()}>
  <form on:submit={() => console.log({ obj, path, valueAtPath })}>
    <div>
      selected path: <span class="font-mono">{JSON.stringify(path)}</span>
    </div>
    <p>current value:</p>
    <JsonTable {obj} />
    {#if path !== undefined}
      <p>new value:</p>
      <!-- TODO: handle numbers etc. -->
      <input type="text" bind:value={valueAtPath} />
      <button type="submit" class="long bg-button">confirm edit</button>
    {/if}
  </form>
</Dialog>
