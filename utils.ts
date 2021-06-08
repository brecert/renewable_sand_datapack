import { CrushRecipe } from "./recipes.ts";

export function generateFunctionName(recipe: CrushRecipe) {
  const fromName = recipe.from.split(":")[1];
  const intoName = recipe.into.split(":")[1];
  return `${fromName}_to_${intoName}`;
}
