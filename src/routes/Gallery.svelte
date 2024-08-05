<script lang="ts">
  import { getFb } from "./fb";
  import { getRecipes } from "$lib/db";
  import { onMount } from "svelte";
  import type { Recipe } from "$lib/types";
  import { onAuthStateChanged } from "firebase/auth";
  import { toArray } from "$lib/util";
  import PreviewRecipe from "./PreviewRecipe.svelte";
  import Dialog from "$lib/Dialog.svelte";

  let recipes: Recipe[] = [];
  let previewRecipe: Recipe | undefined = undefined;
  let showPreview = false;

  onMount(async () => {
    const { auth, db } = getFb();
    onAuthStateChanged(auth, async () => {
      recipes = (await getRecipes(auth, db)) ?? [];
    });
  });
</script>

<div
  class="py-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
>
  {#each recipes as rec}
    <button
      class="card enforced-rounded"
      on:click={() => {
        previewRecipe = rec;
        showPreview = true;
      }}
    >
      {#if rec.image?.url}
        <img src={rec.image.url} alt={rec.name} class="object-fit" />
      {/if}
      <div class="absolute bottom-0 w-full bg-bg">
        <div class="mx-2 my-2">
          <span class="font-bold">{rec.name}</span>
          <p class="text-sm opacity-50 truncate">
            {rec.publisher?.name
              ? `Imported from ${rec.publisher.name}`
              : `By ${toArray(rec.author)
                  .map(a => a?.name)
                  .filter(n => n)
                  .join(", ")}`}
          </p>
        </div>
      </div>
    </button>
  {/each}
</div>
{#if previewRecipe}
  <Dialog bind:show={showPreview} title="preview recipe">
    <PreviewRecipe recipe={previewRecipe} />
  </Dialog>
{/if}

<style lang="postcss">
  button.card {
    @apply border-2 border-input text-left relative flex;
  }
</style>
