<script lang="ts">
  import { durToText } from "$lib/util";

  export let prepTime: string | undefined;
  export let cookTime: string | undefined;
  export let totalTime: string | undefined;
  export let recipeYield: number | undefined;
  export let editing: {
    timeEditable: boolean;
    timeEdit: (key: "prepTime" | "cookTime") => void;
    yieldEditable: boolean;
    yieldEdit: () => void;
  };
</script>

<div class="stats">
  <div class="times">
    <button
      class="stat"
      disabled={!editing.timeEditable}
      on:click={() => editing.timeEdit("prepTime")}
    >
      <span class="quantity">{durToText(prepTime) ?? "?"}</span>
      <span class="label">prep</span>
    </button>
    <button
      class="stat"
      disabled={!editing.timeEditable}
      on:click={() => editing.timeEdit("cookTime")}
    >
      <span class="quantity">{durToText(cookTime) ?? "?"}</span>
      <span class="label">cook</span>
    </button>
    <button class="stat" disabled={true}>
      <span class="quantity">{durToText(totalTime) ?? "?"}</span>
      <span class="label">total</span>
    </button>
  </div>
  <div class="serves">
    <button
      class="stat"
      disabled={!editing.yieldEditable}
      on:click={() => editing.yieldEdit()}
    >
      <span class="label">serves</span>
      <span class="quantity">{recipeYield ?? "?"}</span>
    </button>
  </div>
</div>

<style lang="postcss">
  .stats {
    @apply w-5/6 max-w-sm flex justify-between mx-auto;
  }

  .times {
    @apply flex justify-between border-2 border-input rounded;
  }

  .serves {
    @apply border-2 border-input rounded;
  }

  .stat {
    @apply flex flex-col items-center px-4 py-2 border-input;
  }

  .stat:not(:last-child) {
    @apply border-r-2;
  }

  .quantity {
    @apply font-mono font-bold;
  }

  .label {
    @apply text-sm italic;
  }
</style>
