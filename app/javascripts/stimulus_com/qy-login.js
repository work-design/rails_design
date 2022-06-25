import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    options: Object
  }

  connect() {
    const r = {
      lang: 'zh',
      id: 'wx_reg',
      ...this.optionsValue
    }
    console.debug('options is', r)
    this.wwLogin = new WwLogin(r)
  }

  disconnect() {
    this.wwLogin.destroyed()
  }

}
