import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { htmlToJson } from "$lib/html";
import { toRecipe } from "$lib/Recipe";
import { isRecord } from "$lib/types";

export const actions = {
  fetchRecipe: async event => {
    try {
      const data = await event.request.formData();
      const url = data.get("url");
      if (typeof url !== "string") {
        return fail(400, { message: "no url" });
      }
      const res = await fetch(url);
      const html = await res.text();
      try {
        const json = htmlToJson(html, "Recipe").data;
        if (!isRecord(json)) {
          return fail(400, { message: `data wasn't object, ${json}` });
        }
        return { content: toRecipe(json) };
      } catch (error) {
        if (`${error}`.includes("SchemaError")) {
          return fail(400, { message: `data didn't satisfy schema, ${error}` });
        }
        throw error;
      }
    } catch (error) {
      return fail(500, { message: `${error}` });
    }
  },
} satisfies Actions;
