import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    options: Object,
    debug: Boolean,
    apis: Array
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
  }

}
