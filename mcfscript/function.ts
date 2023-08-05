import { CompareOperator, Dimension, anchorPosition } from "./tokenTypes";
import { mcType, parse, scoreboardValue, selector } from "./types";

interface SaveOpt{
  path : string,
  behaviourpackName : string
}
export async function saveNewFile(src: string, path:string){
  console.log(`[${path}] ${src}`)
}

export class Execute implements mcType{
  private builtString: string = "execute"
  parse(){return this.builtString }
  
  private addString(begin: string, ...args: (string |number| mcType)[]){
    this.builtString += ` ${begin} ${args.map(parse).join(" ")}`
    return this
  }

  at(pos: selector){return this.addString("at",pos)}
  as(value: selector){return this.addString("as",value)}
  align(axes: string){return this.addString("align",axes)}
  anchor(where: anchorPosition){return this.addString("anchored",where)}
  facing(pos: string){return this.addString("facing",pos)}
  facingE(target: selector, to: anchorPosition){ return this.addString("facing", target ,to)}
  pos(pos:string){ return this.addString("positioned",pos)}
  posAs(entity:selector){ return this.addString("posotioned as", entity)}
  rotate(pos:string){ return this.addString("rotated",pos)}
  rotateAs(entity:selector){ return this.addString("rotated as",entity)}
  in(dimension:Dimension){ return this.addString("in", dimension)}

  ifb(value: string, unless:boolean=false){return this.addString(unless? "unless block": "if block",value)} 
  ifbs(value: string, unless:boolean=false){return this.addString(unless? "unless blocks": "if blocks",value)}
  ife(value: selector, unless:boolean=false){return this.addString(unless? "unless entity": "if entity",value)}
  ifs(value: scoreboardValue, op:CompareOperator, to:scoreboardValue | number, unless:boolean=false){return this.addString(unless? "unless score": "if score",value,op,to)}
  ifsm(to: scoreboardValue,range: string, unless:boolean=false){return this.addString(unless? "unless score": "if score",to,`matches ${range}`)}

  run(cmdFunc: (b:functionBuilder)=>void, saveOpt: SaveOpt){ return this.addString("run",f(cmdFunc,saveOpt)) }
}

abstract class Builders{
  builtString: string = "\n"
  parse(){return this.builtString}
  abstract run(cmd: string | mcType):void

  execute(func: (e:Execute)=>void){
    const exe = new Execute()
    func(exe)
    this.run(exe)
  }
  tp(target:selector,to:string){ this.run(`tp ${parse(target)} ${to}`) }
}
export class functionBuilder extends Builders{
  run(cmd: string | mcType){this.builtString += `${parse(cmd)}\n`}
}
const functionBuilderProto = new functionBuilder()

export function fNamed(name:string,buildFunction:(fb:functionBuilder)=>void,saveOpt: SaveOpt):mcType{
  const fb = Object.create(functionBuilderProto)
  buildFunction(fb)
  const parsed: string = fb.parse()
  saveNewFile(parsed, `${saveOpt.path}${name}.mcfunction`) 
  return {parse : ()=>`function ${saveOpt.behaviourpackName}:${name}`}
}
export const f = (buildFunction:(fb:functionBuilder)=>void,saveOpt:SaveOpt) => fNamed("f"+Math.floor(Math.random()*1000000).toString(),buildFunction, saveOpt)
