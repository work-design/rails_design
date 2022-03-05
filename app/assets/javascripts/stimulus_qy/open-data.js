import { Controller } from '@hotwired/stimulus'
import VConsole from 'vconsole'

export default class extends Controller {
  static values = {
    options: Object,
    debug: Boolean,
    apis: Array
  }

  initialize() {
    this.script = document.createElement('script')
    this.script.setAttribute('src', 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js')
    this.script.setAttribute('referrerpolicy', 'origin')

    this.work_script = document.createElement('script')
    this.work_script.setAttribute('src', 'https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js')
    this.work_script.setAttribute('referrerpolicy', 'origin')
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
      success: function(res) {
        if (WWOpenData.checkSession) {
          WWOpenData.checkSession({
            success() {
              console.log('有登录态')
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
    this.script.remove()
    this.work_script.remove()
  }

}
