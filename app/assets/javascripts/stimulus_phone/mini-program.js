import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String
  }

  link(event) {
    wx.miniProgram.getEnv(res => {
      if (res.miniprogram) {
        event.preventDefault()
        wx.miniProgram.navigateTo({
          url: this.urlValue
        })
      }
    })
  }

}
