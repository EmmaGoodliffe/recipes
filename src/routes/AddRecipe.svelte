<script lang="ts">
  import Dialog from "$lib/Dialog.svelte";
  import { enhance } from "$app/forms";
  import { isRecipe, type Recipe } from "$lib/types";
  import PreviewRecipe from "./PreviewRecipe.svelte";
  import LoaderButton from "$lib/LoaderButton.svelte";
  import { toast, toastWrap } from "$lib/stores";
  import { getFb } from "./fb";
  import { doc, getDoc, type Firestore } from "firebase/firestore";
  import { onMount } from "svelte";
  import type { Auth } from "firebase/auth";
  import { addRecipe } from "$lib/db";
  import eg from "$lib/eg.json";

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

<button class="long bg-pri-1" on:click={() => (show = true)}
  >&plus; recipe</button
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
        <LoaderButton text="go" {loading} />
      </form>
    {/if}
  {:else}
    <PreviewRecipe {recipe} />
  {/if}
  <div slot="footer">
    {#if recipe !== undefined}
      <LoaderButton
        text="+ confirm"
        onClick={async () => {
          if ((await toastWrap(addRecipe)(auth, db, recipe)) instanceof Error) {
            show = false;
            recipe = undefined;
          } else {
            recipe = undefined;
            show = false;
            toast("added recipe");
            // TODO: open recipe
          }
        }}
      />
      <button
        class="long cancel"
        on:click={() => {
          recipe = undefined;
          show = false;
        }}>&times; cancel</button
      >
    {/if}
  </div>
</Dialog>

<style lang="postcss">
  button.long.cancel {
    @apply bg-input;
  }
</style>
