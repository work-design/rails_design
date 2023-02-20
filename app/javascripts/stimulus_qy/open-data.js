import { Controller } from '@hotwired/stimulus'
import VConsole from 'vconsole'

export default class extends Controller {

  connect() {
    const vConsole = new VConsole();
    wxwork_fetch({ success: this.xx })
    wx.ready(() => {
      if (typeof(WWOpenData) === 'object') {
        //this.xx()
      } else {
        alert('WWOpenData fail')
      }
    })
  }

  disconnect() {

  }

  xx() {
    if (WWOpenData.on) {
      WWOpenData.on('error', (event) => {
        console.debug(`error ${JSON.stringify(event)}`)
      })
      WWOpenData.on('update', (event) => {
        console.debug(`update ${JSON.stringify(event)}`)
      })
    }
    this.xxx()
  }

  xxx() {
    if (WWOpenData.checkSession) {
      WWOpenData.checkSession({
        success: () => {
          const x = this.element.querySelectorAll('ww-open-data')
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
