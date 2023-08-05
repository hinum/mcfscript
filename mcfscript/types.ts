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
export class selector implements mcType{
  protected tags!: TagsList
  protected varible!: selectorVarible
  constructor(varible: selectorVarible, tags:TagsList){
    this.varible = varible
    this.tags = tags
  }
  parse(){
    return `@${this.varible}[${Object.entries(this.tags).map(([tag,value])=>`${tag}=${value}`).join(",")}]`
  }
}
export function select(varible:selectorVarible,tags:TagsList={}){
  return new selector(varible,tags)
}

export class scoreboardValue implements mcType{
  scoreboard! : string
  entry! : selector | string
  constructor(scoreboard: string, entry: selector | string){
    this.scoreboard = scoreboard
    this.entry = entry
  }
  op(operator: Operator | CompareOperator, using: scoreboardValue | number): mcType{
    return {
      operated : this,
      operator , using,
      parse(){ return `scoreboard players operation ${parse(this.operated)} ${this.operator} ${parse(this.using)}` }
    }
  }
  random(min:number,max:number):mcType{ return { parse(){ return `scoreboard players random ${parse(this.entry)} ${min} ${max}` }}}
  parse(){ return `${this.scoreboard} ${parse(this.entry)}` }
}

export function score(scoreboard: string,entry: selector | string){
  return new scoreboardValue(scoreboard,entry)
}

export function parse(value: mcType | string | number){
  return (typeof value == "string" || typeof value == "number")?
    value : value.parse()
}
