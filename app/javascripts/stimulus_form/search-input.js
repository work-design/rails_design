import BaseController from '../base_controller'

export default class extends BaseController {
  static targets = ['input', 'content']
  static values = {
    url: String,
    method: { type: String, default: 'POST' }
  }

  connect() {
    this.initInput()
  }

  initInput() {
    const ele = this.inputTarget
    ele.addEventListener('input', this.form)
    ele.addEventListener('compositionstart', event => {
      event.target.removeEventListener('input', this.form)
    })
    ele.addEventListener('compositionend', event => {
      event.target.addEventListener('input', this.form)
      this.conForm(ele)
    })
  }

  // NOTICE  here this becomes ele, who call addEventListener
  form() {
    const con = this.closest('[data-controller~=search-input]').getController('search-input')

    if (con.hasUrlValue) {
      con.doRequest(this)
    } else {
      this.form.requestSubmit()
    }
  }

  conForm(ele) {
    if (this.hasUrlValue) {
      this.doRequest(ele)
    } else {
      ele.form.requestSubmit()
    }
  }

}