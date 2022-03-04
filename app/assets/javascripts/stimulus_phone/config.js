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
    wx.error(res => {
      alert(JSON.stringify(res))
    })
  }

  get script() {
    const script = document.createElement('script')
    script.setAttribute('src', 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js')
    script.setAttribute('referrerpolicy', 'origin')
    document.head.appendChild(script)
    return script
  }

  disconnect() {
    document.head.removeChild(this.script)
  }

}
