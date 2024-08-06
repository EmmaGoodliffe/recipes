<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { toast, toastQueue } from "$lib/stores";
  import { delay } from "$lib/util";
  import { tweened } from "svelte/motion";

  let pop: HTMLDivElement | undefined = undefined;
  let inner: HTMLDivElement | undefined = undefined;
  const h = tweened(0);

  onMount(() => {
    pop && pop.showPopover();
    toast("foo");
    delay(2000).then(() => toast("bar"));
    // return toastQueue.subscribe(() => {
    //   console.log("now");
    //   if (inner?.clientHeight) {
    //     h.set(inner.clientHeight);
    //   }
    // });
  });

  $: openToasts = $toastQueue.map((t, i) => ({ ...t, i })).filter(t => t.open);
</script>

<!-- style="height: {$h}px;" -->
<div
  popover="manual"
  class="w-11/12 bg-transparent mb-16 text-text overflow-y-hidden"
  bind:this={pop}
  >
  <!-- <div class="pb-6" bind:this={inner}> -->
    {#each openToasts as toast}
      <div
        class="bg-black rounded-lg py-1 px-4 mt-2 flex justify-between items-start"
        transition:fly={{ y: 100 }}
      >
        <p>{toast.text}</p>
        <button
          aria-label="Close"
          title="Close"
          class="self-start"
          on:click={() =>
            toastQueue.update(q => {
              q[toast.i].open = false;
              return q;
            })}><i class="bx bx-x"></i></button
        >
      </div>
    {/each}
  <!-- </div> -->
</div>
