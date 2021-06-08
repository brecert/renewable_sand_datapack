import { dedent } from "https://raw.githubusercontent.com/Brecert/dedent-deno/main/dedent.ts";
import { BLOCK_OFFSET, MINECRAFT_NAMESPACE } from "./consts.ts";
import { CrushRecipe, SpecialCondition, WhenCondition } from "./recipes.ts";
import { generateFunctionName } from "./utils.ts";

export function specialCond(cond: SpecialCondition) {
  const conditions = [];

  if (cond.fallSpeed) {
    conditions.push(`score @s motion_y matches ..${cond.fallSpeed}`);
  }

  if (cond.fallDistance) {
    conditions.push(`score @s fall_distance matches ${cond.fallDistance}..`);
  }

  return conditions;
}

export function ifExpr(conds: WhenCondition) {
  let output: string[] = [];
  
  if (typeof conds[0] === "object") {
    output = output.concat(specialCond(conds.shift() as SpecialCondition));
  }

  output = output.concat(conds as string[]);


  return output.map((cond) => `if ${cond}`).join(" ");
}

export function generateCheck(recipe: CrushRecipe, functioName: string) {
  const functionURI = `${MINECRAFT_NAMESPACE}:crush/${functioName}`;

  const cond = ifExpr(recipe.when);

  return `execute ${cond} if block ${BLOCK_OFFSET} ${recipe.from} run function ${functionURI}`;
}

export function generateCrushEvent(recipe: CrushRecipe) {
  return dedent`
    fill ${BLOCK_OFFSET} ${BLOCK_OFFSET} ${recipe.into} replace ${recipe.from}
    function renewable_sand:concrete_crush_sound
    function renewable_sand:crush_effect
    particle block ${recipe.from} ~ ~0.3 ~ 0.1 0.1 0.1 1 3
    ${recipe.code}
    tag @s add has_crushed
  `;
}

export interface GeneratedRecipe {
  functionName: string;
  crush: string;
  check: string;
}

export function generateRecipe(recipe: CrushRecipe): GeneratedRecipe {
  const functionName = generateFunctionName(recipe);

  return {
    functionName,
    crush: generateCrushEvent(recipe),
    check: generateCheck(recipe, functionName),
  };
}

export function generateTryCrush(recipes: GeneratedRecipe[]) {
  const cases = recipes.map((r) => r.check);

  return dedent`
    execute store result score @s fall_distance run data get entity @s FallDistance 1
    execute store result score @s motion_y run data get entity @s Motion[1] 100

    ${cases.reverse().join("\n")}
  `;
}

export function generateMain() {
  return dedent`
    execute
      as @e[type=minecraft:falling_block,nbt={BlockState:{Name:"minecraft:anvil"}},tag=!has_crushed] 
      at @s if block ${BLOCK_OFFSET} #renewable_sand:crushable 
      run function renewable_sand:as_anvil/try_crush
  `
    .split(/\n\s*/)
    .map(val => val.trim())
    .join(" ");
}
