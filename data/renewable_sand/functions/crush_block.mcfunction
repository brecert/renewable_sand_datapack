execute store result score @s fall_distance run data get entity @s FallDistance 1
execute store result score @s motion_y run data get entity @s Motion[1] 100

execute if score @s fall_distance matches 2.. if score @s motion_y matches ..-45 if block ~ ~-0.7 ~ minecraft:gravel run function renewable_sand:if/gravel
execute if score @s fall_distance matches 2.. if score @s motion_y matches ..-55 if block ~ ~-0.7 ~ minecraft:cobblestone run function renewable_sand:if/cobblestone
execute if score @s fall_distance matches 2.. if score @s motion_y matches ..-63 if block ~ ~-0.7 ~ minecraft:stone_bricks run function renewable_sand:if/stone_bricks
execute if score @s fall_distance matches 2.. if score @s motion_y matches ..-63 if block ~ ~-0.7 ~ minecraft:infested_stone_bricks run function renewable_sand:if/infested_stone_bricks
execute if score @s fall_distance matches 2.. if score @s motion_y matches ..-63 if block ~ ~-0.7 ~ #renewable_sand:concrete run function renewable_sand:if/concrete