<script lang="ts">
  import { afterUpdate } from "svelte";
  import { delay } from "./util";
  import { tweened } from "svelte/motion";

  let outer: HTMLDivElement | undefined;
  let inner: HTMLDivElement | undefined;
  const h = tweened(0, { duration: 200 });

  afterUpdate(async () => {
    await delay(1); // hacky
    if (inner) {
      h.set(inner.clientHeight);
    }
  });
</script>

<div class="overflow-hidden" style="height: {$h + 20}px;" bind:this={outer}>
  <div bind:this={inner}>
    <slot />
  </div>
</div>
