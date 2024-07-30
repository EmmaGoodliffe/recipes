<script lang="ts">
  import { toast } from "./stores";
  import Dialog from "./Dialog.svelte";

  let show = true;
  let method: "by-url" | "from-clipboard" = "by-url";
</script>

<button class="long bg-orange-400 text-w" on:click={() => (show = true)}
  >&plus; recipe</button
>
<Dialog bind:show title="add recipe" wide={true}>
  <select name="method" class="long bg-grey" bind:value={method}>
    <option value="by-url">by URL</option>
    <option value="from-clipboard">from clipboard</option>
  </select>
  {#if method === "by-url"}
    <input
      type="text"
      class="long bg-grey font-mono"
      placeholder="https://www.example.com"
    />
  {/if}
</Dialog>
