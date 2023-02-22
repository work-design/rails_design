const weixin_fetch = function({ url = location.href, success } = {}) {
  fetch('/wechat/js', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
  }).then(response => {
    return response.json()
  }).then(body => {
    let config = {
      debug: body['debug'],
      appId: body['appid'],
      timestamp: body['timestamp'],
      nonceStr: body['noncestr'],
      signature: body['signature'],
      jsApiList: body['apis'],
      openTagList: ['wx-open-subscribe']
    }
    if (body['beta']) {
      Object.assign(config, { beta: true })
    }
    if (body['debug']) {
      alert('body is:' + JSON.stringify(config))
    }
    wx.config(config)
    wx.ready(() => {
      if (body['debug']) {
        alert('wx.config ready')
      } else {
        console.debug('ready, ok')
      }
      if (success) {
        success()
      }
    })
    wx.error(res => {
      if (body['debug']) {
        alert('wx.config: ' + JSON.stringify(res) + '\n' + `location: ${location.href}`)
      } else {
        console.debug('wx.config:', res)
      }
    })
  })
}
window.weixin_fetch = weixin_fetch

const weixin_script = document.getElementById('weixin_script')
const wxwork_script = document.getElementById('wxwork_script')

if (weixin_script && wxwork_script) {
  wxwork_script.addEventListener('load', event => {
    wxwork_fetch()
  })
} else if (weixin_script) {
  weixin_script.addEventListener('load', event => {
    weixin_fetch()
  })
}
