import { Controller } from 'stimulus'

class WxpayController extends Controller {
  static values = { params: Object }

  connect() {
    console.debug('Wxpay Controller works!')
    this.chooseWXPay()
  }

  chooseWXPay() {
    wx.ready(() => {
      wx.chooseWXPay({
        ...this.paramsValue,
        success: (res) => {
          console.log(res)
          this.element.style.removeProperty('display')
        },
        error: (e) => {
          alert(e)
        }
      })
    })
  }

}

application.register('wxpay', WxpayController)
