import { Controller } from 'stimulus'

class WechatController extends Controller {

  connect() {
    console.debug('Wechat Controller works!')
  }

  close() {
    wx.closeWindow()
  }

}

application.register('wechat', WechatController)
