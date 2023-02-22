import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['tag']
  static values = {
    url: String
  }

  connect() {
    if (WWOpenData.on) {
      WWOpenData.on('error', this.getError)
      WWOpenData.on('update', this.getUpdate)
    }

    if (location.href === this.urlValue) {
      this.xx({ controller: this })
    } else {
      wxwork_fetch({ success: this.xx, controller: this })
    }
  }

  xx(args) {
    args.controller.tagTargets.forEach((tag) => {
      tag.insertAdjacentHTML(
        'beforeend',
        `<ww-open-data type="${tag.getAttribute('type')}" openid="${tag.getAttribute('openid')}"></ww-open-data>`
      )
    })
  }

  disconnect() {
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
