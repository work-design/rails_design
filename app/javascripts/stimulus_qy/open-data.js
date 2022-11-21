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
      this.vconsole = new VConsole()
    }
    const options = this.optionsValue
    wx.agentConfig({
      corpid: options['corpid'],
      agentid: options['agentid'],
      timestamp: options['timestamp'],
      nonceStr: options['noncestr'],
      signature: options['signature'],
      jsApiList: this.apisValue,
      success: res => {
        if (WWOpenData.checkSession) {
          WWOpenData.checkSession({
            success() {
              console.debug('有登录态')
            },
            fail() {
              alert('登录态过期')
            }
          })
        }
        WWOpenData.bind(document.querySelector('ww-open-data'))
      },
      fail: function(res) {
        alert('fail')
        alert(JSON.stringify(res))
      }
    })
  }

  disconnect() {
    if (this.debugValue) {
      this.vconsole.destroy()
    }
  }

}
