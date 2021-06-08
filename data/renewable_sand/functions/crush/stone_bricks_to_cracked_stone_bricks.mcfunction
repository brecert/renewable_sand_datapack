fill ~ ~-1 ~ ~ ~-1 ~ minecraft:cracked_stone_bricks replace minecraft:stone_bricks
function renewable_sand:concrete_crush_sound
function renewable_sand:crush_effect
particle block minecraft:stone_bricks ~ ~0.3 ~ 0.1 0.1 0.1 1 3
playsound minecraft:block.stone.break block @a ~ ~ ~ 0.8 1
playsound minecraft:block.metal.place block @a ~ ~ ~ 0.9 0.9
playsound minecraft:block.anvil.break block @a ~ ~ ~ 1 1
particle minecraft:cloud ~ ~-0.5 ~ 0.1 0.1 0.1 0.1 3 normal
particle minecraft:poof ~ ~ ~ 0.1 0.1 0.1 0.05 5 normal
particle block minecraft:stone_bricks ~ ~0.3 ~ 0.1 0.1 0.1 1 30

tag @s add has_crushed
