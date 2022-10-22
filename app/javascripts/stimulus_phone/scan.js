import ConfigController from './config'

export default class extends ConfigController {
  static values = {
    debug: Boolean,
    params: Object
  }

  connect() {
    super.connect()
  }

  report(event) {
    const ele = event.currentTarget
    const controller = this
    const body = new FormData()
    if (this.hasParamsValue) {
      Object.keys(this.paramsValue).forEach(k => {
        body.append(k, this.paramsValue[k])
      })
    }
    wx.ready(() => {
      wx.scanQRCode({
        needResult: 1,
        success(res) {
          body.append('result', res.resultStr)
          controller.request(ele.dataset.reportUrl, 'POST', body)
        }
      })
    })
  }

  invoke() {
    wx.ready(() => {
      wx.scanQRCode({
        success: (res) => {
          if (this.hasDebugValue && this.debugValue) {
            alert(JSON.stringify(res))
          }
        }
      })
    })
  }

}
