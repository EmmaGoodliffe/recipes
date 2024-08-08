<script lang="ts">
  import Dialog from "$lib/Dialog.svelte";
  import type { Recipe } from "$lib/types";
  import { getByPath, getKeys, type toEditable } from "$lib/util";
  import JsonTable from "./JsonTable.svelte";

  export let show: boolean;
  export let recEdit: ReturnType<typeof toEditable<Recipe>>;
  export let key: string & keyof Recipe;
  export let onClose: () => void;
  export let onEdit: (edit: {
    mode: "overwrite";
    path: string;
    value: unknown;
  }) => void;

  let inputValue = "";
  let showInput = false;

  $: obj = recEdit.get(key);
  $: path = typeof obj === "string" ? "" : undefined;
  $: valueAtPath = getByPath(obj, path);

  $: {
    if (typeof valueAtPath === "string") {
      inputValue = valueAtPath;
      showInput = true;
    }
  }
</script>

<Dialog {show} title="edit {key}" {onClose}>
  <p class="text-center opacity-50 font-semibold">
    Tap on a property to change it.
  </p>
  {#if typeof obj === "object"}
    <JsonTable
      {obj}
      editable={true}
      onClick={p => {
        path = p.slice(1);
        let oldValue = valueAtPath;
        if (typeof oldValue === "string") {
          inputValue = oldValue;
          showInput = true;
        } else {
          showInput = false;
        }
      }}
    />
  {/if}
  {#if path !== undefined}
    <form
      on:submit={() =>
        onEdit({
          mode: "overwrite",
          path: key + (path ? `.${path}` : ""),
          value: inputValue,
        })}
    >
      <div class="group">
        <label for="edit" class="focal">
          new value for <span class="font-mono"
            >{JSON.stringify(path ? `${key}.${path}` : key)}</span
          >
        </label>
        {#if showInput}
          <!-- TODO: handle numbers etc. -->
          <input
            type="text"
            class="long font-mono"
            id="edit"
            bind:value={inputValue}
          />
        {/if}
      </div>
    </form>
  {/if}
</Dialog>
