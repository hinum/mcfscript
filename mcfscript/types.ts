import {
  CompareOperator,
  Operator,
  SelectorVarible
} from "./tokenTypes.js"

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export interface McType{
  parse : ()=>string,
  [propName: string]: any,
}

interface TagsList {
  [tag : string]: string | number
}
export interface Selector extends McType{
  varible: SelectorVarible,
  tags: TagsList,
}
const selectorProto: Selector = {
  varible : "p",
  tags : {},
  parse(){
    return `@${this.varible}${ Object.keys(this.tags).length !== 0 ?
        `[${Object.entries(this.tags).map(([tag,value])=>`${tag}=${value}`).join(",")}]` : ""}`
  }
}
export function select(varible:SelectorVarible,tags:TagsList={}): Selector{
  return Object.create(selectorProto, {
    tags:{
      value : tags,
      enumerable: true,
    },
    varible : { 
      value : varible,
      enumerable: true
    }
  })
}

export interface ScoreboardValue extends McType{
  scoreboard : string
  entry: Selector | string
}
const scoreboardValueProto: ScoreboardValue = {
  scoreboard: "placeholder",
  entry: "placeholder",
  op(operator: Operator | CompareOperator, using: ScoreboardValue | number): McType{
    return {
      operated : this,
      operator , using,
      parse(){ return `scoreboard players operation ${parse(this.operated)} ${this.operator} ${parse(this.using)}` }
    }
  },
  random(min: number, max:number) { return `scoreboard players random ${this.parse()} ${min} ${max}`},
  parse(){ return `${this.scoreboard} ${parse(this.entry)}`}
}
export function score(scoreboard: string,entry: Selector | string): ScoreboardValue{
  return Object.create(scoreboardValueProto,{
    scoreboard:{
      value: scoreboard,
      enumerable: true
    },
    entry: {
      value: entry,
      enumerable: true
    }
  })
}

export function parse(value: McType | string | number){
  return (typeof value == "string" || typeof value == "number") ?
    value : value.parse()
}
