<script lang="ts">
  import { fly } from "svelte/transition";
  import Gallery from "../Gallery.svelte";
  import RecipeStats from "../RecipeStats.svelte";
  import Dialog from "$lib/Dialog.svelte";
  import { searchInstructionForIngredients } from "$lib/nlp";
  import { scaleIngredients } from "$lib/nlp";
  import { parseYield } from "$lib/Recipe";
  import SmoothHeight from "$lib/SmoothHeight.svelte";
  import { toBeCooked } from "$lib/stores";
  import { recipes } from "$lib/stores";
  import { toArray } from "$lib/types";
  import { decimalToString, delay, uniqueByKey } from "$lib/util";

  // let truncateIngredients = true;
  let direction: "l" | "r" = "r";
  let instructionIndex = 0;
  let version: "original" | "edited" = $toBeCooked?.edited
    ? "edited"
    : "original";
  let scaleShow = false;
  let scaleValue = 0;
  let scaleInput: HTMLInputElement | undefined;

  const lemmaToIngredientIndex = (
    lemma: string,
    matchedIngredients: ReturnType<
      typeof searchInstructionForIngredients
    >["ingredientMatches"],
  ) =>
    matchedIngredients
      .map((ing, i) => ({ ...ing, i }))
      .filter(ing => ing.nounLemmas.item.includes(lemma))[0].i;

  const toHtml = (
    text: string,
    matches: ReturnType<typeof searchInstructionForIngredients>,
  ) => {
    let result = text;
    for (const match of matches.instructionMatches) {
      const w = match.value;
      const i = lemmaToIngredientIndex(match.lemma, matches.ingredientMatches);
      const re = new RegExp(`\\b${w}\\b`, "g");
      result = result.replaceAll(
        re,
        `<span class="font-bold text-matches-${i % 6}">${w}</span>`,
      );
    }
    return result;
  };

  $: rec = $toBeCooked ? $toBeCooked[version] : undefined;
  $: instructions = toArray(rec?.recipeInstructions);
  $: instructionText = instructions[instructionIndex];
  $: ingredients = toArray(rec?.recipeIngredient).filter(i => i !== undefined);
  $: matches = searchInstructionForIngredients(instructionText, ingredients);
  $: matchedIngredients = uniqueByKey("value", matches.ingredientMatches);
  $: unmatchedIngredients = ingredients.filter(
    ing => !matchedIngredients.map(mi => mi.value).includes(ing),
  );
  $: instructionHtml = toHtml(instructionText ?? "", matches);
</script>

<svelte:head>
  <title>cook | recipes</title>
  <meta name="description" content="cook" />
</svelte:head>

{#if !$toBeCooked}
  <h2>Select a recipe to cook it.</h2>
  <Gallery recipes={$recipes?.slice(0, 4)} selectStores={[toBeCooked]} />
{:else}
  {#if $toBeCooked.edited !== undefined}
    <div class="group">
      <label for="cook-version" class="focal">version</label>
      <select
        name="cook-version"
        class="long"
        id="cook-version"
        bind:value={version}
      >
        <option value="original">original</option>
        <option value="edited" disabled={$toBeCooked.edited === undefined}
          >edited</option
        >
      </select>
    </div>
  {/if}
  <h1>{rec?.name}</h1>
  <RecipeStats
    prepTime={rec?.prepTime}
    cookTime={rec?.cookTime}
    totalTime={rec?.totalTime}
    recipeYield={parseYield(rec?.recipeYield)}
    editing={{
      timeEditable: false,
      timeEdit: () => {},
      yieldEditable: true,
      yieldEdit: async () => {
        scaleValue = parseYield(rec?.recipeYield) ?? 0;
        scaleShow = true;
        await delay(10);
        scaleInput?.focus();
      },
    }}
  />
  <div class="instruction">
    <SmoothHeight>
      {#each instructions as _, i}
        {#if i === instructionIndex}
          <p in:fly={{ x: direction === "r" ? 200 : -200 }}>
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
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
          toArray(rec?.recipeInstructions).length - 1}
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
      <li class="hidden text-matches-0">dummy</li>
      <li class="hidden text-matches-1">dummy</li>
      <li class="hidden text-matches-2">dummy</li>
      <li class="hidden text-matches-3">dummy</li>
      <li class="hidden text-matches-4">dummy</li>
      <li class="hidden text-matches-5">dummy</li>
      {#each matchedIngredients as ing, i}
        <li class="font-bold text-matches-{i % 6}">
          {ing.value}
        </li>
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
<Dialog title="scale recipe" show={scaleShow}>
  <form
    on:submit={e => {
      e.preventDefault();
      const prevYield = parseYield(rec?.recipeYield);
      const newYield = scaleValue;
      if (!prevYield) {
        throw new Error(`can't scale from ${prevYield} to ${newYield}`);
      }
      const scaling = newYield / prevYield;
      const ingredients = toArray(rec?.recipeIngredient).filter(
        ing => ing !== undefined,
      );
      const scaledIngredients = scaleIngredients(ingredients, scaling);
      toBeCooked.update(rv => {
        if (!rv) {
          return undefined;
        }
        rv[version] = {
          ...(rv[version] ?? rv.original),
          recipeYield: decimalToString(newYield),
          recipeIngredient: scaledIngredients,
        };
        return rv;
      });
      scaleShow = false;
    }}
  >
    <div class="group">
      <label for="scaler" class="focal">serves</label>
      <input
        type="number"
        class="long"
        id="scaler"
        bind:value={scaleValue}
        bind:this={scaleInput}
      />
    </div>
    <button type="submit" class="long bg-file"
      ><i class="bx bx-math"></i> scale</button
    >
  </form>
</Dialog>

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
