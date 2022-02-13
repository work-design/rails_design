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
    
    wx.agentConfig({
      corpid: options['corpid'],
      agentid: options['agentid'],
      timestamp: options['timestamp'],
      nonceStr: options['noncestr'],
      signature: options['signature'],
      jsApiList: this.apisValue,
      success: function(res) {
        alert('success')
        alert(JSON.stringify(res))
      },
      fail: function(res) {
        alert('fail')
        alert(JSON.stringify(res))
      }
    })
  }

}
