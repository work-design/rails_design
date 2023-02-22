import './weixin_script'
const wxwork_fetch = function({ url = location.href, success, ...args } = {}) {
  weixin_fetch({
    url: url,
    success: () => {
      fetch('/wechat/agent_js', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: url})
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
              success(res, ...args)
            }
          },
          fail: res => {
            new Error('wx.agentConfig fail ' + JSON.stringify(res))
          }
        })
      })
    }
  })
}
window.wxwork_fetch = wxwork_fetch
