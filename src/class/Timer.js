import { typeOf } from '@/utils/assist'

export default class Timer {
  fn = undefined
  delay = undefined
  immediate = false
  timer = null
  args = null
  constructor(delay, immediate = false, fn, ...args) {
    this.fn = fn
    this.delay = delay
    this.immediate = immediate
    this.args = args
  }

  setImmediate(immediate) {
    this.immediate = immediate
    return this
  }

  setFunction(fn, ...args) {
    this.fn = fn
    this.args = args
    return this
  }

  setDelay(delay) {
    this.delay = delay
    return this
  }

  start() {
    if (!this.fn || typeOf(this.fn) !== 'function') {
      throw new Error('未设置定时调用的函数或设置的不是函数类型')
    }
    if (!this.delay) {
      throw new Error('未设置间隔时间')
    }
    if (this.immediate) this.fn(...this.args)
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.fn(...this.args)
    }, this.delay)
  }

  stop() {
    clearInterval(this.timer)
    this.timer = null
  }
}
