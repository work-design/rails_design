import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    options: Object,
    debug: Boolean,
    apis: Array
  }

  connect() {
    const options = this.optionsValue
    wx.agentConfig({
      corpid: options['corpid'],
      agentid: options['agentid'],
      timestamp: options['timestamp'],
      nonceStr: options['noncestr'],
      signature: options['signature'],
      jsApiList: this.apisValue,
      success: function(res) {
        console.debug('res', res)
      }
    })
  }

}
