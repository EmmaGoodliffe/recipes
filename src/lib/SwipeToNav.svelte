<script lang="ts">
  let div: HTMLDivElement | undefined = undefined;
  let start = 0;

  export let onSwipe: (direction: "l" | "r") => void;
</script>

<div
  bind:this={div}
  on:touchstart={e => (start = e.changedTouches[0].clientX)}
  on:touchend={e => {
    const end = e.changedTouches[0].clientX;
    const offset = div?.getBoundingClientRect().left ?? 0;
    const width = (div?.getBoundingClientRect().right ?? Infinity) - offset;
    const startPercentage = (start - offset) / width;
    const endPercentage = (end - offset) / width;
    const absoluteDiff = end - start;
    const percentageDiff = endPercentage - startPercentage;
    if (Math.abs(absoluteDiff) > 100 || Math.abs(percentageDiff) > 0.25) {
      onSwipe(start > end ? "r" : "l");
    }
  }}
>
  <slot />
</div>
