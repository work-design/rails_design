import ConfigController from './config'

export default class extends ConfigController {
  static values = {
    params: Object
  }
  static targets = ['load']

  connect() {
    this.chooseWXPay()
  }

  chooseWXPay() {
    wx.ready(() => {
      wx.chooseWXPay({
        ...this.paramsValue,
        success: (res) => {
          console.log(res)
          this.loadTarget.style.removeProperty('display')
        },
        error: (e) => {
          alert(e)
        }
      })
    })
  }

}
