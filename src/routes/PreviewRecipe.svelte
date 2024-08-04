<script lang="ts">
  import { toast } from "$lib/stores";
  import type { Recipe } from "$lib/types";
  import { flexArray, objToData, durToText, dateToText } from "$lib/util";
  import LoaderButton from "./LoaderButton.svelte";

  export let recipe: Recipe;

  $: recipeData = objToData(recipe);
  $: authors = flexArray(recipeData.get("author"));
  $: pub = recipeData.get("publisher");
</script>

<article class="px-4 pb-4 max-h-[60vh] overflow-y-scroll">
  <header class="py-4 flex justify-center items-center">
    {#if pub}
      <div class="px-4">
        <img src={pub.logo?.url} alt="{pub.name} logo" class="max-w-12" />
      </div>
    {/if}
    <div class="px-4">
      <div class="text-lg text-center">
        <span class="font-bold">{recipeData.get("name")}</span>
        {#if recipeData.get("url")}
          <a
            href={recipeData.get("url")}
            class="hover:underline"
            target="_blank">(&nearr;)</a
          >
        {/if}
      </div>
      <div>
        {#if authors.length}
          <div>
            <span class="opacity-50 italic">by</span>
            <span>{authors.map(a => a?.name ?? "?").join(", ")}</span>
          </div>
        {/if}
      </div>
    </div>
  </header>
  {#if recipeData.get("image")?.url}
    <img
      src={recipeData.get("image")?.url}
      alt="meal"
      class="max-w-[75%] mx-auto pb-4 rounded"
    />
  {/if}
  {#if recipeData.get("dateModified")}
    <div class="text-sm text-center opacity-50">
      <span class="italic">edited in</span>
      <abbr
        title={dateToText(recipeData.get("dateModified"))?.full}
        class="underline-offset-2"
        >{dateToText(recipeData.get("dateModified"))?.month}</abbr
      >
      <!-- TODO: version history -->
    </div>
  {/if}
  <p class="my-2 px-2 py-2">{recipeData.get("description") ?? ""}</p>
  <div class="stats">
    <div class="times">
      <div class="stat">
        <span class="quantity"
          >{durToText(recipeData.get("cookTime")) ?? "?:??"}</span
        >
        <span class="label">cook</span>
      </div>
      <div class="stat">
        <span class="quantity"
          >{durToText(recipeData.get("prepTime")) ?? "?:??"}</span
        >
        <span class="label">prep</span>
      </div>
      <div class="stat">
        <span class="quantity"
          >{durToText(recipeData.get("totalTime")) ?? "?:??"}</span
        >
        <span class="label">total</span>
      </div>
    </div>
    <div class="serves">
      <div class="stat">
        <span class="label">serves</span>
        <span class="quantity">{recipeData.get("recipeYield") ?? "?"}</span>
      </div>
    </div>
  </div>
  <div class="px-2">
    <div class="pt-4 pb-1 font-bold">Ingredients</div>
    <ul class="list-inside">
      {#each flexArray(recipeData.get("recipeIngredient")) as ing}
        <li>{ing}</li>
      {/each}
    </ul>
    <div class="pt-4 pb-1 font-bold">Instructions</div>
    <ol class="list-inside list-decimal">
      {#each flexArray(recipeData.get("recipeInstructions")) as step}
        <li class="truncate">{step?.text ?? "?"}</li>
      {/each}
    </ol>
    <div class="pt-4 pb-1 font-bold">Nutrition info</div>
    <ul class="list-inside">
      {#each Object.values(recipeData.get("nutrition") ?? {}).filter(v => v !== "NutritionInformation") as info}
        <li>{info}</li>
      {/each}
    </ul>
  </div>
  <table class="my-4 font-mono border-input border-2">
    <tbody>
      {#each Array.from(recipeData.unread).filter(k => k[0] !== "@") as key}
        <tr class="border-input">
          <td class="px-2 border-r-2 border-input">{key}</td>
          <td class="px-2 json"
            >{JSON.stringify(recipeData.get(key), null, 2)}</td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</article>

<style lang="postcss">
  ul li::marker {
    content: "  →  ";
  }

  .stats {
    @apply flex justify-between max-w-80 mx-auto;
  }

  .times {
    @apply flex justify-between border-2 border-input rounded;
  }

  .serves {
    @apply border-2 border-input rounded;
  }

  .stat {
    @apply flex flex-col items-center px-4 py-2 border-input;
  }

  .stat:not(:last-child) {
    @apply border-r-2;
  }

  .quantity {
    @apply font-mono font-bold;
  }

  .label {
    @apply text-sm italic;
  }

  .json {
    overflow-wrap: anywhere;
  }

  table {
    /* legwork for border radius */
    @apply rounded;
    overflow: hidden;
    display: inline-block;
  }

  tr:not(:last-child) {
    @apply border-b-2;
  }
</style>
