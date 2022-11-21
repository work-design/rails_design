const wxwork_script = document.getElementById('wxwork_script')
const wxwork_fetch = function(body = { url: location.href }) {
  console.debug('=====', body)
  fetch('/wechat/js', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => {
    return response.json()
  }).then(body => {
    wx.agentConfig({
      corpid: body['corpid'],
      agentid: body['agentid'],
      timestamp: body['timestamp'],
      nonceStr: body['noncestr'],
      signature: body['signature'],
      jsApiList: body['apis'],
      success: (res) => {
        if (WWOpenData.checkSession) {
          WWOpenData.checkSession({
            success() {
              console.debug('有登录态')
            },
            fail() {
              alert('登录态过期')
            }
          })
        }
        if (body['debug']) {
          alert(JSON.stringify(res))
        }
        WWOpenData.bind(document.querySelector('ww-open-data'))
      },
      fail: (res) => {
        alert('fail')
        alert(JSON.stringify(res))
      }
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
}
window.wxwork_fetch = wxwork_fetch
if (wxwork_script) {
  wxwork_script.addEventListener('load', (event) => {
    console.debug('wxwork script load trigger', event)
    wxwork_fetch()
  })
}
