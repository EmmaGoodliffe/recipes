<script lang="ts">
  import { onMount } from "svelte";
  import AddRecipe from "./AddRecipe.svelte";
  import Gallery from "./Gallery.svelte";
  import ViewRecipe from "./ViewRecipe.svelte";
  import LoaderText from "$lib/LoaderText.svelte";
  import {
    initAll,
    recipes,
    toBeEdited,
    toBePreviewed,
    user,
  } from "$lib/stores";
  import { fly } from "svelte/transition";

  onMount(initAll);
</script>

<svelte:head>
  <title>{$toBeEdited ? "edit recipe | recipes" : "recipes"}</title>
  <meta name="description" content="recipes" />
</svelte:head>

{#if $toBeEdited}
  <h1>edit recipe</h1>
{:else}
  <h1>recipes</h1>
{/if}
{#if $user === undefined}
  <LoaderText text="authenticating..." />
{:else if $user === null}
  <a href="/account" class="long bg-button text-center"
    ><i class="bx bx-user"></i> log in</a
  >
{:else if $toBeEdited}
  <p class="-mt-4 mb-6 text-center opacity-50 font-semibold">
    Tap on a part of the recipe to change it.
  </p>
  <ViewRecipe recipe={$toBeEdited} editable={true} />
{:else}
  <AddRecipe />
  <Gallery recipes={$recipes} selectStores={[toBePreviewed]} />
{/if}
