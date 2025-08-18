import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    options: Object,
    params: Object,
    debug: { type: Boolean, default: false },
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
      if (typeof WeixinJSBridge === 'undefined') {
        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
      } else {
        this.onBridgeReady()
      }
    }
  }

  onBridgeReady() {
    wx.ready(() => {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        this.paramsValue,
        res => {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            alert('pay success')
          }
        })
    })
  }

}
