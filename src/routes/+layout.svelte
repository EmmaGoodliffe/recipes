<script lang="ts">
  import "../app.css";
  import Toast from "./Toast.svelte";
</script>

<main class="w-11/12 mx-auto flex flex-col text-text">
  <slot  />
</main>
<Toast />
