<script lang="ts">
  import { fly } from "svelte/transition";
  import ViewRecipe from "./ViewRecipe.svelte";
  import type { ShoppingListItem } from "$lib/stores";
  import type { RecipeVersions } from "$lib/types";
  import type { Writable } from "svelte/store";
  import Dialog from "$lib/Dialog.svelte";
  import LoaderText from "$lib/LoaderText.svelte";
  import {
    shoppingList,
    toBeCooked,
    toBeEdited,
    toBePreviewed,
  } from "$lib/stores";
  import { toArray } from "$lib/util";

  export let recipes: RecipeVersions[] | undefined;
  export let selectStores: Writable<RecipeVersions | undefined>[];

  let showPreview = false;

  const ingredientToShoppingListItem = (ing: string | undefined) => {
    const id = $toBePreviewed?.original["@id"];
    const source: ShoppingListItem["source"] = id
      ? { type: "recipe", id }
      : { type: "unknown" };
    return ing
      ? { value: ing, source, bought: false, selected: false, deleted: false }
      : undefined;
  };
</script>

<div
  class="py-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
>
  {#if recipes === undefined}
    <LoaderText text="fetching recipes..." />
  {:else}
    {#if recipes.length === 0}
      <p>No recipes.</p>
    {/if}
    <!-- TODO: handle edited version -->
    {#each recipes as recipe}
      {@const rec = recipe.edited ? recipe.edited : recipe.original}
      <button
        class="card enforced-rounded"
        on:click={() => {
          selectStores.map(s => s.set(recipe));
          showPreview = true;
        }}
        transition:fly={{ y: 20 }}
      >
        {#if rec.image?.url}
          <img
            src={rec.image.url}
            alt={rec.name}
            class="w-full flex-1 object-cover"
          />
        {/if}
        <div class="w-full px-6 py-4 bg-bg">
          <p class="text-lg font-bold truncate">{rec.name}</p>
          <p class="text-sm opacity-50 truncate">
            {rec.publisher?.name
              ? `Imported from ${rec.publisher.name}`
              : `By ${toArray(rec.author)
                  .map(a => a?.name)
                  .filter(n => n)
                  .join(", ")}`}
          </p>
        </div>
      </button>
    {/each}
  {/if}
</div>
{#if $toBePreviewed}
  <Dialog bind:show={showPreview} title="preview recipe">
    <ViewRecipe recipeVersions={$toBePreviewed} concise={true} />
    <div slot="footer">
      <button
        class="long bg-input inline-block"
        on:click={() => toBeEdited.set($toBePreviewed)}
        ><i class="bx bx-pencil"></i> edit</button
      >
      <a
        href="/cook"
        class="long bg-cook inline-block text-center"
        on:click={() => toBeCooked.set($toBePreviewed)}
        ><i class="bx bxs-flask"></i> cook</a
      >
      <a
        href="/shop"
        class="long bg-shop inline-block text-center"
        on:click={() =>
          shoppingList.update(list => {
            const { recipeIngredient } =
              $toBePreviewed.edited ?? $toBePreviewed.original;
            return [
              ...list,
              toArray(recipeIngredient)
                .map(ingredientToShoppingListItem)
                .filter(ing => ing !== undefined),
            ];
          })}><i class="bx bxs-basket"></i> shop</a
      >
    </div>
  </Dialog>
{/if}

<style lang="postcss">
  button.card {
    @apply border-2 border-border text-left flex flex-col shadow-md rounded-lg overflow-hidden;
  }
</style>
