<script lang="ts">
  import "../app.css";
  import Toast from "./Toast.svelte";
  import { navigating } from "$app/stores";
  import emptyFlask from "$lib/images/empty-flask.svg";

  const pageIcons: { url: string; icon: string; emptySvg?: string }[] = [
    { url: "/", icon: "home" },
    { url: "/cook", icon: "flask", emptySvg: emptyFlask },
    { url: "/account", icon: "user" },
  ];
  const pages = Object.values(pageIcons);
  let selectedPage = "";

  $: {
    if ($navigating?.to?.route.id) {
      selectedPage = $navigating.to.route.id;
      console.log(selectedPage);
    }
  }
</script>

<main class="w-11/12 mx-auto flex flex-col text-text">
  <slot />
</main>
<Toast />
<footer class="absolute bottom-0 w-full py-2 bg-dark-bg text-3xl">
  <nav class="flex justify-evenly">
    {#each pages as p, i}
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
