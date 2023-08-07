import { IntRange } from "./types"

export type Dimension = 
  "the_end" |
  "nether" |
  "overworld"

export type AnchorPosition =
  "eyes" |
  "feet"

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
    facing: directionsEnum,
    honey_level: IntRange<0,5>
  }
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
  export enum WBannerDirection{
    north = 2,
    south,
    west,
    east
  }
  export enum BoolEnum{
    false,true
  }
  export enum BarrelDirection{
    down,
    up,
    east,
    west,
    south,
    north
  }
  enum directionsEnum{
    south,
    west,
    north,
    east
  }
  export type BlocksState = {
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
    direction: directionsEnum
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
  wall_banner: {
    facing_direction: WBannerDirection
  }

  barrel: {
    facing_direction: BarrelDirection
    open_bit: BoolEnum
  }
  barrier: {}

  basalt: pillarAxisStates
  polished_basalt: pillarAxisStates
  smooth_basalt: pillarAxisStates

  beacon: {}
  bed:{
    direction: directionsEnum
    head_piece_bit: boolean
    occupied_bit: boolean
  }
  bedrock:{
    infiniburn_bit: boolean
  }

  bee_nest: beehiveState,
  beehive: beehiveState

  beetroot:{
    growth: IntRange<0,7>
  }
  bell:{
    attachment:
      "standing" |
      "hanging" |
      "side" |
      "multiple",
    direction: directionsEnum,
    toggle_bit: boolean
  }
  big_dripleaf:{
    big_dripleaf_head: BoolEnum,
    big_dripleaf_tilt:
      "none" |
      "unstable" |
      "partial_tilt" |
      "full_tilt"
    direction: directionsEnum
  }

}

export type Direction = directionsEnum
export type Blocks = keyof BlocksState
