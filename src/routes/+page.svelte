<script lang="ts">
  import { onMount } from "svelte";
  import AddRecipe from "./AddRecipe.svelte";
  import Gallery from "./Gallery.svelte";
  import ViewRecipe from "./ViewRecipe.svelte";
  import { initAll, recipes, toBeEdited, toBePreviewed } from "$lib/stores";

  onMount(initAll);
</script>

<svelte:head>
  <title>recipes</title>
  <meta name="description" content="recipes" />
</svelte:head>

<h1>recipes</h1>
{#if $toBeEdited}
  <ViewRecipe recipe={$toBeEdited} editable={true} />
{:else}
  <AddRecipe />
  <Gallery recipes={$recipes} selectStores={[toBePreviewed]} />
{/if}
