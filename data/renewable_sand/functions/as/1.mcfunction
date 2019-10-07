execute store result score @s fall_distance run data get entity @s FallDistance 1
execute store result score @s motion_y run data get entity @s Motion[1] 100

execute if score @s fall_distance matches 2.. if score @s motion_y matches ..-45 if block ~ ~-1 ~ minecraft:gravel run function renewable_sand:if/0
execute if score @s fall_distance matches 2.. if score @s motion_y matches ..-55 if block ~ ~-1 ~ minecraft:cobblestone run function renewable_sand:if/1
execute if score @s fall_distance matches 2.. if score @s motion_y matches ..-63 if block ~ ~-1 ~ minecraft:stone_bricks run function renewable_sand:if/2
execute if score @s fall_distance matches 2.. if score @s motion_y matches ..-63 if block ~ ~-1 ~ minecraft:infested_stone_bricks run function renewable_sand:if/3