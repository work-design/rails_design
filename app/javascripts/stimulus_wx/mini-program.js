import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String,
    data: Object,
    direct: Boolean,
    launch: Boolean,
    debug: Boolean
  }
  static classes = ['pt']

  connect() {
    if (window.__wxjs_environment === 'miniprogram') {
      if (this.hasPtClass) {
        this.element.classList.add(this.ptClass)
      }
      if (this.directValue) {
        this.navTo()
      }
    }
  }

  link(event) {
    wx.miniProgram.getEnv(res => {
      console.debug('mini program env:', res)
      if (res.miniprogram) {
        event.preventDefault()
        this.navTo()
      }
    })
  }

  navTo() {
    const query = new URLSearchParams(this.dataValue).toString()
    let url = this.urlValue
    if (query.length > 0) {
      if (this.urlValue.includes('?')) {
        url = this.urlValue.concat('&').concat(query)
      } else {
        url = this.urlValue.concat('?').concat(query)
      }
    }
    console.debug('mini program nav url:', url)
    if (this.lanuchValue) {
      wx.miniProgram.reLanuch({
        url: url
      })
    } else {
      wx.miniProgram.redirectTo({
        url: url  // url must begin with /pages
      })
    }
  }

}
