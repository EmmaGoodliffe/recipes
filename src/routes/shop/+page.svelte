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

  const edit = async (i: number | undefined) => {
    editIndex = i;
    if (i !== undefined) {
      number = list[i].parsed.number;
      unit = list[i].parsed.unit;
      item = list[i].parsed.item.map(({ value }) => value).join(" ");
      desc = list[i].parsed.description.map(({ value }) => value).join(" ");
      whole = normaliseIngredient(number, unit, item, desc);
      await delay(10);
      firstInput?.focus();
    }
  };

  const onEdit = (value: string) => {
    shoppingList.update(list => {
      list[editIndex ?? -1].value = value;
      list[editIndex ?? -1].source.type = "custom";
      return list;
    });
    editIndex = undefined;
  };

  $: list = $shoppingList.map(i => {
    const parsed = parseIngredient(i.value);
    return { ...i, parsed, bulk: toIngredient(parsed, false) };
  });
</script>

<button class="long bg-shop"
  ><i class="bx bx-plus align-middle"></i> item</button
>
{#if list.length === 0}
  <p class="my-4">No items.</p>
{/if}
<div class="my-4 enforced-rounded border-2 border-input">
  {#each list as item, i}
    <div class="item justify-between">
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
          {item.bulk}
        </div>
        <p class="text-sm">
          {item.parsed.description.map(({ value }) => value).join(" ")}
        </p>
      </button>
      <button class="ml-4 square bg-input self-center" on:click={() => edit(i)}>
        <i class="bx bx-dots-horizontal-rounded"></i>
      </button>
    </div>
  {/each}
</div>
<Dialog
  show={editIndex !== undefined}
  title="edit shopping list item"
  onClose={() => edit(undefined)}
>
  <div class="flex justify-center">
    <input
      type="checkbox"
      name="smart"
      id="smart"
      on:change={() => edit(editIndex)}
      bind:checked={smartEdit}
    />
    <label for="smart" class="font-semibold">smart editor</label>
  </div>
  <SmoothHeight>
    {#if smartEdit}
      <p class="text-lg text-center font-semibold opacity-50">{whole}</p>
      <form class="px-2"
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
            {#each UNITS as u}
              <option value={u}>{u}</option>
            {/each}
            <option value={null} class="italic">none</option>
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
          ><i class="bx bx-list-check align-middle"></i> commit item</button
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
          ><i class="bx bx-list-check align-middle"></i> commit item</button
        >
      </form>
    {/if}
  </SmoothHeight>
</Dialog>

<style lang="postcss">
  .item {
    @apply px-2 py-1 flex;
  }

  .item:not(:last-child) {
    @apply border-b-2 border-input;
  }
</style>
