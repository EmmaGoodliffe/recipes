<script lang="ts">
  import { onMount } from "svelte";
  import AddRecipe from "./AddRecipe.svelte";
  import Gallery from "./Gallery.svelte";
  import ViewRecipe from "./ViewRecipe.svelte";
  import {
    initAll,
    recipes,
    toBeEdited,
    toBePreviewed,
    user,
  } from "$lib/stores";

  $: title = $toBeEdited ? "edit recipe | recipes" : "recipes";
  $: header = $toBeEdited ? "edit recipe" : "recipes";

  onMount(initAll);
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="recipes" />
</svelte:head>

<h1>{header}</h1>
{#if $user === null}
  <a href="/account" class="text-center hover:underline">Log in &rarr;</a>
{:else if $toBeEdited}
  <p class="-mt-4 mb-6 text-center opacity-50 font-semibold">
    Tap on a part of the recipe to change it.
  </p>
  <ViewRecipe recipe={$toBeEdited} editable={true} />
{:else}
  <AddRecipe />
  <Gallery recipes={$recipes} selectStores={[toBePreviewed]} />
{/if}
