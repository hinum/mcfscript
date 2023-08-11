import { CompareOperator, Dimension,  Blocks, BlocksState, Operator, } from "./tokenTypes.js";
import { createObj, McIntRange, parse, parseObjType, Position, Prototype, ScoreboardValue, Selector } from "./types.js";

interface SaveOpt {
  path: string,
  behaviourpackName: string
}
async function saveNewFile(src: string, path: string) {
  console.log(`[${path}] ${src}`)
}

const executeProto = new class{
  protected _builtString : string = "execute"
  protected _root! : Builders
  _addString(begin: string, ...args: any[]) {
    this._builtString += ` ${begin} ${args.map(parse).join(" ")}`
    return this
  }

  at(pos: Selector) {
    return this._addString("at", pos)
  }
  as(value: Selector) {
    return this._addString("as", value)
  }
  align(axes: Exclude<`${"x"|""}${"y"|""}${"z"|""}`,"">) {
    return this._addString("align", axes)
  }
  anchor(where: "eyes" | "feet") {
    return this._addString("anchored", where)
  }
  facing(pos: Position) {
    return this._addString("facing", pos)
  }
  facingE(target: Selector, to: "eyes" | "feet") {
    return this._addString("facing", target, to)
  }
  pos(pos: Position) {
    return this._addString("positioned", pos)
  }
  posAs(entity: Selector) {
    return this._addString("posotioned as", entity)
  }
  rotate(yaw: number, pitch: number) {
    return this._addString("rotated", yaw,pitch)
  }
  rotateAs(entity: Selector) {
    return this._addString("rotated as", entity)
  }
  in(dimension: Dimension) {
    return this._addString("in", dimension)
  }

  ifb<b extends Blocks>(pos:Position, block: b, unless: boolean = false,blockState: Partial<BlocksState[b]> = {}) {
    return this._addString(unless ? "unless block" : "if block", pos, block, parseObjType(blockState))
  }
  ifbs(begin: Position, end:Position, destination: Position, unless: boolean = false, scanMode: "all" | "masked"="all") { 
    return this._addString(unless ? "unless blocks" : "if blocks", begin, end,destination,scanMode)
  }
  ife(value: Selector, unless: boolean = false) {
    return this._addString(unless ? "unless entity" : "if entity", value)
  }
  ifs(value: ScoreboardValue, op: CompareOperator, to: ScoreboardValue | number, unless: boolean = false) {
    return this._addString(unless ? "unless score" : "if score", value, op, to)
  }
  ifsm(to: ScoreboardValue, range: McIntRange, unless: boolean = false) {
    return this._addString(unless ? "unless score" : "if score", to, `matches ${range}`) 
  }

  run(cmdFunc: (b: spreadBuilder) => void) {
    this._root.spread(cmdFunc, `${this._builtString} run `)
  }
  runF(cmdFunc: (b: functionBuilder) => void) {
    this._root.createFunc(cmdFunc)
  }
}
type execute = typeof executeProto

abstract class Builders{
  abstract run(cmd: string): void
  protected _root!: Builders
  protected get _saveOpt(): SaveOpt{
    return this._root._saveOpt
  }

  scoreOp(operated:ScoreboardValue,operator:Operator|CompareOperator,using:number|ScoreboardValue){
    this.run(`scoreboard players operation ${operated} ${operator} ${using}`)
  }
  scoreInit(scoreboard:string, displayName?:string){
    this.run(`scoreboard objective add ${scoreboard} dummy ${displayName ?? scoreboard}`)
  }

  execute(func: (e: execute) => void) {
    const exe = createObj(executeProto,{_root: this})
    func(exe)
  }
  tp(target: Selector, to: Position) {
    this.run(`tp ${parse(target)} ${to}`)
  }
  say(value: string) {
    this.run(`say "${value}"`)
  }
  setblock<b extends Blocks>(pos:Position,block: b,blockState:Partial<BlocksState[b]>={},setMode:"destroy"|"keep"|"replace"="replace") {
    this.run(`setblock ${pos} ${block} ${parseObjType(blockState)} ${setMode}`)
  }
  createFunc(funcBuilder:(fb:functionBuilder)=>void){
    this.run(func(funcBuilder,this._saveOpt))
  }
  spread(spreadBuilder:(fb:spreadBuilder)=>void,startsWith: string = ""){
    sf(this,startsWith,spreadBuilder)
  }
}
export class functionBuilder extends Builders{
  protected _builtString: string = "\n"
  run(cmd: string) {
    this._builtString += `${cmd}\n`
  }
  parse(){
    return this._builtString
  }
}
class spreadBuilder extends Builders {
  protected _beginsWith!: string
  protected _negated: boolean = false
  run(cmd: string) {
    this._root.run(this._negated ? "" : this._beginsWith + cmd)
    this._negated = false
  }
  negate() {
    this._negated = true
  }
}
const functionBuilderProto = new functionBuilder() as Prototype
const spreadBuilderProto = new spreadBuilder() as Prototype

function sf(root: Builders, begins: string, buildFunction: (sb: spreadBuilder) => void) {
  const sb = createObj(spreadBuilderProto,{_root:root  , _beginsWith: begins})
  buildFunction(sb)
}

export function fNamed(name: string, buildFunction: (fb: functionBuilder) => void, saveOpt: SaveOpt):string{
  const fb = createObj(functionBuilderProto,{_saveOpt:saveOpt})
  buildFunction(fb)
  saveNewFile(fb.parse(), `${saveOpt.path}${name}.mcfunction`)
  return `function ${saveOpt.behaviourpackName}:${name}`
}
const func = (buildFunction: (fb: functionBuilder) => void, saveOpt: SaveOpt) => fNamed("f" + Math.floor(Math.random() * 1000000).toString(), buildFunction, saveOpt)
