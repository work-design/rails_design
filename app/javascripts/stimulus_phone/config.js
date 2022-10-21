import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    options: Object,
    debug: Boolean,
    apis: { type: Array, default: [] }
  }

  initialize() {
    this.script = document.createElement('script')
    this.script.setAttribute('src', 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js')
    this.script.setAttribute('referrerpolicy', 'origin')
  }

  connect() {
    const options = this.optionsValue

    wx.config({
      debug: this.debugValue,
      appId: options['appid'],
      timestamp: options['timestamp'],
      nonceStr: options['noncestr'],
      signature: options['signature'],
      jsApiList: this.apisValue,
      openTagList: ['wx-open-subscribe']
    })
    wx.ready(() => {
      console.debug('ready, ok')
    })
    wx.error(res => {
      if (this.debugValue) {
        alert('wx.config: ' + JSON.stringify(res) + '\n' + `location: ${location.href}`)
      } else {
        console.debug('wx.config:', res)
      }
    })
  }

  disconnect() {
    //this.script.remove()
    // window.wx = undefined  todo should implement better
  }

}
