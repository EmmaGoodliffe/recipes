<script lang="ts">
  import { getFb } from "./fb";
  import { getRecipes, deleteRecipe } from "$lib/db";
  import { onMount } from "svelte";
  import type { Recipe } from "$lib/types";
  import { onAuthStateChanged, type Auth } from "firebase/auth";
  import { toArray } from "$lib/util";
  import PreviewRecipe from "./PreviewRecipe.svelte";
  import Dialog from "$lib/Dialog.svelte";
  import LoaderButton from "$lib/LoaderButton.svelte";
  import { toastWrap } from "$lib/stores";
  import type { Firestore } from "firebase/firestore";
  import LoaderText from "$lib/LoaderText.svelte";

  export let recipes: Recipe[] | undefined;
  export let onDeletion = () => {};

  let auth: Auth | undefined = undefined;
  let db: Firestore | undefined = undefined;
  let previewRecipe: Recipe | undefined = undefined;
  let showPreview = false;
  let loading = false;

  onMount(async () => {
    const fb = getFb();
    auth = fb.auth;
    db = fb.db;
  });
</script>

<div
  class="py-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
>
  {#if recipes === undefined}
    <LoaderText text="fetching recipes..." />
  {:else}
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
  {/if}
</div>
{#if previewRecipe}
  <Dialog bind:show={showPreview} title="preview recipe">
    <PreviewRecipe recipe={previewRecipe} />
    <div slot="footer">
      <LoaderButton
        className="long bg-input"
        {loading}
        onClick={async () => {
          loading = true;
          await toastWrap(deleteRecipe)(auth, db, previewRecipe?.["@id"]);
          loading = false;
          previewRecipe = undefined;
          showPreview = false;
          return onDeletion();
        }}
      >
        <i class="bx bx-trash align-middle"></i> <span class="">delete</span>
      </LoaderButton>
    </div>
  </Dialog>
{/if}

<style lang="postcss">
  button.card {
    @apply border-2 border-input text-left relative flex;
  }
</style>
