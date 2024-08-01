import { fail } from "@sveltejs/kit";
import { load } from "cheerio";
import type { Actions } from "./$types";
import { delay } from "$lib/util";

export const actions = {
  fetchRecipe: async event => {
    const data = await event.request.formData();
    const url = data.get("url");
    if (typeof url !== "string") {
      return fail(400, { message: "no url" });
    }
    const res = await fetch(url);
    const html = await res.text();
    const $ = load(html);
    const content = $('script[data-testid="page-schema"]').text();
    if (!content) {
      return fail(400, { message: "no readable content on url" });
    }
    await delay(2000);
    return { content: JSON.parse(content) };
  },
} satisfies Actions;
