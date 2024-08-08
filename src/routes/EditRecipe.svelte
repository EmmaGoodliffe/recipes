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
  <p class="text-center opacity-50 font-semibold">
    Tap on a property to change it.
  </p>
  {#if typeof obj === "object"}
    <JsonTable {obj} editable={true} onClick={p => (path = p.slice(1))} />
  {/if}
  {#if path !== undefined}
    <form>
      <div class="group">
        <label for="edit" class="focal">
          new value for <span class="font-mono"
            >{JSON.stringify(path ? `${key}.${path}` : key)}</span
          >
        </label>
        <!-- TODO: handle numbers etc. -->
        <input
          type="text"
          class="long font-mono"
          id="edit"
          bind:value={valueAtPath}
        />
      </div>
    </form>
  {/if}
</Dialog>
