
fill ~ ~-1 ~ ~ ~-1 ~ minecraft:yellow_concrete_powder replace minecraft:yellow_concrete
function renewable_sand:concrete_crush_sound
function renewable_sand:crush_effect
particle block minecraft:yellow_concrete ~ ~0.3 ~ 0.1 0.1 0.1 1 3


say @s is crushing yellow_concrete_to_yellow_concrete_powder.mcfunction
tag @s add has_crushed