
execute store result score @s fall_distance run data get entity @s FallDistance 1
execute store result score @s motion_y run data get entity @s Motion[1] 100


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..0 if block ~ ~-1 ~ minecraft:pink_concrete run function renewable_sand:crush/pink_concrete_to_pink_concrete_powder


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..0 if block ~ ~-1 ~ minecraft:black_concrete run function renewable_sand:crush/black_concrete_to_black_concrete_powder


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..0 if block ~ ~-1 ~ minecraft:red_concrete run function renewable_sand:crush/red_concrete_to_red_concrete_powder


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..0 if block ~ ~-1 ~ minecraft:green_concrete run function renewable_sand:crush/green_concrete_to_green_concrete_powder


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..0 if block ~ ~-1 ~ minecraft:brown_concrete run function renewable_sand:crush/brown_concrete_to_brown_concrete_powder


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..0 if block ~ ~-1 ~ minecraft:blue_concrete run function renewable_sand:crush/blue_concrete_to_blue_concrete_powder


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..0 if block ~ ~-1 ~ minecraft:purple_concrete run function renewable_sand:crush/purple_concrete_to_purple_concrete_powder


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..0 if block ~ ~-1 ~ minecraft:cyan_concrete run function renewable_sand:crush/cyan_concrete_to_cyan_concrete_powder


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..0 if block ~ ~-1 ~ minecraft:light_gray_concrete run function renewable_sand:crush/light_gray_concrete_to_light_gray_concrete_powder


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..0 if block ~ ~-1 ~ minecraft:gray_concrete run function renewable_sand:crush/gray_concrete_to_gray_concrete_powder


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..0 if block ~ ~-1 ~ minecraft:lime_concrete run function renewable_sand:crush/lime_concrete_to_lime_concrete_powder


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..0 if block ~ ~-1 ~ minecraft:yellow_concrete run function renewable_sand:crush/yellow_concrete_to_yellow_concrete_powder


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..0 if block ~ ~-1 ~ minecraft:light_blue_concrete run function renewable_sand:crush/light_blue_concrete_to_light_blue_concrete_powder


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..0 if block ~ ~-1 ~ minecraft:magenta_concrete run function renewable_sand:crush/magenta_concrete_to_magenta_concrete_powder


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..0 if block ~ ~-1 ~ minecraft:orange_concrete run function renewable_sand:crush/orange_concrete_to_orange_concrete_powder


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..0 if block ~ ~-1 ~ minecraft:white_concrete run function renewable_sand:crush/white_concrete_to_white_concrete_powder


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..-59 if block ~ ~-1 ~ minecraft:infested_stone_bricks run function renewable_sand:crush/infested_stone_bricks_to_infested_cracked_stone_bricks


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..-59 if block ~ ~-1 ~ minecraft:stone_bricks run function renewable_sand:crush/stone_bricks_to_cracked_stone_bricks


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..-42 if block ~ ~-1 ~ minecraft:gravel run function renewable_sand:crush/gravel_to_sand


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..-42 if block ~ ~-1 ~ minecraft:cobblestone run function renewable_sand:crush/cobblestone_to_gravel


execute if score @s fall_distance matches 2.. if score @s motion_y matches ..-42 if block ~ ~-1 ~ minecraft:stone run function renewable_sand:crush/stone_to_cobblestone

