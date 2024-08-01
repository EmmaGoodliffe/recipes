import type { Actions } from "./$types";

export const actions = {
  addByUrl: async event => {
    const data = await event.request.formData();
    const url = data.get("url");
    const recipe = { dummy: true };
    return { recipe };
  },
} satisfies Actions;
