
fill ~ ~-1 ~ ~ ~-1 ~ minecraft:magenta_concrete_powder replace minecraft:magenta_concrete
function renewable_sand:concrete_crush_sound
function renewable_sand:crush_effect
particle block minecraft:magenta_concrete ~ ~0.3 ~ 0.1 0.1 0.1 1 3


say @s is crushing magenta_concrete_to_magenta_concrete_powder.mcfunction
tag @s add has_crushed