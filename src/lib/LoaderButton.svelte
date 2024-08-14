<script lang="ts">
  import { sineInOut } from "svelte/easing";
  import { tweened } from "svelte/motion";

  export let className = "long bg-file";
  export let loading = false;
  export let disabled = false;
  export let onClick: (e: Event) => void = () => {};
  export let buttonType: "button" | "submit" = "button";

  const x = tweened<number>(-1, { duration: 1000, easing: sineInOut });

  $: {
    if (loading && typeof $x === "number") {
      if ($x <= 0) {
        x.set(75);
      } else if ($x >= 75) {
        x.set(0);
      }
    }
  }
</script>

<button
  type={buttonType}
  class={className}
  disabled={loading || disabled}
  on:click={e => {
    x.update(v => v + 1);
    onClick(e);
  }}
>
  <div
    class="px-4 pt-2 pb-1 inline-flex items-center"
    class:opacity-50={loading}
  >
    <slot />
  </div>
  <div
    class="loader"
    class:bg-text={loading}
    style={`margin-left: ${$x}%;`}
  ></div>
</button>

<style lang="postcss">
  button {
    @apply p-0 inline-block overflow-hidden disabled:opacity-50;
  }
  button .loader {
    @apply h-2 rounded-sm;
    width: 25%;
  }
</style>
