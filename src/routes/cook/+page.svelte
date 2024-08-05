<script lang="ts">
  import { selectedRecipe } from "$lib/stores";
</script>

{#if !$selectedRecipe}
  <h1>no recipe to cook...</h1>
  <a href="/" class="text-center hover:underline">&larr; home</a>
{/if}
