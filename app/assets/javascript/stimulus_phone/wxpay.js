import { Controller } from 'stimulus'

class WxpayController extends Controller {

  connect() {
    console.debug('Wxpay Controller works!')
    this.chooseWXPay()
  }

  chooseWXPay() {
    wx.ready(() => {
      wx.chooseWXPay({
        timestamp: this.timestamp,
        nonceStr: this.nonceStr,
        package: this.package,
        signType: this.signType,
        paySign: this.paySign,
        success: (res) => {
          console.log(res)
          this.element.style.removeProperty('display')
          //Turbo.visit(location.href, { action: 'replace' })
        },
        error: (e) => {
          alert(e)
        }
      })
    })
  }

  get timestamp() {
    return this.data.get('timestamp')
  }

  get nonceStr() {
    return this.data.get('nonceStr')
  }

  get package() {
    return this.data.get('package')
  }

  get signType() {
    return this.data.get('signType')
  }

  get paySign() {
    return this.data.get('paySign')
  }

}

application.register('wxpay', WxpayController)
