export default class FlowNode {
  name = ''
  type = 'node'
  code = ''
  constructor({ name, type = 'node', code }) {
    this.name = name
    this.type = type
    this.code = code
  }
}
