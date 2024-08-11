<script lang="ts">
  import { FirebaseError } from "firebase/app";
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import { onMount } from "svelte";
  import { getFb } from "../fb";
  import type { Auth, User } from "firebase/auth";
  import LoaderButton from "$lib/LoaderButton.svelte";
  import LoaderText from "$lib/LoaderText.svelte";
  import { initAll, toast, user } from "$lib/stores";
  import { delay } from "$lib/util";

  let auth: Auth;
  let email = "";
  let password = "";
  let downloading = true;
  let uploading = false;

  const settings: {
    id: string;
    description: string;
    state: "static" | "editing" | "updating";
    value: (user: User | null | undefined) => string | null;
    update: (x: string) => void | Promise<void>;
  }[] = [
    {
      id: "name",
      description: "what your friends see",
      state: "static",
      value: u => u?.displayName ?? null,
      update(x) {
        if (!$user) {
          toast("you can't change your name because you're not logged in");
          return;
        }
        return updateProfile($user, { displayName: x });
      },
    },
  ];
  $: inputValues = settings.map(s => s.value($user) ?? "");
  const inputRefs: HTMLInputElement[] = [];

  onMount(() => {
    auth = getFb().auth;
    downloading = false;
    return initAll();
  });

  const updateSetting = async (index: number) => {
    try {
      settings[index].state = "updating";
      await settings[index].update(inputValues[index]);
      await delay(5000);
      settings[index].state = "static";
    } catch (error) {
      toast(`update failed: ${error}`);
      console.error(error);
    }
  };
</script>

<svelte:head>
  <title>account | recipes</title>
  <meta name="description" content="account" />
</svelte:head>

{#if downloading}
  <LoaderText text="authenticating..." />
{:else if $user === null}
  <form>
    <div class="group">
      <label for="email" class="focal">email</label>
      <input
        type="email"
        name="email"
        class="long font-mono"
        id="email"
        bind:value={email}
      />
    </div>
    <div class="group">
      <label for="password" class="focal">password</label>
      <input
        type="password"
        name="password"
        class="long font-mono"
        id="password"
        bind:value={password}
      />
    </div>
    <LoaderButton
      buttonType="submit"
      loading={uploading}
      onClick={async () => {
        uploading = true;
        try {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
          } catch (error) {
            if (
              error instanceof FirebaseError &&
              error.code === "auth/email-already-in-use"
            ) {
              await signInWithEmailAndPassword(auth, email, password);
            } else {
              throw error;
            }
          }
        } catch (error) {
          let message = error instanceof Error ? error.message : `${error}`;
          message = message.startsWith("Firebase:")
            ? message.slice("Firebase:".length)
            : message;
          toast(`auth failed: ${message}`);
          console.error(error);
        }
        uploading = false;
      }}>go</LoaderButton
    >
  </form>
{:else}
  <table>
    <tbody>
      {#each settings as set, i}
        <tr class="w-full flex items-baseline">
          <td class="text-right">
            <label for={set.id}>{set.id}</label>
            <p class="text-sm opacity-50">{set.description}</p>
          </td>
          <td class="h-16">
            <div
              class="px-2 py-1"
              class:hidden={set.state !== "static"}
              class:font-mono={set.value($user) === null}
            >
              {set.value($user) ?? "none"}
            </div>
            <input
              type="text"
              class="w-full px-2 py-1 rounded"
              class:collapse={set.state === "static"}
              id={set.id}
              disabled={set.state === "updating"}
              bind:value={inputValues[i]}
              bind:this={inputRefs[i]}
              on:keypress={e => e.key === "Enter" && updateSetting(i)}
            />
          </td>
          <td>
            {#if set.state === "static"}
              <button
                class="square bg-input"
                on:click={async () => {
                  settings[i].state = "editing";
                  await delay(10);
                  inputRefs[i].focus();
                }}><i class="bx bx-pencil"></i></button
              >
            {:else if set.state === "editing"}
              <button class="square bg-button" on:click={() => updateSetting(i)}
                ><i class="bx bx-check"></i></button
              >
            {:else}
              <button class="square bg-button" disabled
                ><i class="bx bx-loader-alt animate-spin"></i></button
              >
            {/if}
            <button
              class="square bg-input"
              class:collapse={set.state !== "editing"}
              on:click={() => (set.state = "static")}
            >
              <i class="bx bx-x"></i>
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <button class="long bg-input" on:click={() => signOut(auth)}>log out</button>
{/if}

<style lang="postcss">
  td {
    @apply flex-1 mx-4;
  }
</style>
