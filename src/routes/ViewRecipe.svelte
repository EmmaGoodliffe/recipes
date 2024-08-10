<script lang="ts">
  import RecipeStats from "./RecipeStats.svelte";
  import { isRecipe, type Recipe } from "$lib/types";
  import { dateToText, delay, toArray } from "$lib/util";
  import JsonTable from "./JsonTable.svelte";
  import Dialog from "$lib/Dialog.svelte";
  import { Editable } from "$lib/stores";

  export let recipe: Recipe;
  export let editable = false;

  let editKey: (string & keyof Recipe) | undefined;
  let input: HTMLInputElement | HTMLTextAreaElement | undefined;
  let inputValue = "";
  let longInput = false;

  const edit = async (key: string & keyof Recipe, long = false) => {
    editKey = key;
    longInput = long;
    await delay(10);
    input?.focus();
  };

  $: rec = new Editable(recipe, isRecipe);
  $: authors = toArray($rec("author"));
  $: authorNames = authors.length
    ? authors.map(a => a?.name ?? "?").join(", ")
    : "?";
  $: pub = $rec("publisher");
  $: editObj = $rec(editKey ?? "name");

  $: {
    if (typeof editObj === "string") {
      inputValue = editObj;
    }
  }
</script>

<article class="px-4 pb-4">
  <header class="mx-2 py-4 text-center">
    <div class="text-lg">
      <button
        class="font-bold"
        disabled={!editable}
        on:click={() => edit("name")}>{$rec("name")}</button
      >
      {#if $rec("url")}
        <a href={$rec("url")} class="hover:underline" target="_blank"
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
  {#if $rec("image")?.url}
    <div class="max-w-2xl mx-auto">
      <button
        class="mx-auto block"
        disabled={!editable}
        on:click={() => edit("image")}
      >
        <img
          src={$rec("image")?.url}
          alt={$rec("name")}
          class="max-w-[75%] mx-auto pb-4 rounded"
        />
      </button>
    </div>
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
    {#if $rec("dateModified")}
      <div class="mx-2 text-sm text-center opacity-50">
        <span class="italic">edited in</span>
        <abbr
          title={dateToText($rec("dateModified"))?.full}
          class="underline-offset-2"
          >{dateToText($rec("dateModified"))?.month}</abbr
        >
        <!-- TODO: version history -->
      </div>
    {/if}
  </div>
  <button
    class="my-2 px-2 py-2 text-left"
    on:click={() => edit("description", true)}
    >{$rec("description") ?? ""}</button
  >
  <RecipeStats
    prepTime={$rec("prepTime")}
    cookTime={$rec("cookTime")}
    totalTime={$rec("totalTime")}
    recipeYield={$rec("recipeYield")}
  />
  <div class="px-2">
    <div class="pt-4 pb-1 font-bold">Ingredients</div>
    <ul>
      {#each toArray($rec("recipeIngredient")) as ing}
        <li>{ing}</li>
      {/each}
    </ul>
    <div class="pt-4 pb-1 font-bold">Instructions</div>
    <ol class="list-inside list-decimal">
      {#each toArray($rec("recipeInstructions")) as step}
        <li class="truncate">{step?.text ?? "?"}</li>
      {/each}
    </ol>
    <div class="pt-4 pb-1 font-bold">Nutrition info</div>
    <ul>
      {#each Object.values($rec("nutrition") ?? {}).filter(v => v !== "NutritionInformation") as info}
        <li>{info}</li>
      {/each}
    </ul>
  </div>
  <JsonTable
    obj={rec.getUnread()}
    {editable}
    onEdit={edits => {
      // TODO: edit
    }}
  />
</article>
<Dialog
  show={editable && editKey !== undefined}
  title="edit {editKey ?? ''}"
  onClose={() => (editKey = undefined)}
>
  {#if typeof editObj === "string"}
    <form
      on:submit={() => {
        rec.setByPath(editKey ?? "", inputValue);
        editKey = undefined;
      }}
    >
      <div class="group">
        <label for="edit-value" class="focal font-mono">{editKey}</label>
        {#if longInput}
          <div>
            <textarea
              class="w-full h-36 px-2 py-1 bg-input rounded"
              id="edit-value"
              bind:value={inputValue}
              bind:this={input}
            ></textarea>
          </div>
        {:else}
          <input
            type="text"
            class="long"
            id="edit-value"
            bind:value={inputValue}
            bind:this={input}
          />
        {/if}
      </div>
    </form>
  {:else if typeof editObj === "object"}
    <p class="text-center opacity-50 font-semibold">
      Tap on a property to change it.
    </p>
    <div class="w-[fit-content] mx-auto">
      <JsonTable
        obj={editObj}
        editable={true}
        pathPrefix={editKey}
        onEdit={edits => {
          for (const edit of edits) {
            if (edit.mode === "overwrite") {
              rec.setByPath(edit.path, edit.value);
            } else if (edit.mode === "add") {
              console.log(rec.addByPath(edit.path, edit.value));
            } else {
              throw new Error(`unknown edit mode ${edit.mode}`);
            }
          }
        }}
      />
    </div>
  {:else}
    <p>Don't know how to edit type {typeof editObj}</p>
  {/if}
</Dialog>
