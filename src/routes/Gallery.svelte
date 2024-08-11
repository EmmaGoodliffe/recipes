<script lang="ts">
  import { fly } from "svelte/transition";
  import ViewRecipe from "./ViewRecipe.svelte";
  import type { Recipe } from "$lib/types";
  import type { Writable } from "svelte/store";
  import Dialog from "$lib/Dialog.svelte";
  import LoaderText from "$lib/LoaderText.svelte";
  import { toBeCooked, toBeEdited, toBePreviewed } from "$lib/stores";
  import { toArray } from "$lib/util";

  export let recipes: { original: Recipe; edited?: Recipe }[] | undefined;
  export let selectStores: Writable<Recipe | undefined>[];

  let showPreview = false;
</script>

<div
  class="py-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
>
  {#if recipes === undefined}
    <LoaderText text="fetching recipes..." />
  {:else}
    {#if recipes.length === 0}
      <p>No recipes.</p>
    {/if}
    <!-- TODO: handle edited version -->
    {#each recipes.map(r => r.original) as rec}
      <button
        class="card enforced-rounded"
        on:click={() => {
          selectStores.map(s => s.set(rec));
          showPreview = true;
        }}
        transition:fly={{ y: 20 }}
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
  {/if}
</div>
{#if $toBePreviewed}
  <Dialog bind:show={showPreview} title="preview recipe">
    <ViewRecipe recipe={$toBePreviewed} />
    <div slot="footer">
      <!-- <LoaderButton
        className="long bg-input"
        {loading}
        onClick={async () => {
          loading = true;
          await toastWrap(deleteRecipe)(auth, db, $toBePreviewed?.["@id"]);
          loading = false;
          toBePreviewed.set(undefined);
          showPreview = false;
          return updateRecipes();
        }}
      >
        <i class="bx bx-trash align-middle"></i> <span class="">delete</span>
      </LoaderButton> -->
      <button
        class="long bg-input"
        on:click={() => toBeEdited.set($toBePreviewed)}
        ><i class="bx bx-pencil"></i> edit</button
      >
      <a
        href="/cook"
        class="long bg-button block text-center"
        on:click={() => toBeCooked.set($toBePreviewed)}
        ><i class="bx bxs-flask"></i> cook</a
      >
    </div>
  </Dialog>
{/if}

<style lang="postcss">
  button.card {
    @apply border-2 border-input text-left relative flex;
  }
</style>
