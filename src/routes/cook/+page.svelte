<script lang="ts">
  import { selectedRecipe } from "$lib/stores";
  import RecipeStats from "../RecipeStats.svelte";
  import {
    toArray,
    parseIngredient,
    searchInstructionForIngredients,
    uniqueByKey,
  } from "$lib/util";

  // let truncateIngredients = true;
  let instructionIndex = 0;
  $: instruction = toArray($selectedRecipe?.recipeInstructions)[
    instructionIndex
  ]?.text;
  $: ingredients = toArray($selectedRecipe?.recipeIngredient).map(
    parseIngredient,
  );
  $: matchedIngredients = uniqueByKey(
    "whole",
    searchInstructionForIngredients(instruction, ingredients),
  );
  $: unmatchedIngredients = ingredients.filter(
    ing => !matchedIngredients.map(mi => mi.whole).includes(ing.whole),
  );
</script>

{#if !$selectedRecipe}
  <h1>no recipe to cook...</h1>
  <a href="/" class="text-center hover:underline">&larr; home</a>
{:else}
  <h1>{$selectedRecipe.name}</h1>
  <RecipeStats
    prepTime={$selectedRecipe.prepTime}
    cookTime={$selectedRecipe.cookTime}
    totalTime={$selectedRecipe.totalTime}
    recipeYield={$selectedRecipe.recipeYield}
  />
  <div class="instruction">
    <button disabled={instructionIndex <= 0} on:click={() => instructionIndex--}
      >&larr;</button
    >
    <p>{instructionIndex + 1}. {instruction}</p>
    <button
      disabled={instructionIndex >=
        toArray($selectedRecipe.recipeInstructions).length - 1}
      on:click={() => instructionIndex++}>&rarr;</button
    >
  </div>
  <div class="my-4 relative enforced-rounded">
    <!-- (ul) class:v-truncate={truncateIngredients} -->
    <ul class="mx-4 my-2">
      {#each matchedIngredients as ing}
        <li class="font-bold">{ing.whole}</li>
      {/each}
      {#each unmatchedIngredients as ing}
        <li>{ing.whole}</li>
      {/each}
    </ul>
    <!-- {#if truncateIngredients}
      <button
        class="absolute -bottom-2 w-full pt-12 pb-2 text-lg bg-gradient-to-b from-transparent to-dark-bg"
        on:click={() => (truncateIngredients = false)}
      >
        <i class="bx bx-dots-vertical-rounded"></i>
      </button>
    {/if} -->
  </div>
{/if}

<style lang="postcss">
  /* .v-truncate {
    @apply max-h-[8rem] overflow-hidden;
  } */

  .instruction {
    @apply w-[inherit] mx-auto my-4 text-xl bg-bg flex justify-center;
  }

  .instruction button {
    @apply mx-2 px-4 rounded transition-all hover:bg-input disabled:opacity-50;
  }
</style>
