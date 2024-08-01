<script lang="ts">
  import Dialog from "./Dialog.svelte";
  import { enhance } from "$app/forms";
  import { isRecipe } from "$lib/types";

  let show = true;
  let method: "by-url" | "from-clipboard" = "by-url";
</script>

<button class="long bg-pri-1" on:click={() => (show = true)}
  >&plus; recipe</button
>
<Dialog bind:show title="add recipe" wide={true}>
  <select name="method" class="long" bind:value={method}>
    <option value="by-url">by URL</option>
    <option value="from-clipboard">from clipboard</option>
  </select>
  {#if method === "by-url"}
    <form
      action="?/fetchRecipe"
      method="post"
      use:enhance={() => {
        return async ({ result }) => {
          console.log(result);
          if (result.type !== "success") {
            throw new Error("something went wrong adding recipe");
          }
          if (!isRecipe(result.data?.content)) {
            throw new Error("invalid recipe");
          }
          console.log("preview", result.data.content);
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
      <button class="long bg-pri-1">go</button>
    </form>
  {/if}
</Dialog>
