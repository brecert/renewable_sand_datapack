
fill ~ ~-1 ~ ~ ~-1 ~ minecraft:cracked_stone_bricks replace minecraft:stone_bricks
playsound minecraft:block.stone.break block @a ~ ~ ~ 0.8 1
playsound minecraft:block.metal.place block @a ~ ~ ~ 0.9 0.9
playsound minecraft:block.anvil.break block @a ~ ~ ~ 1 1
particle minecraft:cloud ~ ~-0.5 ~ 0.1 0.1 0.1 0.1 3 normal
particle minecraft:poof ~ ~ ~ 0.1 0.1 0.1 0.05 5 normal
particle block minecraft:stone_bricks ~ ~0.3 ~ 0.1 0.1 0.1 1 30

say @s is crushing stone_bricks_to_cracked_stone_bricks.mcfunction
tag @s add has_crushed