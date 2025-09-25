import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    data: Object
  }

  connect() {
    if (window.__wxjs_environment === 'miniprogram') {
      wx.miniProgram.postMessage({
        data: this.dataValue
      })
    }
  }

}