const NAMESPACE = 'renewable_sand'

const values = [
  "minecraft:white_concrete",
  "minecraft:orange_concrete",
  "minecraft:magenta_concrete",
  "minecraft:light_blue_concrete",
  "minecraft:yellow_concrete",
  "minecraft:lime_concrete",
  "minecraft:gray_concrete",
  "minecraft:light_gray_concrete",
  "minecraft:cyan_concrete",
  "minecraft:purple_concrete",
  "minecraft:blue_concrete",
  "minecraft:brown_concrete",
  "minecraft:green_concrete",
  "minecraft:red_concrete",
  "minecraft:black_concrete",
]

// let cmds = values.map(v => `execute if block ~ ~-1 ~ ${v} run function renewable_sand:if/${v.split(':')[1]}`).join('\n')

function stripIndents(strings) {
  return strings.raw.join('').replace(/^[^\S\n]+/gm, '')
}

let files = values.map(v => {
  let name = v.split(':')[1]
  return {
    path: `./data/${NAMESPACE}/functions/block/${name}.mcfunction`,
    code: `
    	fill ~ ~-1 ~ ~ ~-1 ~ ${v}_powder replace ${v}
    	function renewable_sand:concrete_crush_sound
    	function renewable_sand:crush_effect
    	particle block ${v} ~ ~0.3 ~ 0.1 0.1 0.1 1 3
  	`
  }
})

files.push({
  path: `./data/${NAMESPACE}/functions/if/concrete.mcfunction`,
  code: values.map(v => `execute if block ~ ~-1 ~ ${v} run function renewable_sand:block/${v.split(':')[1]}`).join('\n')
})


const encoder = new TextEncoder();

async function main() {
  files.forEach(async f => {
    const sections = f.path.split('/')
    
    const path = sections.slice(0, sections.length - 1).join('/')
    

    const data = encoder.encode(f.code);
    
    await Deno.mkdir(path, true);

    // const file = await Deno.open(f.path);
    
    await Deno.writeFile(f.path, data);
  })



  await Deno.writeFile(`./data/${NAMESPACE}/tags/blocks/concrete.json`, encoder.encode(JSON.stringify({
    replace: false,
    values: values
  })))
}

main()