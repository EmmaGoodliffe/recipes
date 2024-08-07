<script lang="ts">
  import { onMount } from "svelte";
  import AddRecipe from "./AddRecipe.svelte";
  import Gallery from "./Gallery.svelte";
  import { initAll, recipes } from "$lib/stores";

  onMount(initAll);
</script>

<svelte:head>
  <title>recipes</title>
  <meta name="description" content="recipes" />
</svelte:head>

<h1>recipes</h1>
<AddRecipe />
<Gallery recipes={$recipes} />
