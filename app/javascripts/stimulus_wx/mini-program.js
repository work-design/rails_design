import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String, // url must begin with /pages
    data: Object,
    direct: Boolean,
    launch: Boolean,
    nav: Boolean,
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
    if (this.launchValue) {
      wx.miniProgram.reLaunch({ url: url })
    } else if (this.navValue) {
      wx.miniProgram.navigateTo({ url: url })
    } else {
      wx.miniProgram.redirectTo({ url: url })
    }
  }

}
