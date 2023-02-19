const wxwork_fetch = function({ url = location.href, success } = {}) {
  fetch('/wechat/agent_js', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
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
      success: res => {
        if (body['debug']) {
          alert('wx.agentConfig success' + JSON.stringify(res))
        }
        if (success) {
          success(res)
        }
      },
      fail: res => {
        alert('wx.agentConfig fail ' + JSON.stringify(res))
      }
    })
    wx.ready(() => {
      if (body['debug']) {
        alert('wx.agentConfig ok' + JSON.stringify(WWOpenData))
      } else {
        console.debug('ready, ok')
      }
    })
    wx.error(res => {
      if (body['debug']) {
        alert('wx.agentConfig error' + JSON.stringify(res) + '\n' + `location: ${location.href}`)
      } else {
        console.debug('wx.agentConfig:', res)
      }
    })
  })
}
window.wxwork_fetch = wxwork_fetch
const wxwork_script = document.getElementById('wxwork_script')
if (wxwork_script) {
  wxwork_script.addEventListener('load', (event) => {
    alert('wxwork script load trigger', event)
    wxwork_fetch()
  })
}
