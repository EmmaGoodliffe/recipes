<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import Gallery from "../Gallery.svelte";
  import RecipeStats from "../RecipeStats.svelte";
  import { searchInstructionForIngredients } from "$lib/nlp";
  import SmoothHeight from "$lib/SmoothHeight.svelte";
  import { toBeCooked } from "$lib/stores";
  import { initAll, recipes } from "$lib/stores";
  import { delay, toArray, uniqueByKey } from "$lib/util";

  onMount(initAll);

  // let truncateIngredients = true;
  let direction: "l" | "r" = "r";
  let instructionIndex = 0;

  const bolden = (text: string, words: string[]) => {
    let result = text;
    for (const w of words) {
      const re = new RegExp(`\\b${w}\\b`, "g");
      result = result.replaceAll(re, `<span class="font-bold">${w}</span>`);
    }
    return result;
  };

  $: instructions = toArray($toBeCooked?.recipeInstructions);
  $: instructionText = instructions[instructionIndex]?.text;
  $: ingredients = toArray($toBeCooked?.recipeIngredient).filter(
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

<svelte:head>
  <title>cook | recipes</title>
  <meta name="description" content="cook" />
</svelte:head>

{#if !$toBeCooked}
  <Gallery recipes={$recipes?.slice(0, 4)} selectStores={[toBeCooked]} />
{:else}
  <h1>{$toBeCooked.name}</h1>
  <RecipeStats
    prepTime={$toBeCooked.prepTime}
    cookTime={$toBeCooked.cookTime}
    totalTime={$toBeCooked.totalTime}
    recipeYield={$toBeCooked.recipeYield}
    editing={{ enabled: false, edit: () => {} }}
  />
  <div class="instruction">
    <SmoothHeight>
      {#each instructions as inst, i}
        {#if i === instructionIndex}
          <p in:fly={{ x: direction === "r" ? 200 : -200 }}>
            {instructionIndex + 1}. {@html instructionHtml}
          </p>
        {/if}
      {/each}
    </SmoothHeight>
    <div class="flex">
      <button
        disabled={instructionIndex <= 0}
        on:click={async () => {
          direction = "l";
          await delay(50);
          instructionIndex--;
        }}><i class="bx bx-chevron-left"></i></button
      >
      <button
        disabled={instructionIndex >=
          toArray($toBeCooked.recipeInstructions).length - 1}
        on:click={async () => {
          direction = "r";
          await delay(50);
          instructionIndex++;
        }}><i class="bx bx-chevron-right"></i></button
      >
      <!-- TODO: allow swipes -->
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
    @apply w-auto mx-auto my-4 text-xl bg-bg overflow-x-hidden;
  }

  .instruction button {
    @apply flex-1 mx-2 my-2 px-4 pt-2 pb-3 rounded transition-all hover:bg-input disabled:opacity-50;
  }
</style>
