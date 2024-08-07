<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { toastQueue } from "$lib/stores";

  let pop: HTMLDivElement | undefined = undefined;

  const int = (a: number, b: number) => (t: number) => a + t * (b - a);
  const arrInt = (as: number[], bs: number[]) => (t: number) =>
    bs.map((b, i) => int(as[i] ?? 0, b)(t));

  const pad = <T,>(length: number, filler: T, arr: T[]) =>
    arr.length >= length
      ? arr
      : [...arr, ...new Array(length - arr.length).fill(filler)];

  const heights = tweened([0], { interpolate: arrInt });

  onMount(() => {
    if (pop) {
      pop.showPopover();
    }
    return toastQueue.subscribe(q => {
      const internalHeights = [...(pop?.querySelectorAll(".toast") ?? [])].map(
        el => el.clientHeight,
      );
      heights.set(
        pad(
          q.length + 2,
          0,
          q.map((t, i) =>
            !t.open || !internalHeights[i] ? 0 : internalHeights[i] + 10,
          ),
        ),
      );
    });
  });
</script>

<div
  popover="manual"
  class="w-11/12 bg-transparent mb-16 text-text overflow-y-hidden"
  bind:this={pop}
>
  {#each $toastQueue as toast, i}
    <div class="overflow-y-hidden" style="height: {$heights[i]}px;">
      <div class="toast">
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
    </div>
  {/each}
</div>

<style lang="postcss">
  .toast {
    @apply bg-black rounded-lg px-4 py-2 overflow-hidden flex justify-between items-center;
  }
</style>
