<script lang="ts">
  import { fly } from "svelte/transition";

  export let show = false;
  export let title = "";
  export let onClose: () => void = () => {};

  let dialog: HTMLDialogElement | undefined = undefined;

  $: {
    if (dialog) {
      show ? dialog.showModal() : dialog.close();
    }
  }

  const onClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).tagName === "DIALOG") {
      show = false;
      onClose();
    }
  };
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  class="w-11/12 sm:w-3/4 max-w-4xl bg-light-bg text-inherit rounded border-bg border-2 overflow-y-hidden"
  bind:this={dialog}
  on:click={onClick}
  on:close={onClose}
>
  {#if show}
    <div transition:fly={{ y: 20 }}>
      <header class="px-4 py-2 flex justify-between items-start mb-4 text-lg">
        <span class="font-bold pr-6">{title}</span>
        <button
          aria-label="Close"
          title="Close"
          class="square self-start bg-transparent"
          on:click={() => {
            show = false;
            onClose();
          }}><i class="bx bx-x"></i></button
        >
      </header>
      <main class="max-h-[60vh] px-4 pb-2 overflow-auto">
        <slot />
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  {/if}
</dialog>

<style lang="postcss">
  dialog::backdrop {
    @apply bg-black opacity-75;
  }

  footer:has(div :first-child) {
    @apply w-full bg-bg px-4 py-2;
  }
</style>
