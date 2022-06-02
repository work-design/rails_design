import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String,
    data: Object
  }
  static classes = [ 'pt' ]

  connect() {
    if (window.__wxjs_environment === 'miniprogram') {
      if (this.hasPtClass) {
        this.element.classList.add(this.ptClass)
      }
    }
  }

  link(event) {
    wx.miniProgram.getEnv(res => {
      console.debug('mini program env:', res)
      if (res.miniprogram) {
        event.preventDefault()
        const query = new URLSearchParams(this.dataValue).toString()
        let url = this.urlValue
        if (query.length > 0) {
          url = this.urlValue.concat('?').concat(query)
        } 
        wx.miniProgram.navigateTo({
          url: url  // url must begin with /pages
        })
      }
    })
  }

}
