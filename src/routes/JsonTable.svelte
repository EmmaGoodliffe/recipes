<script lang="ts">
  import { isRecord } from "$lib/types";
  import { getKeys, keyValuesToObj } from "$lib/util";

  export let obj: unknown;
  export let editable: boolean;
  export let pathPrefix = "";
  export let editPath: string | undefined = undefined;
  export let onEdit: (
    edits: (
      | {
          mode: "overwrite" | "add";
          path: string;
          value: unknown;
        }
      | {
          mode: "delete";
          path: string;
        }
    )[],
  ) => void;

  let value = Array.isArray(obj) ? "" : `${obj}`;
  let addPath: string | undefined;
  let values: string[] = [];

  const submitValue = () => {
    onEdit([{ mode: "overwrite", path: editPath ?? "", value }]);
    editPath = undefined;
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      submitValue();
    } else if (e.key === "Escape") {
      editPath = undefined;
    }
  };
</script>

{#if pathPrefix === editPath}
  <div class="flex">
    {#if typeof obj === "number"}
      <input type="number" bind:value on:keyup={onKey} />
    {:else if typeof obj === "string"}
      {#if pathPrefix.endsWith(".text")}
        <textarea bind:value />
      {:else}
        <input type="text" bind:value on:keyup={onKey} />
      {/if}
    {/if}
    <button class="mx-2 square bg-cook" on:click={submitValue}
      ><i class="bx bx-check"></i></button
    >
  </div>
{:else if obj === undefined || obj === null || typeof obj === "string" || typeof obj === "number"}
  <button
    class="text-left"
    disabled={!editable}
    on:click={() => {
      editPath = pathPrefix;
    }}>{obj}</button
  >
{:else if isRecord(obj) || Array.isArray(obj)}
  <table class="json">
    <tbody>
      {#each getKeys(obj).filter(k => !k.startsWith("@")) as key (key)}
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
              <!-- TODO: allow reordering of arrays -->
              <div class="flex self-center z-10">
                <button
                  class="mx-2 -my-6 square bg-input opacity-0 group-hover:opacity-100 transition-all"
                  on:click={() =>
                    onEdit([{ mode: "delete", path: `${pathPrefix}.${key}` }])}
                  ><i class="bx bx-trash align-middle"></i></button
                >
                <button
                  class="mx-2 -my-6 square bg-cook opacity-0 group-hover:opacity-100 transition-all"
                  on:click={() => (addPath = `${pathPrefix}.${key}`)}
                  ><i class="bx bx-plus align-middle"></i></button
                >
              </div>
              {#if `${pathPrefix}.${key}` === addPath}
                {#if typeof obj[0] === "string"}
                  <input
                    type="text"
                    style="margin-top: 1rem;"
                    bind:value
                    on:keypress={e => {
                      if (e.key === "Enter") {
                        onEdit([
                          {
                            mode: "add",
                            path: addPath ?? "",
                            value: e.currentTarget.value,
                          },
                        ]);
                        addPath = undefined;
                      }
                    }}
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
                      class="ml-2 square bg-cook"
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
