<script lang="ts">
  import { onMount } from "svelte";
  import { sineInOut } from "svelte/easing";
  import { tweened } from "svelte/motion";

  export let className = "long bg-file";
  export let loading = false;
  export let disabled = false;
  export let onClick: (e: Event) => void = () => {};
  export let buttonType: "button" | "submit" = "button";

  const x = tweened<number>(-1, { duration: 1000, easing: sineInOut });

  onMount(() =>
    x.subscribe(v => {
      if (loading && typeof v === "number") {
        if (v <= 0) {
          x.set(75);
        } else if (v >= 75) {
          x.set(0);
        }
      }
    }),
  );
</script>

<button
  type={buttonType}
  class="{className} disabled:opacity-50"
  disabled={loading || disabled}
  on:click={e => {
    x.update(v => v + 1);
    onClick(e);
  }}
>
  <div class="px-4 pt-2 pb-1" class:opacity-50={loading}>
    <slot />
  </div>
  <div
    class="loader"
    class:bg-text={loading}
    style={`margin-left: ${$x}%`}
  ></div>
</button>

<style lang="postcss">
  button {
    @apply p-0 overflow-hidden;
  }
  button .loader {
    @apply h-2 rounded-sm;
    width: 25%;
  }
</style>
