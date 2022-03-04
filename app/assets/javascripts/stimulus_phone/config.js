import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    options: Object,
    debug: Boolean,
    apis: Array
  }

  initialize() {
    this.script = document.createElement('script')
    this.script.setAttribute('src', 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js')
    this.script.setAttribute('referrerpolicy', 'origin')
  }

  connect() {
    const options = this.optionsValue
    const apis = this.apisValue
    const debug = this.debugValue
    document.head.appendChild(this.script)

    this.script.addEventListener('load', event => {
      wx.config({
        debug: debug,
        appId: options['appid'],
        timestamp: options['timestamp'],
        nonceStr: options['noncestr'],
        signature: options['signature'],
        jsApiList: apis,
        openTagList: ['wx-open-subscribe']
      })
      wx.error(res => {
        alert(JSON.stringify(res))
      })
    })
  }

  disconnect() {
    this.script.remove()
  }

}
