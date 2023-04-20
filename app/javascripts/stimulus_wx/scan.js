import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    debug: Boolean,
    params: Object,
    form: String
  }

  report(event) {
    const ele = event.currentTarget
    let body
    if (this.hasFormValue) {
      body = new FormData(document.getElementById(this.formValue))
    } else {
      body = new FormData()
    }
    if (this.hasParamsValue) {
      Object.keys(this.paramsValue).forEach(k => {
        body.append(k, this.paramsValue[k])
      })
    }
    wx.ready(() => {
      wx.scanQRCode({
        needResult: 1,
        success: (res) => {
          body.append('result', res.resultStr)
          this.post(ele.dataset.reportUrl, body)
        }
      })
    })
  }

  invoke() {
    wx.ready(() => {
      wx.scanQRCode({
        complete: (res) => {
          if (this.hasDebugValue && this.debugValue) {
            alert(JSON.stringify(res))
          }
        }
      })
    })
  }

}
