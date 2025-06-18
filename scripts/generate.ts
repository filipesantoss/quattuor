import fs from "node:fs";
import path from "node:path";
import { encode } from "&/encoding";
import { create } from "&/puzzle/create";

(async () => {
  const module = path.resolve(__dirname, "..", "src", "lib", "puzzle", "data.json");
  const { default: data } = await import(module);
  const set = new Set<string>(data);

  while (true) {
    set.add(encode(create()));
    fs.writeFileSync(module, JSON.stringify(Array.from(set), null, 2));
    console.log(`${set.size} puzzles.`);
  }
})();
