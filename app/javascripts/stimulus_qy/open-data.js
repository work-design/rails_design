import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    if (typeof(WWOpenData) === 'object' && WWOpenData.checkSession) {
      WWOpenData.checkSession({
        success: () => {
          const x = this.element.querySelector('ww-open-data')
          WWOpenData.bind(x)
          console.debug('有登录态')
          alert(`open data success ${x.getAttribute('openid')}`)
        },
        fail: () => {
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
