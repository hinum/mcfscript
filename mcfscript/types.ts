import {
  SelectorVarible
} from "./tokenTypes.js"

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export interface Prototype{}
function generateDefindPropArg(props:Record<string,any>){
  const out: Parameters<typeof Object["create"]>[1] = {}
  Object.entries(props).forEach(([propName,prop])=>{
    out[propName] = {
      value: prop,
      enumerable: true
    }
  })
  return out
}
export function createObj(proto:Prototype,props:Record<string,any>){
  return Object.create(proto, generateDefindPropArg(props)) 
}

type TagsList = {
  [tag : string]: string | number
}
export type Selector = `@${SelectorVarible}${""|`[${string}]`}`
const createSelect = (varible:SelectorVarible,tags:TagsList)=>{
  if (Object.keys(tags).length === 0) return `@${varible}`
  return `@${varible}[${Object.entries(tags).map(([tag,value])=>`${tag}:${value},`).join(",")}]`
}
export const sP = (tags:TagsList={})=>createSelect("p",tags)
export const sA = (tags:TagsList={})=>createSelect("a",tags)
export const sR = (tags:TagsList={})=>createSelect("r",tags)
export const sS = (tags:TagsList={})=>createSelect("s",tags)
export const sE = (tags:TagsList={})=>createSelect("e",tags)
//lol

export type ScoreboardValue = `${string} ${Selector | string}`
export type rawTextJson = {
  rawtext: {
    text?: string
    translate?: string
    with?: object[]
    score?: {
      name: Selector
      objective: string
    }
    selector?: Selector
  }[]
}

export type McIntRange = number | Exclude<`${number | ""}..${number | ""}`,"..">
export function range(min: number | null,max:number | null):McIntRange{
  if (min === null && max === null) throw "an int range with both min and max equals null cannot exist"
  return `${min!==null?min:""}..${max!==null?max:""}` as McIntRange
}

type FacingSinglePos = `^${number}`
type RelativeSinglePos = `~${number}`
type positionSingle = FacingSinglePos | RelativeSinglePos | number
export type Position = `${positionSingle} ${positionSingle} ${positionSingle}`

export const pR = (value: number): RelativeSinglePos=>`~${value}`
export const pF = (value: number): FacingSinglePos=>`^${value}`
export const pos = (x: positionSingle,y: positionSingle,z:positionSingle):Position=>`${x} ${y} ${z}`

const isMcType = (value:any):value is {parse():string}=>value.parse !== undefined
export function parse(value: any):string | number{
  if(typeof value == "string" || typeof value == "number") return value
  if(isMcType(value)) return value.parse()
  return JSON.stringify(value)
}
