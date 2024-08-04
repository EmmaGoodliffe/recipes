<script lang="ts">
  export let show = false;
  export let title = "";
  export let onBlur: () => void = () => {};

  let dialog: HTMLDialogElement | undefined = undefined;

  $: {
    if (dialog) {
      show ? dialog.showModal() : dialog.close();
    }
  }

  const onClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).tagName === "DIALOG") {
      show = false;
      onBlur();
    }
  };
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  class="w-3/4 max-w-lg bg-light-bg text-inherit rounded border-bg border-2"
  bind:this={dialog}
  on:click={onClick}
>
  <header class="px-4 py-2 flex justify-between items-start mb-4 text-lg">
    <span class="font-bold pr-6">{title}</span>
    <button
      aria-label="Close"
      title="Close"
      class="self-start bg-transparent"
      on:click={() => (show = false)}>&times;</button
    >
  </header>
  <slot />
</dialog>

<style lang="postcss">
  dialog::backdrop {
    @apply bg-black opacity-75;
  }
</style>
