<script lang="ts">
  import { shoppingList } from "$lib/stores";
  import { parseIngredient, toIngredient } from "$lib/nlp";

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
      <button class="ml-4 square bg-input self-center">
        <i class="bx bx-dots-horizontal-rounded"></i>
      </button>
    </div>
  {/each}
</div>

<style lang="postcss">
  .item {
    @apply px-2 py-1 flex;
  }

  .item:not(:last-child) {
    @apply border-b-2 border-input;
  }
</style>
