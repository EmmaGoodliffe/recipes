<script lang="ts">
  let outer: HTMLDivElement;
  let inner: HTMLDivElement;
</script>

<div bind:this={outer}>
  <div bind:this={inner}>
    <slot />
  </div>
</div>
