import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { load } from "cheerio";

export const actions = {
  addByUrl: async event => {
    const data = await event.request.formData();
    const url = data.get("url");
    if (typeof url !== "string") {
      return fail(400, { message: "no url" });
    }
    const res = await fetch(url);
    const html = await res.text();
    const $ = load(html);
    const schema = $('script[data-testid="page-schema"]').text();
    if (!schema) {
      return fail(400, { message: "no readable content on url" });
    }
    return { recipe: JSON.parse(schema) };
  },
} satisfies Actions;
