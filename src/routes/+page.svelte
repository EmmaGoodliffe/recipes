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

  onMount(initAll);
</script>

<svelte:head>
  <title>{$toBeEdited ? "edit recipe | recipes" : "recipes"}</title>
  <meta name="description" content="recipes" />
</svelte:head>

{#if $user === undefined}
  <LoaderText text="authenticating..." />
{:else if $user === null}
  <a href="/account" class="long bg-cook text-center"
    ><i class="bx bx-user"></i> log in</a
  >
{:else if $toBeEdited}
  <h2>Tap on a part of the recipe to change it.</h2>
  <ViewRecipe recipeVersions={$toBeEdited} editable={true} />
{:else}
  <AddRecipe />
  <Gallery recipes={$recipes} selectStores={[toBePreviewed]} />
{/if}
