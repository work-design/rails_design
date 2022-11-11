import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String,
    data: Object,
    direct: Boolean,
    debug: Boolean
  }
  static classes = [ 'pt' ]

  connect() {
    const weixin_script = document.getElementById('weixin_script')
    if (typeof(wx) === 'undefined' && weixin_script) {
      weixin_script.addEventListener('load', (event) => {
        console.debug('weixin script load mini program', event)
        console.debug('miniprogram: ', window.__wxjs_environment)
        if (window.__wxjs_environment === 'miniprogram') {
          if (this.hasPtClass) {
            this.element.classList.add(this.ptClass)
          }
          if (this.directValue) {
            this.navTo()
          }
        }
      })
    } else {
      if (window.__wxjs_environment === 'miniprogram') {
        if (this.hasPtClass) {
          this.element.classList.add(this.ptClass)
        }
        if (this.directValue) {
          this.navTo()
        }
      }
    }
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
    if (this.debugValue) {
      alert(url)
    }
    wx.miniProgram.navigateTo({
      url: url  // url must begin with /pages
    })
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

}
