const wxwork_script = document.getElementById('wxwork_script')
const wxwork_fetch = function(body = { url: location.href }) {
  fetch('/wechat/agent_js', {
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
      success: res => {
        if (body['debug']) {
          alert('wx.agentConfig success' + JSON.stringify(res))
        }
      },
      fail: res => {
        alert('wx.agentConfig fail ' + JSON.stringify(res))
      },
      complete: res => {
        if (body['debug']) {
          alert('wx.agentConfig complete' + JSON.stringify(res))
        }
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
if (wxwork_script) {
  wxwork_script.addEventListener('load', (event) => {
    console.debug('wxwork script load trigger', event)
    wxwork_fetch()
  })
}
