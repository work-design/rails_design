import { Controller } from '@hotwired/stimulus'
import VConsole from 'vconsole'

export default class extends Controller {

  connect() {
    this.vConsole = new VConsole()
    this.xx()
  }

  async xx() {
    await wxwork_fetch()
    //console.debug('this:', JSON.stringify(this))
    if (WWOpenData.on) {
      WWOpenData.on('error', this.getError)
      WWOpenData.on('update', this.getUpdate)
    }
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

  config() {
    return new Promise((resolve, reject) => {
      wxwork_fetch()
      //wx.ready(resolve)
      //wx.error(reject)
    })
  }

  getUpdate(event) {
    console.debug(`update ${JSON.stringify(event)}`)
  }

  getError(event) {
    console.debug(`error ${JSON.stringify(event)}`)
  }

}
