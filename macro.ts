function stripIndents(str: string) {
  return str.replace(/^[^\S\n]+/gm, "");
}

const MINECRAFT_COLORS = new Set([
  "white",
  "orange",
  "magenta",
  "light_blue",
  "yellow",
  "lime",
  "gray",
  "light_gray",
  "cyan",
  "purple",
  "blue",
  "brown",
  "green",
  "red",
  "black",
  "pink",
]);

const MINECRAFT_NAMESPACE = "renewable_sand";
const NAMESPACE_FOLDER = `data/${MINECRAFT_NAMESPACE}`;

// deno-lint-ignore camelcase
const block_distance = -1;

interface ICrushable {
  fromBlock: string;
  toBlock: string;
  fallSpeed: number;
  fallDistance: number;
  customCode?: string;
}

const crushables: ICrushable[] = [
  {
    fromBlock: "minecraft:stone",
    toBlock: "minecraft:cobblestone",
    fallSpeed: -42,
    fallDistance: 2,
    customCode: `
			fill ~ ~${block_distance} ~ ~ ~${block_distance} ~ minecraft:cobblestone replace minecraft:stone
			function renewable_sand:concrete_crush_sound
			function renewable_sand:crush_effect
			particle block minecraft:stone ~ ~0.3 ~ 0.1 0.1 0.1 1 3
		`,
  },
  {
    fromBlock: "minecraft:cobblestone",
    toBlock: "minecraft:gravel",
    fallSpeed: -42,
    fallDistance: 2,
    customCode: `
			fill ~ ~${block_distance} ~ ~ ~${block_distance} ~ minecraft:gravel replace minecraft:cobblestone
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
    fromBlock: "minecraft:gravel",
    toBlock: "minecraft:sand",
    fallSpeed: -42,
    fallDistance: 2,
    customCode: `
			fill ~ ~${block_distance} ~ ~ ~${block_distance} ~ minecraft:sand replace minecraft:gravel
			playsound minecraft:block.gravel.break block @a ~ ~ ~ 1 0.5
			playsound minecraft:block.sand.place block @a ~ ~ ~ 2 0.9
			particle minecraft:poof ~ ~0.3 ~ 0.1 0.1 0.1 0.05 5 normal
			particle block minecraft:sand ~ ~0.3 ~ 0.1 0.1 0.1 1 5
			particle block minecraft:gravel ~ ~0.3 ~ 0.1 0.1 0.1 1 25
		`,
  },
  {
    fromBlock: "minecraft:stone_bricks",
    toBlock: "minecraft:cracked_stone_bricks",
    fallSpeed: -59,
    fallDistance: 2,
    customCode: `
			fill ~ ~${block_distance} ~ ~ ~${block_distance} ~ minecraft:cracked_stone_bricks replace minecraft:stone_bricks
			playsound minecraft:block.stone.break block @a ~ ~ ~ 0.8 1
			playsound minecraft:block.metal.place block @a ~ ~ ~ 0.9 0.9
			playsound minecraft:block.anvil.break block @a ~ ~ ~ 1 1
			particle minecraft:cloud ~ ~-0.5 ~ 0.1 0.1 0.1 0.1 3 normal
			particle minecraft:poof ~ ~ ~ 0.1 0.1 0.1 0.05 5 normal
			particle block minecraft:stone_bricks ~ ~0.3 ~ 0.1 0.1 0.1 1 30
		`,
  },
  {
    fromBlock: "minecraft:infested_stone_bricks",
    toBlock: "minecraft:infested_cracked_stone_bricks",
    fallSpeed: -59,
    fallDistance: 2,
    customCode: `
			fill ~ ~${block_distance} ~ ~ ~${block_distance} ~ minecraft:infested_cracked_stone_bricks replace minecraft:infested_stone_bricks
			playsound minecraft:block.stone.break block @a ~ ~ ~ 0.8 1
			playsound minecraft:block.metal.place block @a ~ ~ ~ 0.9 0.9
			playsound minecraft:block.anvil.break block @a ~ ~ ~ 1 1
			playsound minecraft:entity.silverfish.step block @a ~ ~ ~ 0.33 0
			particle minecraft:cloud ~ ~-0.5 ~ 0.1 0.1 0.1 0.1 3 normal
			particle minecraft:poof ~ ~ ~ 0.1 0.1 0.1 0.05 5 normal
			particle block minecraft:infested_stone_bricks ~ ~0.3 ~ 0.1 0.1 0.1 1 30
		`,
  },
];

/* concrete to concrete powder */
Array.from(MINECRAFT_COLORS.values()).forEach((color) => {
  crushables.push({
    fromBlock: `minecraft:${color}_concrete`,
    toBlock: `minecraft:${color}_concrete_powder`,
    fallSpeed: 0,
    fallDistance: 2,
  });
});

crushables.reverse();

function generateFunctionName(crushable: ICrushable) {
  return `${crushable.fromBlock.split(":")[1]}_to_${
    crushable.toBlock.split(":")[1]
  }`;
}

function writeBlockCrushFunctions() {
  const codeTemplate = (c: ICrushable) => `
  	fill ~ ~${block_distance} ~ ~ ~${block_distance} ~ ${c.toBlock} replace ${c.fromBlock}
  	function renewable_sand:concrete_crush_sound
  	function renewable_sand:crush_effect
  	particle block ${c.fromBlock} ~ ~0.3 ~ 0.1 0.1 0.1 1 3
  	${c.customCode ?? ''}
	`;

  crushables.forEach((c) => {
    const file = `${generateFunctionName(c)}.mcfunction`;
    const code =
      c.customCode !== undefined
        ? stripIndents(c.customCode)
        : stripIndents(codeTemplate(c));

    const path = `${NAMESPACE_FOLDER}/functions/crush/${file}`;

    Deno.writeTextFile(path, `${code}\ntag @s add has_crushed`);
  });
}

function writeBlockCrushSwitch() {
  const path = `${NAMESPACE_FOLDER}/functions/as_anvil/try_crush.mcfunction`;

  const cases = crushables
    .map((c) => {
      const caseCode = `
				execute if score @s fall_distance matches ${
          c.fallDistance
        }.. if score @s motion_y matches ..${
        c.fallSpeed
      } if block ~ ~${block_distance} ~ ${
        c.fromBlock
      } run function ${MINECRAFT_NAMESPACE}:crush/${generateFunctionName(c)}
			`;
      return caseCode;
    })
    .join("\n");

  const code = `
		execute store result score @s fall_distance run data get entity @s FallDistance 1
		execute store result score @s motion_y run data get entity @s Motion[1] 100
		${cases}
	`;

  Deno.writeTextFile(path, stripIndents(code));
}

function writeCrushableTag() {
  const path = `${NAMESPACE_FOLDER}/tags/blocks/crushable.json`;
  const vals = crushables.map((c) => c.fromBlock);
  const json = { replace: false, values: vals };

  Deno.writeTextFile(path, JSON.stringify(json));
}

function writeMainFunction() {
  const path = `${NAMESPACE_FOLDER}/functions/main_tick.mcfunction`;
  const code = `
		execute as @e[type=minecraft:falling_block,nbt={BlockState:{Name:"minecraft:anvil"}},tag=!has_crushed] at @s if block ~ ~${block_distance} ~ #renewable_sand:crushable run function renewable_sand:as_anvil/try_crush
	`;

  Deno.writeTextFile(path, stripIndents(code));
}

writeBlockCrushFunctions();
writeBlockCrushSwitch();
writeCrushableTag();
writeMainFunction();
