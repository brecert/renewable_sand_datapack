import { recipes } from "./recipes.ts";
import { writeRecipes } from "./write.ts";

console.log("Starting build");
await writeRecipes(recipes);
console.log("Finished build");
