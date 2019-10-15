
fill ~ ~-1 ~ ~ ~-1 ~ minecraft:light_blue_concrete_powder replace minecraft:light_blue_concrete
function renewable_sand:concrete_crush_sound
function renewable_sand:crush_effect
particle block minecraft:light_blue_concrete ~ ~0.3 ~ 0.1 0.1 0.1 1 3


say @s is crushing light_blue_concrete_to_light_blue_concrete_powder.mcfunction
tag @s add has_crushed