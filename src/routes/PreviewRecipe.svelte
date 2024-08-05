<script lang="ts">
  import { toast } from "$lib/stores";
  import type { Recipe } from "$lib/types";
  import { toArray, toReader, durToText, dateToText } from "$lib/util";
  import LoaderButton from "$lib/LoaderButton.svelte";

  export let recipe: Recipe;

  $: recReader = toReader(recipe);
  $: authors = toArray(recReader.get("author"));
  $: pub = recReader.get("publisher");
</script>

<article class="px-4 pb-4 max-h-[60vh] overflow-y-scroll">
  <header class="mx-2 py-4 text-center">
    <div class="text-lg">
      <span class="font-bold">{recReader.get("name")}</span>
      {#if recReader.get("url")}
        <a href={recReader.get("url")} class="hover:underline" target="_blank"
          >(&nearr;)</a
        >
      {/if}
    </div>
    {#if authors.length}
      <div>
        <span class="opacity-50 italic">by</span>
        <span>{authors.map(a => a?.name ?? "?").join(", ")}</span>
      </div>
    {/if}
  </header>
  {#if recReader.get("image")?.url}
    <img
      src={recReader.get("image")?.url}
      alt={recReader.get("name")}
      class="max-w-[75%] mx-auto pb-4 rounded"
    />
  {/if}
  <div class="flex justify-center items-center">
    {#if pub}
      <a href={pub.url} target="_blank">
        <img
          src={pub.logo?.url}
          alt="{pub.name} logo"
          class="w-24 mx-2"
          style="filter: contrast(50%);"
        />
      </a>
    {/if}
    {#if recReader.get("dateModified")}
      <div class="mx-2 text-sm text-center opacity-50">
        <span class="italic">edited in</span>
        <abbr
          title={dateToText(recReader.get("dateModified"))?.full}
          class="underline-offset-2"
          >{dateToText(recReader.get("dateModified"))?.month}</abbr
        >
        <!-- TODO: version history -->
      </div>
    {/if}
  </div>
  <p class="my-2 px-2 py-2">{recReader.get("description") ?? ""}</p>
  <div class="stats">
    <div class="times">
      <div class="stat">
        <span class="quantity"
          >{durToText(recReader.get("cookTime")) ?? "?:??"}</span
        >
        <span class="label">cook</span>
      </div>
      <div class="stat">
        <span class="quantity"
          >{durToText(recReader.get("prepTime")) ?? "?:??"}</span
        >
        <span class="label">prep</span>
      </div>
      <div class="stat">
        <span class="quantity"
          >{durToText(recReader.get("totalTime")) ?? "?:??"}</span
        >
        <span class="label">total</span>
      </div>
    </div>
    <div class="serves">
      <div class="stat">
        <span class="label">serves</span>
        <span class="quantity">{recReader.get("recipeYield") ?? "?"}</span>
      </div>
    </div>
  </div>
  <div class="px-2">
    <div class="pt-4 pb-1 font-bold">Ingredients</div>
    <ul class="list-inside">
      {#each toArray(recReader.get("recipeIngredient")) as ing}
        <li>{ing}</li>
      {/each}
    </ul>
    <div class="pt-4 pb-1 font-bold">Instructions</div>
    <ol class="list-inside list-decimal">
      {#each toArray(recReader.get("recipeInstructions")) as step}
        <li class="truncate">{step?.text ?? "?"}</li>
      {/each}
    </ol>
    <div class="pt-4 pb-1 font-bold">Nutrition info</div>
    <ul class="list-inside">
      {#each Object.values(recReader.get("nutrition") ?? {}).filter(v => v !== "NutritionInformation") as info}
        <li>{info}</li>
      {/each}
    </ul>
  </div>
  <table class="my-4 enforced-rounded font-mono border-input border-2">
    <tbody>
      {#each Array.from(recReader.unread).filter(k => k[0] !== "@") as key}
        <tr class="border-input">
          <td class="px-2 border-r-2 border-input">{key}</td>
          <td class="px-2 json"
            >{JSON.stringify(recReader.get(key), null, 2)}</td
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

  tr:not(:last-child) {
    @apply border-b-2;
  }
</style>
