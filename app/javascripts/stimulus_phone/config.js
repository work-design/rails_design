import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    options: Object,
    debug: Boolean,
    apis: { type: Array, default: [] }
  }

  initialize() {

  }

  connect() {
    this.script.addEventListener('load', (event) => {
      window.xxx = event
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
    })
  }

  get script() {
    return document.getElementById('weixin_script')
  }

}
