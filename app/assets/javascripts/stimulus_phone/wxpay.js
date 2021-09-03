import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    params: Object
  }
  static targets = ['load']

  connect() {
    console.debug('connected:', this.identifier)
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
