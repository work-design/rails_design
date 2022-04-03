import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String
  }
  static classes = [ 'pt' ]

  connect() {
    if (window.__wxjs_environment === 'miniprogram') {
      this.element.classList.add(this.ptClass)
    }
  }

  link(event) {
    wx.miniProgram.getEnv(res => {
      if (res.miniprogram) {
        event.preventDefault()
        wx.miniProgram.navigateTo({
          url: this.urlValue  // url must begin with /pages
        })
      }
    })
  }

}
