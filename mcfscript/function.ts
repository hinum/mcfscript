import { CompareOperator, Dimension, AnchorPosition, Blocks, BlocksState } from "./tokenTypes.js";
import { McType, parse, ScoreboardValue, Selector } from "./types.js";

interface SaveOpt {
  path: string,
  behaviourpackName: string
}
async function saveNewFile(src: string, path: string) {
  console.log(`[${path}] ${src}`)
}

class Execute implements McType {
  private builtString: string = "execute"
  private root!: Builders
  parse() { return this.builtString }

  private addString(begin: string, ...args: (string | number | McType)[]) {
    this.builtString += ` ${begin} ${args.map(parse).join(" ")}`
    return this
  }

  at(pos: Selector): this { return this.addString("at", pos) }
  as(value: Selector) { return this.addString("as", value) }
  align(axes: string) { return this.addString("align", axes) }
  anchor(where: AnchorPosition) { return this.addString("anchored", where) }
  facing(pos: string) { return this.addString("facing", pos) }
  facingE(target: Selector, to: AnchorPosition) { return this.addString("facing", target, to) }
  pos(pos: string) { return this.addString("positioned", pos) }
  posAs(entity: Selector) { return this.addString("posotioned as", entity) }
  rotate(pos: string) { return this.addString("rotated", pos) }
  rotateAs(entity: Selector) { return this.addString("rotated as", entity) }
  in(dimension: Dimension) { return this.addString("in", dimension) }

  ifb(value: string, unless: boolean = false) { return this.addString(unless ? "unless block" : "if block", value) }
  ifbs(value: string, unless: boolean = false) { return this.addString(unless ? "unless blocks" : "if blocks", value) }
  ife(value: Selector, unless: boolean = false) { return this.addString(unless ? "unless entity" : "if entity", value) }
  ifs(value: ScoreboardValue, op: CompareOperator, to: ScoreboardValue | number, unless: boolean = false) { return this.addString(unless ? "unless score" : "if score", value, op, to) }
  ifsm(to: ScoreboardValue, range: string, unless: boolean = false) { return this.addString(unless ? "unless score" : "if score", to, `matches ${range}`) }

  run(cmdFunc: (b: spreadBuilder) => void) {
    sf(this.root, this.builtString + " run ", cmdFunc)
    this.builtString = ""
  }
  runF(cmdFunc: (b: functionBuilder) => void, saveOpt: SaveOpt) { return this.addString("run", func(cmdFunc, saveOpt)) }
}
const executeProto = new Execute()
abstract class Builders {
  abstract run(cmd: string | McType): void

  execute(func: (e: Execute) => void) {
    const exe = Object.create(executeProto,{
      root: { value: this }
    })
    func(exe)
    this.run(exe)
  }
  tp(target: Selector, to: string) {
    this.run(`tp ${parse(target)} ${to}`)
  }
  say(value: string) {
    this.run(`say ${value}`)
  }
  setblock<b extends Blocks>(block: b,blockState:Partial<BlocksState[b]>) {
    this.run(`unfinshed ${block}`)
  }
}
class functionBuilder extends Builders {
  protected builtString: string = "\n"
  parse() { return this.builtString }
  run(cmd: string | McType) { this.builtString += `${parse(cmd)}\n` }
}
class spreadBuilder extends Builders {
  protected root!: Builders
  protected beginsWith!: string
  protected negated: boolean = false
  run(cmd: McType | string) {
    this.root.run(this.negated ? "" : this.beginsWith + parse(cmd))
    this.negated = false
  }
  negate() {
    this.negated = true
  }
}
const functionBuilderProto = new functionBuilder()
const spreadBuilderProto = new spreadBuilder()

export function sf(root: Builders, bengins: string, buildFunction: (sb: spreadBuilder) => void) {
  const sb = Object.create(spreadBuilderProto, {
    root: {
      value: root,
      enumerable: true
    },
    beginsWith: {
      value: bengins,
      enumerable: true
    }
  })
  buildFunction(sb)
}

export function fNamed(name: string, buildFunction: (fb: functionBuilder) => void, saveOpt: SaveOpt): McType {
  const fb = Object.create(functionBuilderProto)
  buildFunction(fb)
  const parsed: string = fb.parse()
  saveNewFile(parsed, `${saveOpt.path}${name}.mcfunction`)
  return { parse: () => `function ${saveOpt.behaviourpackName}:${name}` }
}
export const func = (buildFunction: (fb: functionBuilder) => void, saveOpt: SaveOpt) => fNamed("f" + Math.floor(Math.random() * 1000000).toString(), buildFunction, saveOpt)
