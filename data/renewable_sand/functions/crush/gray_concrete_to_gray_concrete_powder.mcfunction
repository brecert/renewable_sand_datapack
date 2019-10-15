
fill ~ ~-1 ~ ~ ~-1 ~ minecraft:gray_concrete_powder replace minecraft:gray_concrete
function renewable_sand:concrete_crush_sound
function renewable_sand:crush_effect
particle block minecraft:gray_concrete ~ ~0.3 ~ 0.1 0.1 0.1 1 3


say @s is crushing gray_concrete_to_gray_concrete_powder.mcfunction
tag @s add has_crushed