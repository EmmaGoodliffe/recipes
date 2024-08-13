<script lang="ts">
  import { getByPath, shoppingList, type ShoppingListItem } from "$lib/stores";
  import { parseIngredient, toIngredient, UNITS } from "$lib/nlp";
  import Dialog from "$lib/Dialog.svelte";
  import SmoothHeight from "$lib/SmoothHeight.svelte";
  import { delay, unique, areDeepEqual } from "$lib/util";
  import { onMount } from "svelte";

  let method: null | "source" = null;
  let groups: { name: string }[] = [];
  let editIndex: { i: number; j: number } | undefined;
  let smartEdit = false;
  let number: string | null;
  let unit: string | null;
  let item: string;
  let desc: string | null;
  let whole: string;
  let firstInput: HTMLInputElement | undefined;

  const normaliseIngredient = (
    number: string | null | undefined,
    unit: string | null | undefined,
    item: string | undefined,
    desc: string | null | undefined,
  ) =>
    toIngredient(
      parseIngredient(`${number ?? ""} ${unit ?? ""} ${item}, ${desc ?? ""}`),
    );

  const edit = async (index: { i: number; j: number } | undefined) => {
    editIndex = index;
    if (index !== undefined) {
      const { i, j } = index;
      const parsed = parseIngredient($shoppingList[i][j]?.value ?? "");
      number = parsed.number;
      unit = parsed.unit;
      item = parsed.item.map(({ value }) => value).join(" ");
      desc = parsed.description.map(({ value }) => value).join(" ");
      whole = normaliseIngredient(number, unit, item, desc);
      await delay(10);
      firstInput?.focus();
    }
  };

  const onEdit = (value: string) => {
    if (editIndex !== undefined) {
      const { i, j } = editIndex;
      shoppingList.update(l => {
        l[i][j] = { ...l[i][j], value, source: { type: "custom" } };
        return l;
      });
    }
    editIndex = undefined;
  };

  const sortByPath = <T,>(items: T[], path: string) => {
    const values = unique(items.map(x => getByPath(x, path)));
    values.sort();
    return values.map(v => items.filter(x => getByPath(x, path) === v));
  };

  const sort = (list: ShoppingListItem[][]) => {
    let sorted = list;
    if (method === "source") {
      sorted = sortByPath(list.flat(), "source.recipe.@id");
    }
    groups = sorted.map(section => {
      const { source } = section[0];
      const name = source.type === "recipe" ? source.recipe.name : "?";
      return { name: name ?? "?" };
    });
    return sorted;
  };

  onMount(() => {
    // sort($shoppingList);
    return shoppingList.subscribe(l => {
      const sorted = sort(l);
      if (!areDeepEqual(sorted, l)) {
        console.log("should update from", l, "to", sorted);
      } else {
        console.log("already sorted");
      }
    });
  });

  $: noneSelected = $shoppingList
    .flat()
    .every(item => item.deleted || !item.selected);
</script>

<button
  class="long bg-shop"
  on:click={() => edit({ i: $shoppingList.length, j: 0 })}
  ><i class="bx bx-plus"></i> item</button
>
{#if $shoppingList.length === 0}
  <p class="my-4">No items.</p>
{:else}
  <div class="my-4">
    <div class="group">
      <label for="sort" class="focal">sort by</label>
      <select
        name="sort"
        class="long"
        id="sort"
        bind:value={method}
        on:input={() => shoppingList.update(l => sort(l))}
      >
        <option value={null}>default</option>
        <option value="source">recipe</option>
      </select>
    </div>
  </div>
  <div class="my-4">
    <button
      class="short bg-input"
      on:click={() =>
        shoppingList.update(l => {
          const allSelected = l
            .flat()
            .every(item => item.deleted || item.selected);
          return l.map(section =>
            section.map(item => ({ ...item, selected: !allSelected })),
          );
        })}><i class="bx bx-select-multiple"></i> select all</button
    >
    <button
      class="short bg-input"
      on:click={() =>
        shoppingList.update(l =>
          l.map(section =>
            section.map(item => ({ ...item, selected: !item.selected })),
          ),
        )}><i class="bx bxs-x-square"></i> invert selection</button
    >
    <button
      class="short bg-shop"
      disabled={noneSelected}
      on:click={() =>
        shoppingList.update(l => {
          const allBought = l
            .flat()
            .every(item => item.deleted || !item.selected || item.bought);
          return l.map(section =>
            section.map(item => ({
              ...item,
              bought: item.selected ? !allBought : item.bought,
            })),
          );
        })}><i class="bx bx-strikethrough"></i> bought</button
    >
    <button
      class="short bg-danger"
      disabled={noneSelected}
      on:click={() =>
        shoppingList.update(l =>
          l.map(section =>
            section.map(item => ({
              ...item,
              deleted: item.deleted || item.selected,
            })),
          ),
        )}><i class="bx bx-trash"></i> delete</button
    >
  </div>
  <div class="enforced-rounded border-2 border-input">
    {#each $shoppingList as section, i}
      <div
        class="py-1 flex justify-center items-baseline border-b-2 border-input"
      >
        <button
          class="mx-2 square bg-input"
          on:click={() =>
            shoppingList.update(l => {
              const all = l[i].every(item => item.deleted || item.selected);
              l[i] = l[i].map(item => ({ ...item, selected: !all }));
              return l;
            })}><i class="bx bx-select-multiple"></i></button
        >
        <span class="text-lg font-bold">{groups[i]?.name ?? "?"}</span>
      </div>
      {#each section as item, j}
        {#if !item.deleted}
          <div class="py-1 flex justify-between not-last-border">
            <input
              type="checkbox"
              class="mx-3"
              checked={item.selected}
              on:change={e =>
                shoppingList.update(l => {
                  l[i][j].selected = e.currentTarget.checked;
                  return l;
                })}
            />
            <button
              class="flex-1 text-left transition"
              class:opacity-50={item.bought}
              on:click={() =>
                shoppingList.update(l => {
                  l[i][j].bought = !l[i][j].bought;
                  return l;
                })}
            >
              <div class="font-semibold" class:line-through={item.bought}>
                {toIngredient(parseIngredient(item.value), false)}
              </div>
              <p class="text-sm">
                {parseIngredient(item.value)
                  .description.map(({ value }) => value)
                  .join(" ")}
              </p>
            </button>
            <button
              class="mx-3 square bg-input self-center"
              on:click={() => edit({ i, j })}
            >
              <i class="bx bx-pencil"></i>
            </button>
          </div>
        {/if}
      {/each}
    {/each}
  </div>
{/if}
<Dialog
  show={editIndex !== undefined}
  title="edit shopping list item"
  onClose={() => edit(undefined)}
>
  <div class="check justify-center">
    <input
      type="checkbox"
      name="smart"
      id="smart"
      on:input={() => edit(editIndex)}
      bind:checked={smartEdit}
    />
    <label for="smart">smart editor</label>
  </div>
  <SmoothHeight>
    {#if smartEdit}
      <p class="text-lg text-center font-semibold opacity-50">{whole}</p>
      <form
        class="px-2"
        on:submit={() => onEdit(normaliseIngredient(number, unit, item, desc))}
      >
        <div class="group">
          <!-- TODO: use native number inputs -->
          <label for="number" class="focal">number</label>
          <input
            type="text"
            name="number"
            class="long"
            id="number"
            bind:value={number}
            bind:this={firstInput}
          />
        </div>
        <div class="group">
          <label for="unit" class="focal">unit</label>
          <select name="unit" class="long" id="unit" bind:value={unit}>
            <option value={null} class="italic">none</option>
            {#each UNITS as u}
              <option value={u}>{u}</option>
            {/each}
          </select>
        </div>
        <div class="group">
          <label for="item" class="focal">item</label>
          <input type="text" class="long" id="item" bind:value={item} />
        </div>
        <div class="group">
          <label for="description" class="focal">description</label>
          <input type="text" class="long" id="description" bind:value={desc} />
        </div>
        <button type="submit" class="long bg-shop"
          ><i class="bx bx-list-check"></i> commit item</button
        >
      </form>
    {:else}
      <form class="px-2" on:submit={() => onEdit(whole)}>
        <div class="group">
          <label for="whole" class="focal">item</label>
          <input
            type="text"
            class="long"
            id="whole"
            bind:value={whole}
            bind:this={firstInput}
          />
        </div>
        <button type="submit" class="long bg-shop"
          ><i class="bx bx-list-check"></i> commit item</button
        >
      </form>
    {/if}
  </SmoothHeight>
</Dialog>

<style lang="postcss">
  button.short {
    @apply min-w-max mr-2 disabled:opacity-50;
  }

  .not-last-border:not(:last-child) {
    @apply border-b-2 border-input;
  }
</style>
