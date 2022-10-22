const weixin_script = document.getElementById('weixin_script')

if (weixin_script) {
  weixin_script.addEventListener('load', (event) => {
    console.debug('weixin script load trigger', event)
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
