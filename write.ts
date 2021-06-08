import { NAMESPACE_FOLDER } from "./consts.ts";
import { CrushRecipe } from "./recipes.ts";
import {
  generateCrushEvent,
  GeneratedRecipe,
  generateMain,
  generateRecipe,
  generateTryCrush,
} from "./generation.ts";

export const writeMain = () =>
  Deno.writeTextFile(
    `${NAMESPACE_FOLDER}/functions/main_tick.mcfunction`,
    generateMain()
  );

export const writeCrushableTag = (recipes: CrushRecipe[]) =>
  Deno.writeTextFile(
    `${NAMESPACE_FOLDER}/tags/blocks/crushable.json`,
    JSON.stringify({
      replace: false,
      values: recipes.map((recipe) => recipe.from),
    })
  );

export const writeTryCrush = (recipes: GeneratedRecipe[]) =>
  Deno.writeTextFile(
    `${NAMESPACE_FOLDER}/functions/as_anvil/try_crush.mcfunction`,
    generateTryCrush(recipes)
  );

export const writeCrushFunction = (recipe: CrushRecipe, functionName: string) =>
  Deno.writeTextFile(
    `${NAMESPACE_FOLDER}/functions/crush/${functionName}.mcfunction`,
    generateCrushEvent(recipe)
  );

export function writeRecipes(recipes: CrushRecipe[]) {
  const generated = recipes.map(generateRecipe);

  return Promise.all([
    writeMain(),
    writeCrushableTag(recipes),
    writeTryCrush(generated),
    ...recipes.map((recipe, i) =>
      writeCrushFunction(recipe, generated[i].functionName)
    ),
  ]);
}
