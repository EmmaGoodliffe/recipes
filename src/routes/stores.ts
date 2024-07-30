import { writable } from "svelte/store";

const TOAST_TIME = 10 * 1000;

export const toastQueue = writable<
  { text: string; since: number; open: boolean }[]
>([]);

export const toast = (text: string) => {
  toastQueue.update(q => [...q, { text, since: Date.now(), open: true }]);
};

setInterval(() => {
  toastQueue.update(q =>
    q.map(t => ({ ...t, open: t.open && Date.now() - t.since < TOAST_TIME })),
  );
}, 1000);
