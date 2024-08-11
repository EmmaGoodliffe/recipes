<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import Toast from "./Toast.svelte";
  import { navigating } from "$app/stores";
  import emptyFlask from "$lib/images/empty-flask.svg";
  import { toBeEdited } from "$lib/stores";
  import { fly } from "svelte/transition";

  const pageIcons: { url: string; icon: string; emptySvg?: string }[] = [
    { url: "/", icon: "home" },
    { url: "/cook", icon: "flask", emptySvg: emptyFlask },
    { url: "/account", icon: "user" },
  ];
  const pages = Object.values(pageIcons);
  let selectedPage = "";

  onMount(() => {
    selectedPage = window.location.pathname;
  });

  $: {
    if ($navigating?.to?.route.id) {
      selectedPage = $navigating.to.route.id;
    }
  }
</script>

<!-- TODO: fix direction -->
<div class="overflow-x-hidden">
  {#if selectedPage === "/" && $toBeEdited}
    <h1 in:fly={{ x: 100 }}>edit recipe</h1>
  {:else if selectedPage === "/"}
    <h1 in:fly={{ x: 100 }}>recipes</h1>
  {:else if selectedPage === "/cook"}
    <h1 in:fly={{ x: 100 }}>cook</h1>
  {:else if selectedPage === "/account"}
    <h1 in:fly={{ x: 100 }}>account</h1>
  {/if}
</div>
<main class="w-11/12 max-w-5xl mx-auto pb-12 flex flex-col text-text">
  <slot />
</main>
<Toast />
<!-- TODO: place scrollbar behind footer -->
<footer class="fixed bottom-0 w-full py-2 bg-dark-bg text-3xl">
  <nav class="flex justify-evenly">
    {#each pages as p}
      <a href={p.url}>
        {#if p.url !== selectedPage && p.emptySvg}
          <img src={p.emptySvg} alt="flask" class="h-[30px] mt-[0.125rem]" />
        {:else}
          <i
            class={p.url === selectedPage
              ? `bx bxs-${p.icon}`
              : `bx bx-${p.icon}`}
          ></i>
        {/if}
      </a>
    {/each}
  </nav>
</footer>
