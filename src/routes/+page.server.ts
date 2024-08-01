import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";

export const actions = {
  addByUrl: async event => {
    const data = await event.request.formData();
    const url = data.get("url");
    if (typeof url !== "string") {
      return fail(400, { message: "no url" });
    }
    // const res = await fetch(url);
    // console.log(res);
    const recipe = { dummy: true };
    return { recipe };
  },
} satisfies Actions;
