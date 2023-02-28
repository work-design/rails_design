import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    options: Object,
    params: Object,
    debug: { type: Boolean, default: false }
    auto: { type: Boolean, default: false }
  }
  static targets = ['load']

  connect() {
    const options = this.optionsValue
    wx.config({
      debug: this.debugValue,
      appId: options['appid'],
      timestamp: options['timestamp'],
      nonceStr: options['noncestr'],
      signature: options['signature'],
      jsApiList: ['chooseWXPay'],
      openTagList: ['wx-open-subscribe']
    })

    if (this.autoValue) {
      this.chooseWXPay()
    }
  }

  chooseWXPay() {
    wx.ready(() => {
      wx.chooseWXPay({
        ...this.paramsValue,
        success: res => {
          console.debug('chooseWXPay success', res)
          if (this.hasLoadTarget) {
            this.loadTarget.style.removeProperty('display')
          }
        },
        error: e => {
          alert(JSON.stringify(e))
        }
      })
    })
  }

}
