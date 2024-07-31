<script lang="ts">
  import { toast } from "./stores";
  import Dialog from "./Dialog.svelte";

  let show = true;
  let method: "by-url" | "from-clipboard" = "by-url";
</script>

<button class="long bg-pri-1" on:click={() => (show = true)}
  >&plus; recipe</button
>
<Dialog bind:show title="add recipe" wide={true}>
  <select name="method" class="long" bind:value={method}>
    <option value="by-url">by URL</option>
    <option value="from-clipboard">from clipboard</option>
  </select>
  {#if method === "by-url"}
    <input
      type="text"
      class="long font-mono"
      placeholder="https://www.example.com"
    />
    <button class="long bg-pri-1">go</button>
  {/if}
</Dialog>
