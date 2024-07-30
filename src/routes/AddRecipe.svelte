<script lang="ts">
  import { toast } from "./stores";
  import Dialog from "./Dialog.svelte";

  let showAddRecipeDialog = false;
</script>

<button
  class="big bg-orange-400 text-w"
  on:click={() => (showAddRecipeDialog = true)}>&plus; recipe</button
>
<Dialog bind:show={showAddRecipeDialog}
  ><button class="big bg-grey text-w">by URL</button>
  <button class="big bg-grey text-w" on:click={() => toast("can't do that yet")}
    >from clipboard</button
  ></Dialog
>
