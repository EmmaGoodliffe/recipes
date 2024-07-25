<script lang="ts">
  import { onMount } from "svelte";

  let dialog: HTMLDialogElement;

  onMount(() => dialog.showModal());
</script>

<button class="big bg-orange-400 text-w" on:click={() => dialog.showModal()}
  >&plus; recipe</button
>
<dialog bind:this={dialog}>
  <header class="flex justify-between items-start mb-4">
    <span class="text-lg font-bold pr-6">add recipe</span>
    <button
      aria-label="Close"
      title="Close"
      class="self-start"
      on:click={() => dialog.close()}>&times;</button
    >
  </header>
  <button class="big bg-grey text-w">by URL</button>
  <button class="big bg-grey text-w">from clipboard</button>
</dialog>
