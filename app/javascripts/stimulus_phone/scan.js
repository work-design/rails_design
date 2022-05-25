import ConfigController from './config'

export default class extends ConfigController {
  static values = {
    url: String,
    params: Object
  }

  connect() {
    super.connect()
  }

  report(event) {
    wx.scanQRCode({
      needResult: 1,
      success(res) {
        const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        alert(JSON.stringify(res))
        this.request(this.urlValue, 'POST', data)
      }
    })
  }

}
