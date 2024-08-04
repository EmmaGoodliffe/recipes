<script lang="ts">
  import Dialog from "./Dialog.svelte";
  import { enhance } from "$app/forms";
  import { isRecipe, type Recipe } from "$lib/types";
  import PreviewRecipe from "./PreviewRecipe.svelte";
  import { delay } from "$lib/util";
  import LoaderButton from "./LoaderButton.svelte";
  import { toast } from "$lib/stores";
  import egRecipe from "$lib/eg.json";

  let show = false;
  let loading = false;
  let method: "by-url" | "from-clipboard" = "by-url";
  let recipe: Recipe | undefined = egRecipe as Recipe;
  let onCancel = () => {};
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
    <div class="w-full bg-bg px-4 py-2">
      <LoaderButton
        text="+ confirm"
        onClick={() => {
          // TODO: add recipe
        }}
      />
    </div>
  {/if}
</Dialog>
