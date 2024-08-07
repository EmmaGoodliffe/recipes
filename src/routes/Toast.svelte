<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import SmoothHeight from "$lib/SmoothHeight.svelte";
  import { toastQueue } from "$lib/stores";

  let pop: HTMLDivElement | undefined;

  onMount(() => {
    if (pop) {
      pop.showPopover();
    }
  });
</script>

<div
  popover="manual"
  class="w-11/12 bg-transparent mb-16 text-text overflow-y-hidden"
  bind:this={pop}
>
  {#each $toastQueue as toast, i}
    <SmoothHeight ease={true}>
      {#if toast.open}
        <div class="toast" transition:fly={{ y: 50 }}>
          <p>{toast.text}</p>
          <button
            aria-label="Close"
            title="Close"
            on:click={() => {
              toastQueue.update(q => {
                q[i].open = false;
                return q;
              });
            }}><i class="bx bx-x"></i></button
          >
        </div>
      {/if}
    </SmoothHeight>
  {/each}
</div>

<style lang="postcss">
  .toast {
    @apply bg-black rounded-lg px-4 py-2 overflow-hidden flex justify-between items-center;
  }
</style>
