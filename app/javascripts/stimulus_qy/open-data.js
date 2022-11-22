import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    if (WWOpenData.checkSession) {
      WWOpenData.checkSession({
        success() {
          WWOpenData.bindAll(this.element.children)
          console.debug('有登录态')
          alert('open data success')
        },
        fail() {
          alert('登录态过期')
        }
      })
    } else {
      alert('WWOpenData fail')
    }
  }

}
