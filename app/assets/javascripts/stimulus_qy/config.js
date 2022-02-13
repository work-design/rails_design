import { Controller } from '@hotwired/stimulus'
import VConsole from 'vconsole'

export default class extends Controller {
  static values = {
    options: Object,
    debug: Boolean,
    apis: Array
  }

  connect() {
    if (this.debugValue) {
      new VConsole()
    }
    const options = this.optionsValue

    wx.config({
      beta: true,
      debug: this.debugValue,
      appId: options['corpid'],
      timestamp: options['timestamp'],
      nonceStr: options['noncestr'],
      signature: options['signature'],
      jsApiList: []
    })
    wx.ready(() => {
      wx.agentConfig({
        corpid: options['corpid'],
        agentid: options['agentid'],
        timestamp: options['timestamp'],
        nonceStr: options['noncestr'],
        signature: options['signature'],
        jsApiList: this.apisValue,
        success: function(res) {
          alert(res)
        },
        fail: function(res) {
          alert(res)
        }
      })
    })
  }

}
