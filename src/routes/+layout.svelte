<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import Toast from "./Toast.svelte";
  import { beforeNavigate } from "$app/navigation";
  import emptyFlask from "$lib/images/empty-flask.svg";
  import { initAll, toBeEdited } from "$lib/stores";

  const pageIcons = [
    { url: "/", icon: "home", onClick: () => toBeEdited.set(undefined) },
    { url: "/cook", icon: "flask", emptySvg: emptyFlask },
    { url: "/shop", icon: "basket" },
    { url: "/account", icon: "user" },
  ];
  const pages = Object.values(pageIcons);
  let selectedPage = "";
  let direction: "l" | "r" = "r";

  const isAlreadySorted = (arr: number[]) =>
    arr.join(",") === [...arr].sort().join(",");

  const navToDirection = (
    fromRoute: string | null | undefined,
    toRoute: string | null | undefined,
  ) => {
    const [fromIndex] = pageIcons
      .map((p, i) => ({ ...p, i }))
      .filter(p => p.url === fromRoute);
    const [toIndex] = pageIcons
      .map((p, i) => ({ ...p, i }))
      .filter(p => p.url === toRoute);
    if (!fromIndex || !toIndex) {
      throw new Error(`don't know the routes ${fromRoute} -> ${toRoute}`);
    }
    return isAlreadySorted([fromIndex.i, toIndex.i]) ? "r" : "l";
  };

  onMount(() => {
    selectedPage = window.location.pathname;
    return initAll();
  });

  beforeNavigate(nav => {
    if (nav.to?.route.id) {
      selectedPage = nav.to.route.id;
    }
    direction = navToDirection(nav.from?.route.id, nav.to?.route.id);
  });
</script>

<!-- TODO: fix direction -->
<div class="overflow-x-hidden">
  {#if selectedPage === "/" && $toBeEdited}
    <h1 in:fly={{ x: direction === "l" ? -50 : 50 }}>edit recipe</h1>
  {:else if selectedPage === "/"}
    <h1 in:fly={{ x: direction === "l" ? -50 : 50 }}>recipes</h1>
  {:else if selectedPage === "/cook"}
    <h1 in:fly={{ x: direction === "l" ? -50 : 50 }}>cook</h1>
  {:else if selectedPage === "/shop"}
    <h1 in:fly={{ x: direction === "l" ? -50 : 50 }}>shop</h1>
  {:else if selectedPage === "/account"}
    <h1 in:fly={{ x: direction === "l" ? -50 : 50 }}>account</h1>
  {/if}
</div>
<main class="w-11/12 max-w-5xl mx-auto pb-16 flex flex-col text-text">
  <slot />
</main>
<Toast />
<!-- TODO: place scrollbar behind footer -->
<footer class="fixed bottom-0 w-full py-2 bg-dark-bg text-text text-3xl">
  <nav class="flex justify-evenly">
    {#each pages as p}
      <a href={p.url} on:click={p.onClick ?? (() => {})}>
        {#if p.url !== selectedPage && p.emptySvg}
          <img src={p.emptySvg} alt="flask" class="h-[30px] mt-0.5" />
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
