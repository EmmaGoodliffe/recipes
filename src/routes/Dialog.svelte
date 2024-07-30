<script lang="ts">
  export let show = false;

  let dialog: HTMLDialogElement | undefined = undefined;

  $: {
    if (dialog) {
      show ? dialog.showModal() : dialog.close();
    }
  }

  const dialogBlur = (e: Event) => {
    if ((e.target as HTMLElement).tagName === "DIALOG") {
      show = false;
    }
  };
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialog} on:click={dialogBlur}>
  <div class="px-4 py-2">
    <header class="flex justify-between items-start mb-4 text-lg">
      <span class="font-bold pr-6">add recipe</span>
      <button
        aria-label="Close"
        title="Close"
        class="self-start"
        on:click={() => (show = false)}>&times;</button
      >
    </header>
    <slot />
  </div>
</dialog>
