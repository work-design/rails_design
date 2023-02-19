import { Controller } from '@hotwired/stimulus'
import VConsole from 'vconsole'

export default class extends Controller {

  connect() {
    const vConsole = new VConsole();
    if (typeof(WWOpenData) === 'object') {
      this.xx()
    } else {
      alert('WWOpenData fail')
    }
  }

  disconnect() {

  }

  xx() {
    alert(`wwopen ${JSON.stringify(WWOpenData)}`)
    if (WWOpenData.on) {
      WWOpenData.on('error', (event) => {
        alert(`error ${JSON.stringify(event)}`)
        wxwork_fetch()
      })
      WWOpenData.on('update', (event) => {
        alert(`update ${JSON.stringify(event)}`)
      })
    }
    if (WWOpenData.checkSession) {
      WWOpenData.checkSession({
        success: () => {
          const x = this.element.querySelectorAll('ww-open-data')
          WWOpenData.bindAll(x)
        },
        fail: () => {
          alert('登录态过期')
        }
      })
    }
  }

  get openid() {
    const x = this.element.querySelector('ww-open-data')
    return x.getAttribute('openid')
  }

}
