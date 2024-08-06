<script lang="ts">
  import { selectedRecipe } from "$lib/stores";
  import RecipeStats from "../RecipeStats.svelte";
  import { toArray, uniqueByKey } from "$lib/util";
  import { searchInstructionForIngredients } from "$lib/nlp";
  import Gallery from "../Gallery.svelte";
  import { recipes, initialiseRecipes } from "$lib/stores";
  import { onMount } from "svelte";

  onMount(initialiseRecipes);

  const bolden = (text: string, words: string[]) => {
    let result = text;
    for (const w of words) {
      const re = new RegExp(`\\b${w}\\b`, "g");
      result = result.replaceAll(re, `<span class="font-bold">${w}</span>`);
    }
    return result;
  };

  // let truncateIngredients = true;
  let instructionIndex = 0;
  $: instructions = toArray($selectedRecipe?.recipeInstructions);
  $: instructionText = instructions[instructionIndex]?.text;
  $: ingredients = toArray($selectedRecipe?.recipeIngredient).filter(
    i => i !== undefined,
  );
  $: matches = searchInstructionForIngredients(instructionText, ingredients);
  $: matchedIngredients = uniqueByKey("value", matches.ingredientMatches);
  $: unmatchedIngredients = ingredients.filter(
    ing => !matchedIngredients.map(mi => mi.value).includes(ing),
  );
  $: matchedInstructionWords = matches.instructionMatches.map(i => i.value);
  $: instructionHtml = bolden(instructionText ?? "", matchedInstructionWords);
</script>

{#if !$selectedRecipe}
  <h1>cook</h1>
  <Gallery recipes={$recipes?.slice(0, 4)} />
{:else}
  <h1>{$selectedRecipe.name}</h1>
  <RecipeStats
    prepTime={$selectedRecipe.prepTime}
    cookTime={$selectedRecipe.cookTime}
    totalTime={$selectedRecipe.totalTime}
    recipeYield={$selectedRecipe.recipeYield}
  />
  <div class="instruction">
    <p>{instructionIndex + 1}. {@html instructionHtml}</p>
    <div class="flex">
      <button
        disabled={instructionIndex <= 0}
        on:click={() => instructionIndex--}>&larr;</button
      >
      <button
        disabled={instructionIndex >=
          toArray($selectedRecipe.recipeInstructions).length - 1}
        on:click={() => instructionIndex++}>&rarr;</button
      >
    </div>
  </div>
  <div class="my-4 relative enforced-rounded">
    <!-- (ul) class:v-truncate={truncateIngredients} -->
    <ul class="mx-4 text-lg">
      {#each matchedIngredients as ing}
        <li class="font-bold">{ing.value}</li>
      {/each}
      {#each unmatchedIngredients as ing}
        <li>{ing}</li>
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
    @apply w-auto mx-auto my-4 text-xl bg-bg;
  }

  .instruction button {
    @apply flex-1 mx-2 my-2 px-4 pt-2 pb-3 rounded transition-all hover:bg-input disabled:opacity-50;
  }
</style>
