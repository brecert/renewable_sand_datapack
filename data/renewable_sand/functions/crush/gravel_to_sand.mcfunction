fill ~ ~-1 ~ ~ ~-1 ~ minecraft:sand replace minecraft:gravel
function renewable_sand:concrete_crush_sound
function renewable_sand:crush_effect
particle block minecraft:gravel ~ ~0.3 ~ 0.1 0.1 0.1 1 3
playsound minecraft:block.gravel.break block @a ~ ~ ~ 1 0.5
playsound minecraft:block.sand.place block @a ~ ~ ~ 2 0.9
particle minecraft:poof ~ ~0.3 ~ 0.1 0.1 0.1 0.05 5 normal
particle block minecraft:sand ~ ~0.3 ~ 0.1 0.1 0.1 1 5
particle block minecraft:gravel ~ ~0.3 ~ 0.1 0.1 0.1 1 25

tag @s add has_crushed
