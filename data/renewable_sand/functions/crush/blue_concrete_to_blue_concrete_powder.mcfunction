
fill ~ ~-1 ~ ~ ~-1 ~ minecraft:blue_concrete_powder replace minecraft:blue_concrete
function renewable_sand:concrete_crush_sound
function renewable_sand:crush_effect
particle block minecraft:blue_concrete ~ ~0.3 ~ 0.1 0.1 0.1 1 3


say @s is crushing blue_concrete_to_blue_concrete_powder.mcfunction
tag @s add has_crushed