<script lang="ts">
  import RecipeStats from "./RecipeStats.svelte";
  import { isRecipe, type ExtractEndsWith, type Recipe } from "$lib/types";
  import {
    dateToText,
    delay,
    doesEndWith,
    fetchImage,
    parseDur,
    toArray,
    toDur,
  } from "$lib/util";
  import JsonTable from "./JsonTable.svelte";
  import Dialog from "$lib/Dialog.svelte";
  import { Editable } from "$lib/stores";
  import { onMount } from "svelte";

  export let recipe: Recipe;
  export let editable = false;

  let editKey: (string & keyof Recipe) | undefined;
  let input: HTMLInputElement | HTMLTextAreaElement | undefined;
  let inputValue = "";
  let secondInputValue = "";
  let longInput = false;

  const edit = async (key: string & keyof Recipe) => {
    if (key === "image") {
      inputValue = $rec("image")?.url ?? "";
    } else if (doesEndWith(key, "Time")) {
      const dur = parseDur($rec(key) ?? "");
      inputValue = dur.get("time", "h").toString();
      secondInputValue = dur.get("time", "m").toString();
    }
    longInput = ["description"].includes(key);
    editKey = key;
    await delay(10);
    input?.focus();
  };

  const onEdit = (
    edits: { mode: "overwrite" | "add"; path: string; value: unknown }[],
  ) => {
    for (const edit of edits) {
      if (edit.mode === "overwrite") {
        rec.setByPath(edit.path, edit.value);
      } else if (edit.mode === "add") {
        rec.addByPath(edit.path, edit.value);
      } else {
        throw new Error(`unknown edit mode ${edit.mode}`);
      }
    }
  };

  $: rec = new Editable(recipe, isRecipe);
  $: unread = rec.getUnread();
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

  onMount(() =>
    rec.subscribe(() => {
      unread = rec.getUnread();
    }),
  );
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
  <button class="my-2 px-2 py-2 text-left" on:click={() => edit("description")}
    >{$rec("description") ?? ""}</button
  >
  <RecipeStats
    prepTime={$rec("prepTime")}
    cookTime={$rec("cookTime")}
    totalTime={$rec("totalTime")}
    recipeYield={$rec("recipeYield")}
    {edit}
  />
  <div class="px-2">
    <div class="pt-4 pb-1 font-bold">
      Ingredients <button
        class="mx-2 square bg-input"
        class:hidden={!editable}
        disabled={!editable}
        on:click={() => edit("recipeIngredient")}
        ><i class="bx bx-pencil"></i></button
      >
    </div>
    <ul>
      {#each toArray($rec("recipeIngredient")) as ing}
        <li>{ing}</li>
      {/each}
    </ul>
    <div class="pt-4 pb-1 font-bold">
      Instructions <button
        class="mx-2 square bg-input"
        class:hidden={!editable}
        disabled={!editable}
        on:click={() => edit("recipeInstructions")}
        ><i class="bx bx-pencil"></i></button
      >
    </div>
    <ol class="list-inside list-decimal">
      {#each toArray($rec("recipeInstructions")) as step}
        <li class="truncate">{step?.text ?? "?"}</li>
      {/each}
    </ol>
    <div class="pt-4 pb-1 font-bold">
      Nutrition info <button
        class="mx-2 square bg-input"
        class:hidden={!editable}
        disabled={!editable}
        on:click={() => edit("nutrition")}><i class="bx bx-pencil"></i></button
      >
    </div>
    <ul>
      {#each Object.values($rec("nutrition") ?? {}).filter(v => v !== "NutritionInformation") as info}
        <li>{info}</li>
      {/each}
    </ul>
  </div>
  <JsonTable
    obj={unread}
    {editable}
    onEdit={edits =>
      onEdit(
        edits.map(e => ({
          ...e,
          path: e.path.slice(1), // remove leading dot
        })),
      )}
  />
</article>
<Dialog
  show={editable && editKey !== undefined}
  title="edit {editKey ?? ''}"
  onClose={() => (editKey = undefined)}
>
  {#if editKey?.endsWith("Time")}
    <form
      on:submit={() => {
        const dur = toDur(parseInt(inputValue), parseInt(secondInputValue));
        rec.setByPath(editKey ?? "", dur);
        editKey = undefined;
      }}
    >
      <div class="mb-4 flex justify-center">
        <div class="mx-2 flex flex-col items-center">
          <input
            type="number"
            class="w-48 px-2 py-1 text-2xl text-center font-mono rounded"
            id="hours"
            min="0"
            max="100"
            bind:value={inputValue}
            bind:this={input}
          />
          <label for="hours" class="text-sm italic">hours</label>
        </div>
        <div class="mx-2 flex flex-col items-center">
          <input
            type="number"
            class="w-48 px-2 py-1 text-2xl text-center font-mono rounded"
            id="mins"
            min="0"
            max="60"
            bind:value={secondInputValue}
          />
          <label for="mins" class="text-sm italic">minutes</label>
        </div>
      </div>
      <button type="submit" class="long bg-button"
        ><i class="bx bx-check"></i> confirm edits</button
      >
    </form>
  {:else if typeof editObj === "string" || typeof editObj === "number" || editKey === "image"}
    <form
      on:submit={async () => {
        if (editKey === "image") {
          const image = await fetchImage(inputValue);
          rec.set("image", {
            url: inputValue,
            width: image.width,
            height: image.height,
          });
        } else {
          rec.setByPath(editKey ?? "", inputValue);
        }
        editKey = undefined;
      }}
    >
      <div class="mb-4 group">
        <label for="edit-value" class="focal font-mono">{editKey}</label>
        {#if longInput}
          <div>
            <textarea
              id="edit-value"
              bind:value={inputValue}
              bind:this={input}
            />
          </div>
        {:else if typeof editObj === "number"}
          <input
            type="number"
            class="long font-mono"
            id="edit-value"
            bind:value={inputValue}
            bind:this={input}
          />
        {:else}
          <input
            type="text"
            class="long"
            class:font-mono={editKey === "image"}
            id="edit-value"
            bind:value={inputValue}
            bind:this={input}
          />
        {/if}
      </div>
      <button type="submit" class="long bg-button"
        ><i class="bx bx-check"></i> confirm edits</button
      >
    </form>
  {:else if typeof editObj === "object"}
    <p class="text-center opacity-50 font-semibold">
      Tap on a property to change it.
    </p>
    <div class="w-[fit-content] mx-auto">
      <JsonTable obj={editObj} editable={true} pathPrefix={editKey} {onEdit} />
    </div>
  {:else}
    <p>Don't know how to edit type {typeof editObj}</p>
  {/if}
</Dialog>
