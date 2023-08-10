import { IntRange } from "./types"

export type Dimension = 
  "the_end" |
  "nether" |
  "overworld"

export type SelectorVarible =
  "a" | "p" | "e" | "s" | "r"

export type Operator =
  "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "><"

export type CompareOperator =
  ">" | "<" | "="

type directions = 
    "north" |
    "south" |
    "east" |
    "west"

type amethystBudStates= {
  block_face : directions | "up" | "down" //might be broken watch out
}
type pillarAxisStates = {
  pillar_axis : "x" | "y" | "z"
}
type beehiveState = {
  facing: swneDirection,
  honey_level: IntRange<0,5>
}
type noUDfacingState = {
  facing_direction: dunsweDirection
}
type quartzState = pillarAxisStates&{
  chisel_type:
    "default" |
    "chiseled" |
    "lines" |
    "smooth"
}
type cakeWithCandleState = {
  lit: boolean
}
type buttonState = {
  button_pressed_bit: boolean
  facing_direction: duewsnDirection
}
type campfireState = {
  direction: ewsnDirection
  extinguished: boolean
}
type plantState = {
  growth: IntRange<0,7>
}
type cauldronState = {
  fill_level: IntRange<0,6>
  cauldron_liquid:
    "water" |
    "lava" |
    "powerder_snow"
}
type borderConnection = 
  "none" |
  "short" |
  "tall"
type dyeColors =
  "white" |
  "black" |
  "orange" |
  "magenta" |
  "light_blue" |
  "yellow" |
  "lime" |
  "pink" |
  "gray" |
  "light_gray" |
  "cyan" |
  "purple" |
  "blue" |
  "green" |
  "red"
type woodType =
  "wooden" |
  "spruce" |
  "birch" |
  "jungle" |
  "acacia" |
  "dark_oak" |
  "mangrove" |
  "bamboo" |
  "cherry" |
  "crimson" |
  "warped"
type ores =
  "diamond" |
  "lapis" |
  "emerald" |
  "redstone" |
  "coal"
type ingotOre = 
  "iron" |
  "gold" |
  "copper"
type genObj<props extends string,element> = {
  [prop in props]: element
}
type genType<l extends string> = "" | `${l}_`
type copperBlocks = `${genType<"waxed">}${genType<
  "exposed" |
  "weathered" |
  "oxidized"
  >}${genType<"cut">}copper`
type buttonType = woodType | "polished_blackstone" | "stone"
export enum RailDirection {
  goingNorth,
  goingWest,
  acsendEast,
  acsendWest,
  ascendNorth,
  ascendSouth
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
export type BlocksState = 
  genObj<`${buttonType}_button`,buttonState> &
  genObj<Exclude<copperBlocks,"copper">,{}>&
  genObj<`${genType<dyeColors>}candle_cake`,cakeWithCandleState>&
  genObj<`${genType<dyeColors>}candle`,{
    candles: IntRange<0,3>
    lit: boolean
  }>&
  genObj<`${ores | ingotOre | "netherite"}_block`,{}>&
  genObj<`${Exclude<genType<dyeColors>,"">}carpet`,{}>&
  genObj<`raw_${ingotOre}_block`,{}>&
{
  activator_rail : {
    rail_data_bit: boolean
    rail_direction: RailDirection
  }
  air: {}
  allow: {}
  deny: {}

  small_amethyst_bud: amethystBudStates
  medium_amethyst_bud: amethystBudStates
  large_amethyst_bud: amethystBudStates
  amethyst_cluster: amethystBudStates
  
  ancient_debris: {}
  stone: {
    stone_type: 
      "stone" |
      "granite" |
      "granite_smooth" |
      "diorite" |
      "diorite_smooth" |
      "andesite" |
      "andesite_smooth"
  }
  anvil: {
    damage: 
      "broken" |
      "slightly_damage" |
      "undamage" |
      "very_damaged"
    direction: swneDirection
  }
  azela: {}
  flowering_azalea: {}

  bamboo: {
  age_bit: boolean
  bamboo_leaf_size:
    "no_leaves" |
    "small_leaves" |
    "large_leaves"
  bamboo_stalk_thickness:
    "thin" |
    "thick"
  }
  bamboo_sapling: {
    age_bit: boolean
  }
  bamboo_mosaic: {}

  standing_banner: {
    ground_sign_direction: SBannerDirection
  }
  wall_banner: noUDfacingState

  barrel: {
    facing_direction: duewsnDirection
    open_bit: BoolEnum
  }
  barrier: {}

  basalt: pillarAxisStates
  polished_basalt: pillarAxisStates
  smooth_basalt: pillarAxisStates

  beacon: {}
  bed:{
    direction: swneDirection
    head_piece_bit: boolean
    occupied_bit: boolean
  }
  bedrock:{
    infiniburn_bit: boolean
  }

  bee_nest: beehiveState,
  beehive: beehiveState

  beetroot: plantState
  bell:{
    attachment:
      "standing" |
      "hanging" |
      "side" |
      "multiple",
    direction: swneDirection,
    toggle_bit: boolean
  }
  big_dripleaf:{
    big_dripleaf_head: BoolEnum,
    big_dripleaf_tilt:
      "none" |
      "unstable" |
      "partial_tilt" |
      "full_tilt"
    direction: swneDirection
  }
  blackstone: {}
  amethyst_block: {}

  blast_furnace: noUDfacingState
  lit_blast_furnace: noUDfacingState

  bamboo_block: pillarAxisStates
  stripped_bamboo_block: pillarAxisStates

  brick_block:{}
  quartz_block: quartzState
  quartz_bricks: quartzState

  blue_ice:{}
  bone_block: pillarAxisStates
  bookshelf:{}
  border_block:genObj<`wall_connection_type_${directions}`,borderConnection>&{
    wall_post_bit: boolean
  }
  brewing_stand:genObj<`brewing_stand_slot_${"a"|"b"|"c"}_bit`,boolean>
  bubble_column:{
    drag_down:boolean
  }
  budding_amethyst:{}
  cactus:{
    age: IntRange<0,15>
  }
  cake: {
    bite_counter: IntRange<0,6>
  }
  calcite:{}
  calibrated_sculk_sensor:{
    cardinal_directions : directions
    sculk_sensor_phase: IntRange<0,2>
  }
  
  campfire: campfireState
  soul_campfire: campfireState

  carrots: plantState
  cartography_table: {}

  cauldron: cauldronState
  lava_cauldron: cauldronState

  chain: pillarAxisStates
  chest:{
    facing_direction: dunsweDirection
    books_stored: IntRange<0,63>
  }
  chiseled_deepslate:{}
  chorus_flower:{
    age: IntRange<0,5>
  }
  chorus_plant:{}
  clay:{}
  decorated_pot:{
    //page for this does not exist on the wiki yet lol
  }
  
}

export type Blocks = keyof BlocksState
