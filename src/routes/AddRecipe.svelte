<script lang="ts">
  import { onMount } from "svelte";
  import { getFb } from "./fb";
  import ViewRecipe from "./ViewRecipe.svelte";
  import type { Recipe } from "$lib/Recipe";
  import type { Auth } from "firebase/auth";
  import type { Firestore } from "firebase/firestore";
  import { enhance } from "$app/forms";
  import { addRecipe } from "$lib/db";
  import Dialog from "$lib/Dialog.svelte";
  import LoaderButton from "$lib/LoaderButton.svelte";
  import { isRecipe, toRecipe } from "$lib/Recipe";
  import { toast, toastWrap, updateData, user } from "$lib/stores";

  let auth: Auth | undefined;
  let db: Firestore | undefined;
  let show = false;
  let loading = false;
  let method: "by-url" | "blank" = "by-url";
  let recipe: Recipe | undefined;
  let onCancel = () => {};

  onMount(() => {
    auth = getFb().auth;
    db = getFb().db;
  });
</script>

<button class="long bg-file" on:click={() => (show = true)}
  ><i class="bx bx-plus"></i> <span class="">recipe</span></button
>
<Dialog bind:show title="add recipe" onClose={onCancel}>
  <div class="px-4">
    <select name="method" class="long" bind:value={method}>
      <option value="by-url">by URL</option>
      <option value="blank">blank</option>
    </select>
  </div>
  {#if recipe === undefined}
    <div class="px-4 pb-2">
      {#if method === "by-url"}
        <form
          action="?/fetchRecipe"
          method="post"
          use:enhance={({ cancel }) => {
            loading = true;
            onCancel = cancel;
            return ({ result }) => {
              loading = false;
              onCancel = () => {};
              if (result.type !== "success") {
                toast("api failed to add recipe");
                console.error(result);
                const error =
                  result.type === "error"
                    ? result.error
                    : result.type === "failure"
                      ? result.data?.message
                      : "";
                throw new Error(`api failed to add recipe: ${error}`);
              }
              const content = result.data?.content;
              if (!isRecipe(content)) {
                throw new Error("invalid recipe");
              }
              console.log({content});
              recipe = content;
            };
          }}
        >
          <input
            type="url"
            name="url"
            placeholder="https://www.example.com"
            value="https://www.bbcgoodfood.com/recipes/courgette-curry"
            class="long font-mono"
          />
          <LoaderButton buttonType="submit" {loading}>go</LoaderButton>
        </form>
      {:else if method === "blank"}
        <button
          type="submit"
          class="long bg-file"
          on:click={() => {
            const uid = $user?.uid ?? "_";
            const rid = `${Date.now()}-${Math.random().toString().slice(2)}`;
            const url = `https://recipes-7ef89.web.app/u/${uid}/r/${rid}`;
            recipe = toRecipe({ url });
          }}>go</button
        >
      {:else}
        <p>Don't know how to add recipe by method {method}</p>
      {/if}
    </div>
  {:else}
    <ViewRecipe recipeVersions={{ original: recipe }} />
  {/if}
  <div slot="footer">
    {#if recipe !== undefined}
      <LoaderButton
        onClick={async () => {
          const res = await toastWrap(addRecipe)(auth, db, recipe);
          show = false;
          recipe = undefined;
          if (res instanceof Error) {
            console.error(res);
          } else {
            toast("added recipe");
            return updateData();
          }
        }}><i class="bx bxs-save"></i> save</LoaderButton
      >
      <button
        class="long cancel"
        on:click={() => {
          show = false;
          recipe = undefined;
        }}><i class="bx bx-x"></i> cancel</button
      >
    {/if}
  </div>
</Dialog>

<style lang="postcss">
  button.long.cancel {
    @apply bg-input;
  }
</style>
