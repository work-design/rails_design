import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    if (WWOpenData.checkSession) {
      WWOpenData.checkSession({
        success() {
          WWOpenData.bind(this.element)
          console.debug('有登录态')
        },
        fail() {
          alert('登录态过期')
        }
      })
    }
  }

}
