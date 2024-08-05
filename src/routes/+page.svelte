<script lang="ts">
  // import welcome_fallback from '$lib/images/svelte-welcome.png';
  // <img src={welcome_fallback} alt="..." />
  import { onMount } from "svelte";
  import AddRecipe from "./AddRecipe.svelte";
  import Gallery from "./Gallery.svelte";
  import { getFb } from "./fb";
  import { onAuthStateChanged } from "firebase/auth";
  import { getRecipes } from "$lib/db";
  import type { Recipe } from "$lib/types";

  let recipes: Recipe[] | undefined = undefined;

  const updateRecipes = async () => {
    const { auth, db } = getFb();
    recipes = (await getRecipes(auth, db)) ?? [];
  };

  onMount(async () => {
    await updateRecipes();
    onAuthStateChanged(getFb().auth, updateRecipes);
  });
</script>

<svelte:head>
  <title>recipes</title>
  <meta name="description" content="recipes" />
</svelte:head>

<h1>recipes</h1>
<AddRecipe onAddition={updateRecipes} />
<Gallery {recipes} onDeletion={updateRecipes} />
