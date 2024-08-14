<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { getFb } from "./fb";
  import JsonTable from "./JsonTable.svelte";
  import RecipeStats from "./RecipeStats.svelte";
  import type { Recipe, RecipeVersions } from "$lib/types";
  import {
    deleteEditedRecipe,
    deleteOriginalRecipe,
    deleteWholeRecipe,
    saveEditedRecipe,
  } from "$lib/db";
  import Dialog from "$lib/Dialog.svelte";
  import LoaderButton from "$lib/LoaderButton.svelte";
  import { scaleIngredients } from "$lib/nlp";
  import SmoothHeight from "$lib/SmoothHeight.svelte";
  import {
    addIngredientsToShoppingList,
    Editable,
    shoppingList,
    toast,
    toastWrap,
    toBeCooked,
    toBeEdited,
    updateData,
    user,
  } from "$lib/stores";
  import { isRecipe } from "$lib/types";
  import {
    addDurations,
    dateToText,
    deepUnique,
    delay,
    doesEndWith,
    fetchImage,
    hasRequiredKeys,
    parseDur,
    toArray,
    toDur,
  } from "$lib/util";

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
  let revertLoading = false;
  let overwriteLoading = false;
  let deleteLoading = false;
  let showVc = false;
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
  $: authorCredit = name
    ? { name, url: `https://recipes-7ef89.web.app/u/${$user?.uid}` }
    : undefined;
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
    ><i class="bx bx-left-arrow-alt"></i> back</button
  >
  <a
    href="/cook"
    class="long bg-cook inline-block text-center"
    on:click={() =>
      toBeCooked.set({ original: recipeVersions.original, edited: rec.data })}
    ><i class="bx bxs-flask"></i> cook</a
  >
  <a
    href="/shop"
    class="long bg-shop inline-block text-center"
    on:click={() =>
      shoppingList.update(list => {
        const { recipeIngredient, recipeYield } = rec.data;
        console.log({ recipeVersions, version, recipeIngredient });
        return [
          addIngredientsToShoppingList(list.flat(), toArray(recipeIngredient), {
            type: "recipe",
            id: recipeVersions.original["@id"],
            recipeYield,
          }),
        ];
      })}><i class="bx bxs-basket"></i> add to shopping list</a
  >
  <LoaderButton
    loading={saveLoading}
    disabled={version === "original" ||
      revertLoading ||
      overwriteLoading ||
      deleteLoading}
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
      const error = await toastWrap(saveEditedRecipe)(
        auth,
        db,
        recipeVersions.original["@id"],
        data,
      );
      if (!error) {
        toast("saved recipe");
      }
      await updateData();
      saveLoading = false;
    }}><i class="bx bxs-save"></i> save</LoaderButton
  >
  <button class="long bg-input" on:click={() => (showVc = !showVc)}
    ><i class="bx bx-chevron-right transition" class:rotate-90={showVc}></i> version
    control</button
  >
  <div class="my-2">
    <SmoothHeight>
      {#if showVc}
        <div
          class="px-4 py-4 border-2 border-border rounded"
          transition:fade={{}}
        >
          <LoaderButton
            className="long bg-input"
            loading={revertLoading}
            disabled={version === "original" ||
              saveLoading ||
              overwriteLoading ||
              deleteLoading}
            onClick={async () => {
              revertLoading = true;
              const { auth, db } = getFb();
              recipeVersions.edited = undefined;
              rec.setWhole(recipeVersions.original);
              version = "original";
              await toastWrap(deleteEditedRecipe)(
                auth,
                db,
                recipeVersions.original["@id"],
              );
              await updateData();
              revertLoading = false;
            }}
            ><i class="bx bxs-skip-previous-circle lg"></i> revert (delete edited
            version)</LoaderButton
          >
          <LoaderButton
            className="long bg-input"
            loading={overwriteLoading}
            disabled={version === "original" ||
              saveLoading ||
              revertLoading ||
              deleteLoading}
            onClick={async () => {
              overwriteLoading = true;
              const { auth, db } = getFb();
              recipeVersions.original = { ...rec.data };
              recipeVersions.edited = undefined;
              rec.setWhole(recipeVersions.original);
              version = "original";
              await toastWrap(deleteOriginalRecipe)(
                auth,
                db,
                recipeVersions.original["@id"],
              );
              await updateData();
              overwriteLoading = false;
            }}
            ><i class="bx bxs-skip-next-circle lg"></i> overwrite (delete original
            version)</LoaderButton
          >
          <LoaderButton
            className="long bg-danger"
            loading={deleteLoading}
            disabled={version === "original" ||
              saveLoading ||
              revertLoading ||
              overwriteLoading}
            onClick={async () => {
              deleteLoading = true;
              const { auth, db } = getFb();
              await toastWrap(deleteWholeRecipe)(
                auth,
                db,
                recipeVersions.original["@id"],
              );
              toBeEdited.set(undefined);
              await updateData();
              deleteLoading = false;
            }}><i class="bx bxs-trash"></i> delete whole recipe</LoaderButton
          >
        </div>
      {/if}
    </SmoothHeight>
  </div>
  <!-- VERSION -->
  <div class="group text-left">
    <label for="version" class="focal">version</label>
    <select name="version" class="long" id="version" bind:value={version}>
      <option value="original">original</option>
      <option value="edited">edited</option>
    </select>
  </div>
{/if}
<article>
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
    <div class="max-w-sm mx-auto my-2 flex justify-center">
      <button
        class="enforced-rounded shadow-md overflow-hidden"
        {disabled}
        on:click={() => edit("image")}
      >
        <img src={$rec("image")?.url} alt={$rec("name")} />
      </button>
    </div>
  {/if}
  <div class="flex flex-col sm:flex-row justify-center items-center">
    <!-- VIEW: publisher -->
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
      <!-- <div class="pt-4 pb-1 font-bold">
        Nutrition info <button
          class="mx-2 square bg-input"
          class:invisible={disabled}
          disabled={!editable}
          on:click={() => edit("nutrition")}
          ><i class="bx bx-pencil"></i></button
        >
      </div>
      <ul>
        {#each Object.values($rec("nutrition") ?? {}).filter(v => v !== "NutritionInformation") as info}
          <li>{info}</li>
        {/each}
      </ul> -->
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
      <button type="submit" class="long bg-file"
        ><i class="bx bx-list-check"></i> commit edits</button
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
            <label for="scale">scale the ingredients too</label>
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
      <button type="submit" class="long bg-file"
        ><i class="bx bx-list-check"></i> commit edits</button
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
