import { dedent } from "https://raw.githubusercontent.com/Brecert/dedent-deno/main/dedent.ts";
import { MINECRAFT_COLORS } from "./consts.ts";

export type SpecialCondition = { fallSpeed?: number; fallDistance?: number };
export type WhenCondition = string[] | [SpecialCondition, ...string[]];

export interface CrushRecipe {
  from: string;
  into: string;
  when: WhenCondition;
  code: string;
}

let recipes: CrushRecipe[] = [
  {
    from: "minecraft:stone",
    into: "minecraft:cobblestone",
    when: [{ fallSpeed: -42, fallDistance: 2 }],
    code: ``,
  },
  {
    from: "minecraft:cobblestone",
    into: "minecraft:gravel",
    when: [{ fallSpeed: -42, fallDistance: 3 }],
    code: dedent`
      playsound minecraft:block.gravel.place block @a ~ ~ ~ 1 0.5
      playsound minecraft:block.stone.break block @s ~ ~ ~ 1 1
      playsound minecraft:block.metal.place block @a ~ ~ ~ 1 0.9
      particle minecraft:cloud ~ ~-0.5 ~ 0.1 0.1 0.1 0.1 3 normal
      particle minecraft:poof ~ ~0.3 ~ 0.1 0.1 0.1 0.05 5 normal
      particle block minecraft:cobblestone ~ ~0.3 ~ 0.1 0.1 0.1 1 25
      particle block minecraft:gravel ~ ~0.3 ~ 0.1 0.1 0.1 1 5
    `,
  },
  {
    from: "minecraft:gravel",
    into: "minecraft:sand",
    when: [{ fallSpeed: -42, fallDistance: 2 }],
    code: dedent`
			playsound minecraft:block.gravel.break block @a ~ ~ ~ 1 0.5
			playsound minecraft:block.sand.place block @a ~ ~ ~ 2 0.9
			particle minecraft:poof ~ ~0.3 ~ 0.1 0.1 0.1 0.05 5 normal
			particle block minecraft:sand ~ ~0.3 ~ 0.1 0.1 0.1 1 5
			particle block minecraft:gravel ~ ~0.3 ~ 0.1 0.1 0.1 1 25
    `,
  },
  {
    from: "minecraft:stone_bricks",
    into: "minecraft:cracked_stone_bricks",
    when: [{ fallSpeed: -55, fallDistance: 3 }],
    code: dedent`
      playsound minecraft:block.stone.break block @a ~ ~ ~ 0.8 1
      playsound minecraft:block.metal.place block @a ~ ~ ~ 0.9 0.9
      playsound minecraft:block.anvil.break block @a ~ ~ ~ 1 1
      particle minecraft:cloud ~ ~-0.5 ~ 0.1 0.1 0.1 0.1 3 normal
      particle minecraft:poof ~ ~ ~ 0.1 0.1 0.1 0.05 5 normal
      particle block minecraft:stone_bricks ~ ~0.3 ~ 0.1 0.1 0.1 1 30
    `,
  },
  {
    from: "minecraft:infested_stone_bricks",
    into: "minecraft:infested_cracked_stone_bricks",
    when: [{ fallSpeed: -55, fallDistance: 3 }],
    code: dedent`
      playsound minecraft:block.stone.break block @a ~ ~ ~ 0.8 1
      playsound minecraft:block.metal.place block @a ~ ~ ~ 0.9 0.9
      playsound minecraft:block.anvil.break block @a ~ ~ ~ 1 1
      playsound minecraft:entity.silverfish.step block @a ~ ~ ~ 0.33 0
      particle minecraft:cloud ~ ~-0.5 ~ 0.1 0.1 0.1 0.1 3 normal
      particle minecraft:poof ~ ~ ~ 0.1 0.1 0.1 0.05 5 normal
      particle block minecraft:infested_stone_bricks ~ ~0.3 ~ 0.1 0.1 0.1 1 30
    `,
  },
  {
    from: "minecraft:polished_blackstone_bricks",
    into: "minecraft:cracked_polished_blackstone_bricks",
    when: [{ fallSpeed: -66, fallDistance: 6 }],
    code: dedent``,
  },
];

const concreteRecipes: CrushRecipe[] = MINECRAFT_COLORS.map((color) => ({
  from: `minecraft:${color}_concrete`,
  into: `minecraft:${color}_concrete_powder`,
  when: [{ fallSpeed: -45, fallDistance: 3 }],
  code: ``,
}));

recipes = recipes.concat(concreteRecipes);

export { recipes };
