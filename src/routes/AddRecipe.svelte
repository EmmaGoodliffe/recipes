<script lang="ts">
  import Dialog from "./Dialog.svelte";
  import { enhance } from "$app/forms";
  import { isRecipe, type Recipe } from "$lib/types";
  import PreviewRecipe from "./PreviewRecipe.svelte";
  import { delay } from "$lib/util";
  import LoaderButton from "./LoaderButton.svelte";

  let show = true;
  let loading = false;
  let method: "by-url" | "from-clipboard" = "by-url";
  let recipe: Recipe | undefined = undefined;
</script>

<button class="long bg-pri-1" on:click={() => (show = true)}
  >&plus; recipe</button
>
<Dialog bind:show title="add recipe" wide={true}>
  <select name="method" class="long" bind:value={method}>
    <option value="by-url">by URL</option>
    <option value="from-clipboard">from clipboard</option>
  </select>
  {#if recipe === undefined}
    {#if method === "by-url"}
      <form
        action="?/fetchRecipe"
        method="post"
        use:enhance={async () => {
          loading = true;
          return ({ result }) => {
            loading = false;
            if (result.type !== "success") {
              throw new Error("something went wrong adding recipe");
            }
            if (!isRecipe(result.data?.content)) {
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
</Dialog>
