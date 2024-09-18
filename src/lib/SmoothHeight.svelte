<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import { delay, subscribeToInterval } from "./util";

  export let padding = 5;
  export let ease = false;
  export let duration = ease ? 600 : 200;

  let div: HTMLDivElement | undefined;
  const h = tweened(0, { duration, easing: ease ? cubicOut : undefined });

  let targetH = 0;

  const update = () => {
    if (div) {
      if (Math.abs(targetH - div.clientHeight) > 0.01) {
        targetH = div.clientHeight;
        h.set(div.clientHeight);
      }
    }
  };

  afterUpdate(async () => {
    await delay(10);
    update();
  });

  onMount(() => subscribeToInterval(500, update));
</script>

<div class="overflow-hidden" style="height: {$h + padding}px;">
  <div bind:this={div}>
    <slot />
  </div>
</div>
