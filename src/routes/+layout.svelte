<script lang="ts">
  import "../app.css";
  import Toast from "./Toast.svelte";
  import { onMount } from "svelte";

  const pageIcons = { "/": "home", "/account": "user" };
  const pages = Object.values(pageIcons);
  let selectedPage = -1;

  onMount(() => {
    selectedPage = Object.keys(pageIcons).indexOf(window.location.pathname);
  });
</script>

<main class="w-11/12 mx-auto flex flex-col text-text">
  <slot />
</main>
<Toast />
<footer class="absolute bottom-0 w-full py-2 bg-dark-bg text-3xl">
  <nav class="flex justify-evenly">
    {#each pages as p, i}
      <a
        href={Object.keys(pageIcons)[i]}
        on:click={() =>
          (selectedPage = Object.keys(pageIcons).indexOf(
            Object.keys(pageIcons)[i],
          ))}
      >
        <i class={i === selectedPage ? `bx bxs-${p}` : `bx bx-${p}`}></i>
      </a>
    {/each}
  </nav>
</footer>
