<script lang="ts">
  import { onMount } from "svelte";
  // import welcome_fallback from '$lib/images/svelte-welcome.png';
  // <img src={welcome_fallback} alt="..." />
  import AddRecipe from "./AddRecipe.svelte";
</script>

<svelte:head>
  <title>recipes</title>
  <meta name="description" content="recipes" />
</svelte:head>

<h1>recipes</h1>
<AddRecipe />
