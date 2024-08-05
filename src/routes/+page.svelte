<script lang="ts">
  // import welcome_fallback from '$lib/images/svelte-welcome.png';
  // <img src={welcome_fallback} alt="..." />
  import AddRecipe from "./AddRecipe.svelte";
  import Gallery from "./Gallery.svelte";
</script>

<svelte:head>
  <title>recipes</title>
  <meta name="description" content="recipes" />
</svelte:head>

<h1>recipes</h1>
<AddRecipe />
<Gallery />
