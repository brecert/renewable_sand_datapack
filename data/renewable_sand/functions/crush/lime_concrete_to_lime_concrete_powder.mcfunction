
fill ~ ~-1 ~ ~ ~-1 ~ minecraft:lime_concrete_powder replace minecraft:lime_concrete
function renewable_sand:concrete_crush_sound
function renewable_sand:crush_effect
particle block minecraft:lime_concrete ~ ~0.3 ~ 0.1 0.1 0.1 1 3


say @s is crushing lime_concrete_to_lime_concrete_powder.mcfunction
tag @s add has_crushed