import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  initialize() {
    this.script.addEventListener('load', () => {
      fetch('/wechat/js', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: location.href
        })
      }).then(response => {
        return response.json()
      }).then(body => {
        wx.config({
          debug: body['debug'],
          appId: body['appid'],
          timestamp: body['timestamp'],
          nonceStr: body['noncestr'],
          signature: body['signature'],
          jsApiList: body['apis'],
          openTagList: ['wx-open-subscribe']
        })
        wx.ready(() => {
          console.debug('ready, ok')
        })
        wx.error(res => {
          if (body['debug']) {
            alert('wx.config: ' + JSON.stringify(res) + '\n' + `location: ${location.href}`)
          } else {
            console.debug('wx.config:', res)
          }
        })
      })
    })
  }

  get script() {
    return document.getElementById('weixin_script')
  }

}
