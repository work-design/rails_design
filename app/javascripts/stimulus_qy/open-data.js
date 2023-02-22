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

  xx(res, args) {
    console.debug('res:', res)
    console.debug('res:', args)
    args.element.insertAdjacentHTML(
      'beforeend',
      `<ww-open-data type="${args.element.getAttribute('type')}" openid="${args.element.getAttribute('openid')}"></ww-open-data>`
    )
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
