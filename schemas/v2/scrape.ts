/*
// Data obtained from running this in the dev tools of schema.org/Recipe etc.

let delay = time => new Promise(res => setTimeout(res, time));

async function copy(text) {
  console.log("CLICK THE BODY QUICKLY!");
  await delay(3000);
  await navigator.clipboard.writeText(text);
  console.log("copied");
}

let props = [];
let supertype;
for (const tr of Array.from(
  document.querySelector("table.definition-table").querySelectorAll("tr"),
).slice(1)) {
  if (tr.classList.contains("supertype")) {
    supertype = tr.querySelector("a").innerText;
  } else {
    let [name, type, desc] = Array.from(tr.children).map(td => td.innerText);
    type = type.split(/\bor\b/).map(t => t.trim());
    props.push({ name, type, desc, supertype });
  }
}
await copy(JSON.stringify({ props }));
*/
