import { Controller } from '@hotwired/stimulus'
import VConsole from 'vconsole'

export default class extends Controller {

  connect() {
    this.vConsole = new VConsole()
    if (WWOpenData.on) {
      WWOpenData.on('error', this.getError)
      WWOpenData.on('update', this.getUpdate)
    }

    wxwork_fetch({ success: this.xx, element: this.element })
  }

  xx(res, ...args) {
    console.debug('res:', JSON.stringify(res))

    const openTag = document.createElement('ww-open-data')
    openTag.setAttribute('type', args.element.getAttribute('type'))
    openTag.setAttribute('openid', args.element.getAttribute('openid'))
    args.element.appendChild(openTag)

    if (WWOpenData.checkSession && false) {
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

  disconnect() {
    this.vConsole.destroy()
    if (WWOpenData.off) {
      WWOpenData.off('update', this.getUpdate)
      WWOpenData.off('error', this.getError)
    }
  }

  getUpdate(event) {
    console.debug(`update ${JSON.stringify(event)}`)
  }

  getError(event) {
    console.debug(`error ${JSON.stringify(event)}`)
  }

}
