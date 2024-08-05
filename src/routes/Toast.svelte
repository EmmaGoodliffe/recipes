<script lang="ts">
  import { toastQueue } from "$lib/stores";

  let pop: HTMLDivElement | undefined = undefined;

  toastQueue.subscribe(q => {
    if (pop && q.length) {
      pop.showPopover();
    }
  });

  // TODO: smooth motion
</script>

<div
  popover="manual"
  class="w-11/12 bg-transparent mb-16 text-text"
  bind:this={pop}
>
  <div>
    {#each $toastQueue as toast, i}
      {#if toast.open}
        <div
          class="bg-black rounded-lg py-1 px-4 mt-2 flex justify-between items-start"
        >
          <p>{toast.text}</p>
          <button
            aria-label="Close"
            title="Close"
            class="self-start"
            on:click={() =>
              toastQueue.update(q => {
                q[i].open = false;
                return q;
              })}><i class="bx bx-x"></i></button
          >
        </div>
      {/if}
    {/each}
  </div>
</div>
