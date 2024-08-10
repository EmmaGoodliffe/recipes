<script lang="ts">
  import { isRecord } from "$lib/types";
  import { getKeys, keyValuesToObj } from "$lib/util";

  export let obj: unknown;
  export let editable: boolean;
  export let pathPrefix = "";
  export let editPath: string | undefined = undefined;
  export let onEdit: (
    edits: {
      mode: "overwrite" | "add";
      path: string;
      value: unknown;
    }[],
  ) => void;

  let value = Array.isArray(obj) ? "" : `${obj}`;
  let addPath: string | undefined;
  let values: string[] = [];

  const submitValue = () => {
    onEdit([{ mode: "overwrite", path: editPath ?? "", value }]);
    editPath = undefined;
  };
</script>

{#if pathPrefix === editPath}
  <div class="flex">
    <input
      type="text"
      bind:value
      on:keypress={e => e.key === "Enter" && submitValue()}
    />
    <button class="mx-2 square bg-button" on:click={submitValue}
      ><i class="bx bx-check"></i></button
    >
  </div>
{:else if obj === undefined || obj === null || typeof obj === "string"}
  <button
    disabled={!editable}
    on:click={() => {
      editPath = pathPrefix;
    }}>{obj}</button
  >
{:else if isRecord(obj) || Array.isArray(obj)}
  <table class="json">
    <tbody>
      {#each getKeys(obj).filter(k => !k.startsWith("@")) as key}
        <tr class="group">
          <td>{key}</td>
          <td class="flex flex-col">
            <svelte:self
              obj={obj[key]}
              {editable}
              pathPrefix="{pathPrefix}.{key}"
              {editPath}
              {onEdit}
            ></svelte:self>
            {#if Array.isArray(obj)}
              <button
                class="-my-6 square bg-button self-center z-10 opacity-0 group-hover:opacity-100 transition-all"
                on:click={() => (addPath = `${pathPrefix}.${key}`)}
                ><i class="bx bx-plus align-middle"></i></button
              >
              {#if `${pathPrefix}.${key}` === addPath}
                {#if typeof obj[0] === "string"}
                  <input
                    type="text"
                    bind:value
                    on:keypress={e =>
                      e.key === "Enter" &&
                      console.log(
                        "added string",
                        e.currentTarget.value,
                        "to",
                        addPath,
                      )}
                  />
                {:else if isRecord(obj[0])}
                  <div class="flex items-center">
                    <table class="json">
                      <tbody>
                        {#each getKeys(obj[0]).filter(k => !k.startsWith("@")) as key, i}
                          <tr>
                            <td>{key}</td>
                            <td>
                              <input type="text" bind:value={values[i]} />
                            </td>
                          </tr>
                        {/each}
                      </tbody>
                    </table>
                    <button
                      class="ml-2 square bg-button"
                      on:click={() => {
                        onEdit([
                          {
                            mode: "add",
                            path: addPath ?? "",
                            value: {
                              ...obj[0],
                              ...keyValuesToObj(
                                getKeys(obj[0]).filter(k => !k.startsWith("@")),
                                values,
                              ),
                            },
                          },
                        ]);
                        addPath = undefined;
                        values = [];
                      }}><i class="bx bx-check"></i></button
                    >
                    <button
                      class="ml-2 square bg-input"
                      on:click={() => {
                        addPath = undefined;
                        values = [];
                      }}><i class="bx bx-x"></i></button
                    >
                  </div>
                {:else}
                  <p>Don't know how to add items of type {typeof obj[0]}</p>
                {/if}
              {/if}
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <span>Don't know how to display type {typeof obj}</span>
{/if}

<style lang="postcss">
  button:not(.square),
  input {
    @apply my-0.5 px-1 py-0.5;
  }

  input {
    @apply rounded;
  }
</style>
