<script lang="ts">
  import { fly } from "svelte/transition";
  import ViewRecipe from "./ViewRecipe.svelte";
  import type { RecipeVersions } from "$lib/types";
  import type { Writable } from "svelte/store";
  import Dialog from "$lib/Dialog.svelte";
  import LoaderText from "$lib/LoaderText.svelte";
  import {
    addIngredientsToShoppingList,
    shoppingList,
    toBeCooked,
    toBeEdited,
    toBePreviewed,
  } from "$lib/stores";
  import { toArray } from "$lib/util";

  export let recipes: RecipeVersions[] | undefined;
  export let selectStores: Writable<RecipeVersions | undefined>[];

  let showPreview = false;
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
    {#each recipes as recipe (recipe.original.url)}
      {@const rec = recipe.edited ?? recipe.original}
      {@const imageUrl =
        typeof rec.image === "string" ? rec.image : toArray(rec.image)[0]?.url}
      <button
        class="card enforced-rounded"
        on:click={() => {
          selectStores.map(s => s.set(recipe));
          showPreview = true;
        }}
        transition:fly={{ y: 20 }}
      >
        {#if imageUrl}
          <img
            src={typeof imageUrl}
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
        on:click={() => toBeEdited.set({ ...$toBePreviewed })}
        ><i class="bx bx-pencil"></i> edit</button
      >
      <a
        href="/cook"
        class="long bg-cook inline-block text-center"
        on:click={() => toBeCooked.set({ ...$toBePreviewed })}
        ><i class="bx bxs-flask"></i> cook</a
      >
      <a
        href="/shop"
        class="long bg-shop inline-block text-center"
        on:click={() =>
          shoppingList.update(list => {
            const { recipeIngredient, recipeYield } =
              $toBePreviewed.edited ?? $toBePreviewed.original;
            const url = $toBePreviewed?.original.url;
            return [
              addIngredientsToShoppingList(
                list.flat(),
                toArray(recipeIngredient),
                { type: "recipe", url, recipeYield },
              ),
            ];
          })}><i class="bx bxs-basket"></i> add to shopping list</a
      >
    </div>
  </Dialog>
{/if}

<style lang="postcss">
  button.card {
    @apply border-2 border-border text-left flex flex-col shadow-md rounded-lg overflow-hidden;
  }
</style>
