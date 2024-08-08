<script lang="ts">
  import RecipeStats from "./RecipeStats.svelte";
  import type { Recipe } from "$lib/types";
  import { dateToText, delay, toArray, toEditable } from "$lib/util";
  import Dialog from "$lib/Dialog.svelte";
  import EditRecipe from "./EditRecipe.svelte";
  import JsonTable from "./JsonTable.svelte";

  export let recipe: Recipe;
  export let editable = false;

  let editKey: (string & keyof Recipe) | undefined;

  const edit = async (key: string & keyof Recipe) => {
    editKey = key;
    await delay(10);
    // TODO: focus input
  };

  $: recEdit = toEditable(recipe);
  $: authors = toArray(recEdit.get("author"));
  $: authorNames = authors.length
    ? authors.map(a => a?.name ?? "?").join(", ")
    : "?";
  $: pub = recEdit.get("publisher");
</script>

<article class="px-4 pb-4">
  <header class="mx-2 py-4 text-center">
    <div class="text-lg">
      <!-- <span class="font-bold">{recEdit.get("name")}</span> -->
      <button
        class="font-bold"
        disabled={!editable}
        on:click={() => edit("name")}>{recEdit.get("name")}</button
      >
      {#if recEdit.get("url")}
        <a href={recEdit.get("url")} class="hover:underline" target="_blank"
          >(&nearr;)</a
        >
      {/if}
    </div>
    <div>
      <span class="opacity-50 italic">by</span>
      <button disabled={!editable} on:click={() => edit("author")}
        >{authorNames}</button
      >
    </div>
  </header>
  {#if recEdit.get("image")?.url}
    <img
      src={recEdit.get("image")?.url}
      alt={recEdit.get("name")}
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
    {#if recEdit.get("dateModified")}
      <div class="mx-2 text-sm text-center opacity-50">
        <span class="italic">edited in</span>
        <abbr
          title={dateToText(recEdit.get("dateModified"))?.full}
          class="underline-offset-2"
          >{dateToText(recEdit.get("dateModified"))?.month}</abbr
        >
        <!-- TODO: version history -->
      </div>
    {/if}
  </div>
  <p class="my-2 px-2 py-2">{recEdit.get("description") ?? ""}</p>
  <RecipeStats
    prepTime={recEdit.get("prepTime")}
    cookTime={recEdit.get("cookTime")}
    totalTime={recEdit.get("totalTime")}
    recipeYield={recEdit.get("recipeYield")}
  />
  <div class="px-2">
    <div class="pt-4 pb-1 font-bold">Ingredients</div>
    <ul>
      {#each toArray(recEdit.get("recipeIngredient")) as ing}
        <li>{ing}</li>
      {/each}
    </ul>
    <div class="pt-4 pb-1 font-bold">Instructions</div>
    <ol class="list-inside list-decimal">
      {#each toArray(recEdit.get("recipeInstructions")) as step}
        <li class="truncate">{step?.text ?? "?"}</li>
      {/each}
    </ol>
    <div class="pt-4 pb-1 font-bold">Nutrition info</div>
    <ul>
      {#each Object.values(recEdit.get("nutrition") ?? {}).filter(v => v !== "NutritionInformation") as info}
        <li>{info}</li>
      {/each}
    </ul>
  </div>
  <!-- TODO: unread properties -->
  <p>...</p>
  <!-- <JsonTable
    obj={recEdit.getUnread()}
    editing={{ enabled: editable }}
    onClick={p => {
      // TODO: handle
      console.log("table click!", p);
    }}
  /> -->
</article>
<EditRecipe
  show={editable && editKey !== undefined}
  {recEdit}
  key={editKey ?? "name"}
  onEdit={() => {
    // TODO: handle edit
    editKey = undefined;
  }}
/>
