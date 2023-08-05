import {
  CompareOperator,
  Operator,
  selectorVarible
} from "./tokenTypes"

export interface mcType{
  parse : ()=>string,
  [propName: string]: any,
}

interface TagsList {
  [tag : string]: string | number
}
export interface selector extends mcType{
  varible: selectorVarible,
  tags: TagsList,
}
const selectorProto: selector = {
  varible : "p",
  tags : {},
  parse(){
    return `@${this.varible}${ Object.keys(this.tags).length !== 0 ?
        `[${Object.entries(this.tags).map(([tag,value])=>`${tag}=${value}`).join(",")}]` : ""}`
  }
}
export function select(varible:selectorVarible,tags:TagsList={}): selector{
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

export interface scoreboardValue extends mcType{
  scoreboard : string
  entry: selector | string
}
const scoreboardValueProto: scoreboardValue = {
  scoreboard: "placeholder",
  entry: "placeholder",
  op(operator: Operator | CompareOperator, using: scoreboardValue | number): mcType{
    return {
      operated : this,
      operator , using,
      parse(){ return `scoreboard players operation ${parse(this.operated)} ${this.operator} ${parse(this.using)}` }
    }
  },
  random(min: number, max:number) { return `scoreboard players random ${this.parse()} ${min} ${max}`},
  parse(){ return `${this.scoreboard} ${parse(this.entry)}`}
}
export function score(scoreboard: string,entry: selector | string): scoreboardValue{
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

export function parse(value: mcType | string | number){
  return (typeof value == "string" || typeof value == "number") ?
    value : value.parse()
}
