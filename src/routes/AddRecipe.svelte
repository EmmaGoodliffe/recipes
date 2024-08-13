<script lang="ts">
  import { onMount } from "svelte";
  import { getFb } from "./fb";
  import ViewRecipe from "./ViewRecipe.svelte";
  import type { Recipe } from "$lib/types";
  import type { Auth } from "firebase/auth";
  import type { Firestore } from "firebase/firestore";
  import { enhance } from "$app/forms";
  import { addRecipe } from "$lib/db";
  import Dialog from "$lib/Dialog.svelte";
  import LoaderButton from "$lib/LoaderButton.svelte";
  import { toast, toastWrap, updateRecipes } from "$lib/stores";
  import { isRecipe } from "$lib/types";

  let auth: Auth | undefined;
  let db: Firestore | undefined;
  let show = false;
  let loading = false;
  let method: "by-url" | "from-clipboard" = "by-url";
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
      <option value="from-clipboard">from clipboard</option>
    </select>
  </div>
  {#if recipe === undefined}
    {#if method === "by-url"}
      <form
        action="?/fetchRecipe"
        method="post"
        class="px-4 pb-2"
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
            if (!isRecipe(result.data?.content)) {
              toast("invalid recipe");
              console.error(result);
              throw new Error("invalid recipe");
            }
            recipe = result.data.content;
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
    {/if}
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
            return updateRecipes();
          }
        }}><i class="bx bx-save"></i> save</LoaderButton
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
