import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    if (typeof(WWOpenData) === 'object' && WWOpenData.checkSession) {
      WWOpenData.checkSession({
        success() {
          WWOpenData.bind(this.element.querySelector('ww-open-data'))
          console.debug('有登录态')
          alert('open data success')
        },
        fail() {
          alert('登录态过期')
        }
      })
      alert('connected')
    } else {
      alert('WWOpenData fail')
      wxwork_fetch()
    }
  }

}
