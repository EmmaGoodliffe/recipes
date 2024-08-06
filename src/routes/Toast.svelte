<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { toast, toastQueue } from "$lib/stores";
  import { delay } from "$lib/util";

  let pop: HTMLDivElement | undefined = undefined;

  onMount(async () => {
    pop && pop.showPopover();
    toast("foo");
    await delay(1000);
    toast("bar");
  });

  $: openToasts = $toastQueue.map((t, i) => ({ ...t, i })).filter(t => t.open);

  toastQueue.subscribe(() => {
    console.log(pop?.clientHeight);
  })
</script>

<div
  popover="manual"
  class="w-11/12 bg-transparent mb-16 text-text overflow-y-hidden"
  bind:this={pop}
>
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
</div>
