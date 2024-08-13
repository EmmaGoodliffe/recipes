<script lang="ts">
  import { onMount } from "svelte";
  import { getFb } from "./fb";
  import JsonTable from "./JsonTable.svelte";
  import RecipeStats from "./RecipeStats.svelte";
  import type { Recipe, RecipeVersions } from "$lib/types";
  import { deleteEditedRecipe, saveEditedRecipe } from "$lib/db";
  import Dialog from "$lib/Dialog.svelte";
  import LoaderButton from "$lib/LoaderButton.svelte";
  import {
    Editable,
    toastWrap,
    toBeEdited,
    updateRecipes,
    user,
  } from "$lib/stores";
  import { isRecipe } from "$lib/types";
  import {
    addDurations,
    dateToText,
    delay,
    doesEndWith,
    fetchImage,
    parseDur,
    toArray,
    toDur,
    hasRequiredKeys,
    deepUnique,
  } from "$lib/util";
  import { scaleIngredients } from "$lib/nlp";

  export let recipeVersions: RecipeVersions;
  export let editable = false;
  export let concise = false;

  let editKey: (string & keyof Recipe) | undefined;
  let unread: Partial<Recipe> = {};
  let input: HTMLInputElement | HTMLTextAreaElement | undefined;
  let inputValue = "";
  let hValue = "";
  let mValue = "";
  let longInput = false;
  let saveLoading = false;
  let resetLoading = false;
  let scale = true;
  let version: "original" | "edited" = "edited";
  let authorCredit: { name: string; url?: string } | undefined;

  const edit = async (key: string & keyof Recipe) => {
    if (key === "image") {
      inputValue = $rec("image")?.url ?? "";
    } else if (doesEndWith(key, "Time")) {
      const dur = parseDur($rec(key) ?? "");
      hValue = dur.get("h").toString();
      mValue = dur.get("m").toString();
    }
    longInput = ["description"].includes(key);
    editKey = key;
    await delay(10);
    input?.focus();
  };

  const onEdit = (
    edits: (
      | { mode: "overwrite" | "add"; path: string; value: unknown }
      | { mode: "delete"; path: string }
    )[],
  ) => {
    for (const edit of edits) {
      if (edit.mode === "overwrite") {
        rec.setByPath(edit.path, edit.value);
      } else if (edit.mode === "add") {
        rec.addByPath(edit.path, edit.value);
      } else if (edit.mode === "delete") {
        rec.deleteByPath(edit.path);
      } else {
        throw new Error(`unknown edit mode ${edit.mode}`);
      }
    }
  };

  $: rec = new Editable(
    recipeVersions[version] ?? recipeVersions.original,
    isRecipe,
  );
  $: disabled = !(editable && version === "edited");
  $: name = $user?.displayName;
  $: authorCredit = name ? { name } : undefined;
  $: authors = toArray($rec("author"));
  $: authorNames = authors.length
    ? authors.map(a => a?.name ?? "?").join(", ")
    : "?";
  $: pub = $rec("publisher");
  $: editObj = $rec(editKey ?? "name");

  $: {
    if (typeof editObj === "number" || typeof editObj === "string") {
      inputValue = `${editObj}`;
    }
  }

  onMount(() =>
    rec.subscribe(() => {
      unread = rec.getUnread();
    }),
  );
</script>

<!-- MENU -->
{#if editable}
  <button class="long bg-input" on:click={() => toBeEdited.set(undefined)}
    ><i class="bx bx-chevron-left align-middle"></i> cancel</button
  >
  <LoaderButton
    loading={saveLoading}
    disabled={version === "original" || resetLoading}
    onClick={async () => {
      saveLoading = true;
      const existentAuthors = authors
        .filter(a => a !== undefined)
        .filter(a => hasRequiredKeys(a, ["name"]));
      const data = {
        ...rec.data,
        dateModified: new Date().toISOString(),
        author: deepUnique([...existentAuthors, ...toArray(authorCredit)]),
      };
      recipeVersions.edited = data;
      const { auth, db } = getFb();
      await toastWrap(saveEditedRecipe)(
        auth,
        db,
        recipeVersions.original["@id"],
        data,
      );
      saveLoading = false;
      updateRecipes(); // not awaited
    }}><i class="bx bx-save align-middle"></i> save</LoaderButton
  >
  <LoaderButton
    className="long bg-input"
    loading={resetLoading}
    disabled={version === "original" || saveLoading}
    onClick={async () => {
      resetLoading = true;
      const { auth, db } = getFb();
      recipeVersions.edited = { ...recipeVersions.original };
      version = "original";
      await toastWrap(deleteEditedRecipe)(
        auth,
        db,
        recipeVersions.original["@id"],
      );
      resetLoading = false;
      updateRecipes(); // not awaited
    }}
    ><i class="bx bx-reset align-middle"></i> revert to original version</LoaderButton
  >
  <!-- VERSION -->
  <div class="group text-left">
    <label for="version" class="focal">version</label>
    <select name="version" class="long" id="version" bind:value={version}>
      <option value="original">original</option>
      <option value="edited">edited</option>
    </select>
  </div>
{/if}
<article class="px-4 pb-4">
  <header class="mx-2 py-4 text-center">
    <div class="text-lg">
      <!-- VIEW: name -->
      <button class="font-bold" {disabled} on:click={() => edit("name")}
        >{$rec("name")}</button
      >
      <!-- VIEW: url -->
      {#if $rec("url")}
        <a href={$rec("url")} class="hover:underline" target="_blank"
          >(&nearr;)</a
        >
      {/if}
    </div>
    <!-- VIEW: author -->
    <div>
      <span class="opacity-50 italic">by</span>
      <button {disabled} on:click={() => edit("author")}>{authorNames}</button>
    </div>
  </header>
  <!-- VIEW: image -->
  {#if $rec("image")?.url}
    <div class="max-w-2xl mx-auto">
      <button class="mx-auto block" {disabled} on:click={() => edit("image")}>
        <img
          src={$rec("image")?.url}
          alt={$rec("name")}
          class="max-w-[75%] mx-auto pb-4 rounded"
        />
      </button>
    </div>
  {/if}
  <!-- VIEW: publisher -->
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
    <!-- VIEW: history -->
    {#if $rec("dateModified")}
      <div class="mx-2 text-sm text-center opacity-50">
        <span class="italic">published in</span>
        <abbr
          title={dateToText($rec("datePublished"))?.full}
          class="underline-offset-2"
          >{dateToText($rec("datePublished"))?.month}</abbr
        >
        <span class="italic"> and edited in</span>
        <abbr
          title={dateToText($rec("dateModified"))?.full}
          class="underline-offset-2"
          >{dateToText($rec("dateModified"))?.month}</abbr
        >
      </div>
    {/if}
  </div>
  <!-- VIEW: description -->
  <button
    class="my-2 px-2 py-2 text-left"
    {disabled}
    on:click={() => edit("description")}>{$rec("description") ?? ""}</button
  >
  <!-- VIEW: stats -->
  <RecipeStats
    prepTime={$rec("prepTime")}
    cookTime={$rec("cookTime")}
    totalTime={$rec("totalTime")}
    recipeYield={$rec("recipeYield")}
    editing={{
      timeEditable: !disabled,
      timeEdit: edit,
      yieldEditable: !disabled,
      yieldEdit: () => {
        if (editable) {
          edit("recipeYield");
        } else {
          console.log("editing yield");
        }
      },
    }}
  />
  {#if !concise}
    <!-- VIEW: ingredients -->
    <div class="px-2">
      <div class="pt-4 pb-1 font-bold">
        Ingredients <button
          class="mx-2 square bg-input"
          class:invisible={disabled}
          {disabled}
          on:click={() => edit("recipeIngredient")}
          ><i class="bx bx-pencil"></i></button
        >
      </div>
      <ul>
        {#each toArray($rec("recipeIngredient")) as ing}
          <li>{ing}</li>
        {/each}
      </ul>
      <!-- VIEW: instructions -->
      <div class="pt-4 pb-1 font-bold">
        Instructions <button
          class="mx-2 square bg-input"
          class:invisible={disabled}
          {disabled}
          on:click={() => edit("recipeInstructions")}
          ><i class="bx bx-pencil"></i></button
        >
      </div>
      <!-- VIEW: steps -->
      <ol class="list-inside list-decimal">
        {#each toArray($rec("recipeInstructions")) as step}
          <li class="truncate">{step?.text ?? "?"}</li>
        {/each}
      </ol>
      <!-- VIEW: nutrition -->
      <div class="pt-4 pb-1 font-bold">
        Nutrition info <button
          class="mx-2 square bg-input"
          class:invisible={disabled}
          disabled={!editable}
          on:click={() => edit("nutrition")}
          ><i class="bx bx-pencil"></i></button
        >
        <!-- TODO: scale nutrition info -->
      </div>
      <ul>
        {#each Object.values($rec("nutrition") ?? {}).filter(v => v !== "NutritionInformation") as info}
          <li>{info}</li>
        {/each}
      </ul>
    </div>
    <!-- VIEW: other -->
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
  {/if}
</article>
<Dialog
  show={editable && editKey !== undefined}
  title="edit {editKey ?? ''}"
  onClose={() => (editKey = undefined)}
>
  {#if editKey?.endsWith("Time")}
    <!-- EDIT: times -->
    <form
      on:submit={e => {
        e.preventDefault();
        const dur = toDur({ h: parseInt(hValue), m: parseInt(mValue) });
        const prepTime = editKey === "prepTime" ? dur : rec.get("prepTime");
        const cookTime = editKey === "cookTime" ? dur : rec.get("cookTime");
        const totalDur = addDurations([prepTime, cookTime]);
        console.log([prepTime, cookTime, totalDur]);
        rec.setByPath(editKey ?? "", dur);
        rec.set("totalTime", totalDur);
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
            bind:value={hValue}
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
            bind:value={mValue}
          />
          <label for="mins" class="text-sm italic">minutes</label>
        </div>
      </div>
      <button type="submit" class="long bg-cook"
        ><i class="bx bx-file align-middle"></i> commit edits</button
      >
    </form>
  {:else if typeof editObj === "string" || typeof editObj === "number" || editKey === "image"}
    <!-- EDIT: values -->
    <form
      on:submit={async e => {
        e.preventDefault();
        if (editKey === "image") {
          const image = await fetchImage(inputValue);
          rec.set("image", {
            url: inputValue,
            width: image.width,
            height: image.height,
          });
        } else if (editKey === "recipeYield" && scale) {
          const prevYield = rec.get("recipeYield");
          const newYield = parseFloat(inputValue);
          if (!prevYield) {
            throw new Error(`can't scale yield ${prevYield}`);
          }
          const scaling = newYield / prevYield;
          const ingredients = toArray(rec.get("recipeIngredient")).filter(
            ing => ing !== undefined,
          );
          const scaledIngredients = scaleIngredients(ingredients, scaling);
          rec.set("recipeYield", newYield);
          rec.set("recipeIngredient", scaledIngredients);
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
          <div class="check">
            <input
              type="checkbox"
              name="scale"
              id="scale"
              bind:checked={scale}
            />
            <label for="scale" class="font-semibold"
              >scale the ingredients too</label
            >
          </div>
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
      <button type="submit" class="long bg-cook"
        ><i class="bx bx-file align-middle"></i> commit edits</button
      >
    </form>
  {:else if typeof editObj === "object"}
    <!-- EDIT: objects -->
    <p class="text-center opacity-50 font-semibold">
      Tap on a property to change it.
    </p>
    {#if editKey === "author"}
      <p class="text-center opacity-50 font-semibold">
        You will be credited as an author automatically when you save.
      </p>
    {/if}
    <div class="w-[fit-content] mx-auto">
      <JsonTable obj={editObj} editable={true} pathPrefix={editKey} {onEdit} />
    </div>
  {:else}
    <p>Don't know how to edit type {typeof editObj}</p>
  {/if}
</Dialog>
