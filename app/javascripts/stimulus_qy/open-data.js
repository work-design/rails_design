import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    if (typeof(WWOpenData) === 'object') {
      if (WWOpenData.on) {
        WWOpenData.on('error', (event) => {
          alert(`error ${JSON.stringify(event)}`)
          wx.invoke('openUserProfile', {
            type: 1,
            userid: this.openid
          }, (res) => {
            alert(res)
          })
        })
      }
      if (WWOpenData.checkSession) {
        WWOpenData.checkSession({
          success: () => {
            const x = this.element.querySelector('ww-open-data')
            WWOpenData.bind(x)
            alert(`open data success ${x.getAttribute('openid')}`)
          },
          fail: () => {
            alert('登录态过期')
          }
        })
      }
    } else {
      alert('WWOpenData fail')
      wxwork_fetch()
    }
  }

  get openid() {
    const x = this.element.querySelector('ww-open-data')
    return x.getAttribute('openid')
  }

}
