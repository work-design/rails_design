import { Controller } from '@hotwired/stimulus'
import VConsole from 'vconsole'

export default class extends Controller {

  connect() {
    this.vConsole = new VConsole()

    wxwork_fetch({ success: this.xx })
  }

  disconnect() {
    this.vConsole.destroy()
  }

  xx(res) {
    console.debug('xx res:', JSON.stringify(res))
    if (WWOpenData.on) {
      WWOpenData.on('error', (event) => {
        console.debug(`error ${JSON.stringify(event)}`)
      })
      WWOpenData.on('update', (event) => {
        console.debug(`update ${JSON.stringify(event)}`)
      })
    }
    if (WWOpenData.checkSession) {
      WWOpenData.checkSession({
        success: () => {
          const x = document.querySelectorAll('ww-open-data')
          console.debug('ww-open-data count', x.length)
          WWOpenData.bindAll(x)
        },
        fail: () => {
          alert('登录态过期')
        }
      })
    }
  }

}
