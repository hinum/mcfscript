import { IntRange } from "./types"

export type Dimension = 
  "the_end"
  | "nether"
  | "overworld"

export type SelectorVarible =
  "a" | "p" | "e" | "s" | "r"

export type Operator =
  "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "><"

export type CompareOperator =
  ">" | "<" | "="

type directions = 
  | "north"
  | "south"
  | "east"
  | "west"
type borderConnection = 
  | "none"
  | "short"
  | "tall"
type dyeColors =
  | "white"
  | "black"
  | "orange"
  | "magenta"
  | "light_blue"
  | "yellow"
  | "lime"
  | "pink"
  | "gray"
  | "light_gray"
  | "cyan"
  | "purple"
  | "blue"
  | "green"
  | "red"
type coralColors =
  | "blue"
  | "pink"
  | "purple"
  | "red"
  | "yellow"
type overwoldWood =
  | "wooden"
  | "spruce"
  | "birch"
  | "jungle"
  | "acacia"
  | "dark_oak"
  | "mangrove"
  | "cherry"
type netherWood =
  | "crimson"
  | "warped"
type woodType = overwoldWood | netherWood | "bamboo"
type ores =
  | "diamond"
  | "lapis"
  | "emerald"
  | "redstone"
  | "coal"
type ingotOre = 
  | "iron"
  | "gold"
  | "copper"
type genObj<props extends string,element> = {
  [prop in props]: element
}
type genType<l extends string> = "" | `${l}_`
type invGenType<l extends string> = "" | `_${l}`
type copperBlocks = `${genType<"waxed">}${genType<
  | "exposed"
  | "weathered"
  | "oxidized"
  >}${genType<"cut">}copper`
type buttonType =
  | woodType 
  | "polished_blackstone" 
  | "stone"

export enum RailDirection {
  goingNorth,
  goingWest,
  acsendEast,
  acsendWest,
  ascendNorth,
  ascendSouth
}
export enum xyDirection{
  x,y
}
export enum SBannerDirection {
  south,
  ssw,
  sw,
  wsw,
  west,
  wnw,
  nw,
  nnw,
  north,
  nne,
  ne,
  ene,
  east,
  ese,
  se,
  sse
}
export enum dunsweDirection{
  down,
  up,
  north,
  south,
  west,
  east
}
export enum BoolEnum{
  false,true
}
export enum duewsnDirection{
  down,
  up,
  east,
  west,
  south,
  north
}
export enum swneDirection{
  south,
  west,
  north,
  east
}
export enum ewsnDirection{
  east,
  west,
  south,
  north
}
export enum eswnDirection{
  east,
  south,
  west,
  north
}
export type BlocksState = 
  genObj<`quartz_${"block"|"bricks"}`,{
    pillar_axis : "x" | "y" | "z"
    chisel_type:
      | "default"
      | "chiseled"
      | "lines"
      | "smooth"
  }>&

  genObj<`${buttonType}_button`,{
    button_pressed_bit: boolean
    facing_direction: duewsnDirection
  }> &

  genObj<`${genType<dyeColors>}candle_cake`,{
    lit:boolean
  }>&

  genObj<`${"small"|"medium"|"large"}_amethyst_bud` | "amethyst_cluster",{
    block_face : directions | "up" | "down" //might be broken watch out
  }>&

  genObj<`${genType<dyeColors>}candle`,{
    candles: IntRange<0,3>
    lit: boolean
  }>&
  genObj<"carrots"| "beetroot",{
    growth: IntRange<0,7>
  }>&

  genObj<"beehive"| "bee_nest",{
    facing: swneDirection,
    honey_level: IntRange<0,5>
  }>&

  genObj<`${genType<"soul">}campfire`,{
    fill_level: IntRange<0,6>
    cauldron_liquid:
      | "water"
      | "lava"
      | "powerder_snow"
  }>&

  genObj<`${dyeColors}_concrete_powder`,{
    color: dyeColors
  }>&

  genObj<`${genType<"lava">}cauldron`,{
    direction: ewsnDirection
    extinguished: boolean
  }>&
  
  genObj<`coral_fan${invGenType<"dead">}`,{
    coral_color: coralColors
    direction: xyDirection
  }>&
  genObj<`coral_fan_hang${""|"2"|"3"}`,{
    coral_hang_type_bit: boolean
    coral_direction: ewsnDirection
    dead_bit: boolean
  }>&
  
  genObj<`daylight_detector${invGenType<"inverted">}`,{
    redstone_signal: IntRange<0,15>
  }>&
  
  genObj<`${woodType | "iron"}_door`,{
    direction: eswnDirection
    door_hinge_bit: boolean
    open_bit: boolean
    upper_block_bit: boolean
  }>&

  genObj<
    | "air"
    | "deny"
    | "allow"
    | "ancient_debris"
    | "beacon"
    | "barrier"
    | "bamboo_mosiac"
    | "chain"
    | "clay"
    | "chrous_plant"
    | "cartography_table"
    | "blue_ice"
    | "bookshelf"
    | "blackstone"
    | "chiseled_deepslate"
    | "calcite"
    | "budding_amethyst"
    | "conduit"
    | "crafting_table"
    | "crying_obsidian"
    | "deadbush"
    | "grass_path"
    | "dragon_egg"
    | "dried_kelp_block"
    | "dripstone_block"

    | `${"brick"| "amethyst"}_block`
    | `${"nether_gold"|"quartz"}_ore`
    | `${genType<"flowering">}azalea`
    | `${genType<"dead">}${
      | "tube"
      | "brian"
      | "fire"
      | "horn" }_coral`
    | `${genType<"cracked">}deepslate_${"bricks"|"tiles"}`

    | `${dyeColors}_carpet`
    | `raw_${ingotOre}_block`
    | `${genType<"deepslate">}${ores | ingotOre}_ore`
    | Exclude<copperBlocks,"copper">
    | `${dyeColors}_concrete`,Record<string,never>>&

  genObj<
    | "wall_banner"
    | `${genType<"lit">}${`${genType<"blast">}furnace`| "smoker"}`,
  { facing_direction: dunsweDirection }>&

  genObj<
    | "bione_block"
    | "deepslate"

    | `${genType<"polished"|"smooth">}basalt`
    | `${genType<"stripped">}${
      | "bamboo_block"
      | `${overwoldWood}_log`
      | `${netherWood}_stem`}`,
    { pillar_axis : "x" | "y" | "z" }>&
  
  genObj<"detector_rail"|"detector_rail",{
    rail_data_bit: boolean
    rail_direction: RailDirection
  }>&

  genObj<`${genType<"chained"|"repeating">}command_block`,{
    conditional_bit: boolean,
    facing_direction: dunsweDirection
  }>&

  genObj<"dispenser"|"dropper",{
    facing_direction: dunsweDirection
    triggered_bit: boolean
  }>&
{
  stone: {
    stone_type: 
      | "stone"
      | "granite"
      | "granite_smooth"
      | "diorite"
      | "diorite_smooth"
      | "andesite"
      | "andesite_smooth"
  }
  anvil: {
    damage: 
      | "broken"
      | "slightly_damage"
      | "undamage"
      | "very_damaged"
    direction: swneDirection
  }
  bamboo: {
    age_bit: boolean
    bamboo_leaf_size:
      | "no_leaves"
      | "small_leaves"
      | "large_leaves"
    bamboo_stalk_thickness:
      | "thin"
      | "thick"
  }
  bamboo_sapling: {
    age_bit: boolean
  }
  standing_banner: {
    ground_sign_direction: SBannerDirection
  }
  barrel: {
    facing_direction: duewsnDirection
    open_bit: BoolEnum
  }
  bed:{
    direction: swneDirection
    head_piece_bit: boolean
    occupied_bit: boolean
  }
  bedrock:{
    infiniburn_bit: boolean
  }
  bell:{
    attachment:
      | "standing"
      | "hanging"
      | "side"
      | "multiple",
    direction: swneDirection,
    toggle_bit: boolean
  }
  big_dripleaf:{
    big_dripleaf_head: BoolEnum,
    big_dripleaf_tilt:
      | "none"
      | "unstable"
      | "partial_tilt"
      | "full_tilt"
    direction: swneDirection
  }
  border_block:genObj<`wall_connection_type_${directions}`,borderConnection>&{
    wall_post_bit: boolean
  }
  brewing_stand:genObj<`brewing_stand_slot_${"a"|"b"|"c"}_bit`,boolean>
  bubble_column:{
    drag_down:boolean
  }
  cactus:{
    age: IntRange<0,15>
  }
  cake: {
    bite_counter: IntRange<0,6>
  }
  calibrated_sculk_sensor:{
    cardinal_directions : directions
    sculk_sensor_phase: IntRange<0,2>
  }
  chest:{
    facing_direction: dunsweDirection
    books_stored: IntRange<0,63>
  }
  chorus_flower:{
    age: IntRange<0,5>
  }
  decorated_pot:{
    warnig: "page do not exist on the wiki sorry"//page for this does not exist on the wiki yet lol
  }
  composter:{
    composter_fill_level: IntRange<0,8>
  }
  coral_block:{
    dead_bit: boolean
    coral_color: coralColors
  }
}

export type Blocks = keyof BlocksState
