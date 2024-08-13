<script lang="ts">
  import { shoppingList } from "$lib/stores";
  import { parseIngredient, toIngredient, UNITS } from "$lib/nlp";
  import Dialog from "$lib/Dialog.svelte";
  import SmoothHeight from "$lib/SmoothHeight.svelte";
  import { delay } from "$lib/util";

  let editIndex: number | undefined;
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

  const edit = async (index: number | undefined) => {
    editIndex = index;
    if (index !== undefined) {
      const parsed = parseIngredient($shoppingList[index]?.value ?? "");
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
    shoppingList.update(l => {
      l[editIndex ?? -1] = {
        ...l[editIndex ?? -1],
        value,
        source: { type: "custom" },
      };
      return l;
    });
    editIndex = undefined;
  };

  $: noneSelected = $shoppingList.every(item => item.deleted || !item.selected);
</script>

<button class="long bg-shop" on:click={() => edit($shoppingList.length)}
  ><i class="bx bx-plus"></i> item</button
>
{#if $shoppingList.length === 0}
  <p class="my-4">No items.</p>
{:else}
  <div class="my-4">
    <button
      class="short bg-input"
      on:click={() =>
        shoppingList.update(l => {
          const allSelected = l.every(item => item.deleted || item.selected);
          return l.map(item => ({ ...item, selected: !allSelected }));
        })}><i class="bx bx-select-multiple"></i> select all</button
    >
    <button
      class="short bg-input"
      on:click={() =>
        shoppingList.update(l =>
          l.map(item => ({ ...item, selected: !item.selected })),
        )}><i class="bx bxs-x-square"></i> invert selection</button
    >
    <button
      class="short bg-shop"
      disabled={noneSelected}
      on:click={() =>
        shoppingList.update(l => {
          const allBought = l.every(
            item => item.deleted || !item.selected || item.bought,
          );
          return l.map(item => ({
            ...item,
            bought: item.selected ? !allBought : item.bought,
          }));
        })}><i class="bx bx-strikethrough"></i> bought</button
    >
    <button
      class="short bg-danger"
      disabled={noneSelected}
      on:click={() =>
        shoppingList.update(l =>
          l.map(item => ({ ...item, deleted: item.deleted || item.selected })),
        )}><i class="bx bx-trash"></i> delete</button
    >
  </div>
  <div class="enforced-rounded border-2 border-input">
    {#each $shoppingList as item, i}
      {#if !item.deleted}
        <div class="py-1 flex justify-between not-last-border">
          <input
            type="checkbox"
            class="mx-3"
            checked={item.selected}
            on:change={e =>
              shoppingList.update(l => {
                l[i].selected = e.currentTarget.checked;
                return l;
              })}
          />
          <button
            class="flex-1 text-left transition"
            class:opacity-50={item.bought}
            on:click={() =>
              shoppingList.update(l => {
                l[i].bought = !l[i].bought;
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
            on:click={() => edit(i)}
          >
            <i class="bx bx-pencil"></i>
          </button>
        </div>
      {/if}
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
      on:change={() => edit(editIndex)}
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
