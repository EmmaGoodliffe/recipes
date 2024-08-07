<script lang="ts">
  import { onMount } from "svelte";
  import { getFb } from "./fb";
  import PreviewRecipe from "./PreviewRecipe.svelte";
  import type { Recipe } from "$lib/types";
  import type { Auth } from "firebase/auth";
  import type { Firestore } from "firebase/firestore";
  import { enhance } from "$app/forms";
  import { addRecipe } from "$lib/db";
  import Dialog from "$lib/Dialog.svelte";
  import LoaderButton from "$lib/LoaderButton.svelte";
  import { toast, toastWrap, updateRecipes } from "$lib/stores";
  import { isRecipe } from "$lib/types";

  let auth: Auth | undefined = undefined;
  let db: Firestore | undefined = undefined;
  let show = false;
  let loading = false;
  let method: "by-url" | "from-clipboard" = "by-url";
  let recipe: Recipe | undefined = undefined;
  let onCancel = () => {};

  onMount(() => {
    auth = getFb().auth;
    db = getFb().db;
  });
</script>

<button class="long bg-button" on:click={() => (show = true)}
  ><i class="bx bx-plus align-middle"></i> <span class="">recipe</span></button
>
<Dialog bind:show title="add recipe" onBlur={onCancel}>
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
        <LoaderButton {loading}>go</LoaderButton>
      </form>
    {/if}
  {:else}
    <PreviewRecipe {recipe} />
  {/if}
  <div slot="footer">
    {#if recipe !== undefined}
      <LoaderButton
        onClick={async () => {
          if ((await toastWrap(addRecipe)(auth, db, recipe)) instanceof Error) {
            show = false;
            recipe = undefined;
          } else {
            recipe = undefined;
            show = false;
            toast("added recipe");
            return updateRecipes();
          }
        }}><i class="bx bx-save align-middle"></i> save</LoaderButton
      >
      <button
        class="long cancel"
        on:click={() => {
          recipe = undefined;
          show = false;
        }}><i class="bx bx-x align-middle"></i> cancel</button
      >
    {/if}
  </div>
</Dialog>

<style lang="postcss">
  button.long.cancel {
    @apply bg-input;
  }
</style>
