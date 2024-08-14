<script lang="ts">
  import { afterUpdate } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import { delay } from "./util";

  export let padding = 5;
  export let ease = false;
  export let duration = ease ? 600 : 200;

  let inner: HTMLDivElement | undefined;
  const h = tweened(0, { duration, easing: ease ? cubicOut : undefined });

  let targetH = 0;

  const update = () => {
    if (inner) {
      if (Math.abs(targetH - inner.clientHeight) > 0.01) {
        targetH = inner.clientHeight;
        h.set(inner.clientHeight);
      }
    }
  };

  afterUpdate(async () => {
    // hacky
    await delay(10);
    update();
    await delay(500);
    update();
    await delay(200);
    update();
    await delay(200);
    update();
  });
</script>

<div class="overflow-hidden" style="height: {$h + padding}px;">
  <div bind:this={inner}>
    <slot />
  </div>
</div>
