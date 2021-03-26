import { Controller } from 'stimulus'

class WechatController extends Controller {

  connect() {
    console.debug(this.identifier, 'connected!')
  }

  close() {
    wx.closeWindow()
  }

  openAddress() {
    wx.ready(() => {
      wx.openAddress({
        success: (res) => {
          document.getElementById('address_contact').value = res.userName
          document.getElementById('address_tel').value = res.telNumber
          document.getElementById('address_detail').value = res.detailInfo
          document.getElementById('address_post_code').value = res.postalCode
          document.getElementById('province_name').value = res.provinceName
          document.getElementById('city_name').value = res.cityName
          document.getElementById('country_name').value = res.countryName

          let dialog = document.getElementById('dialog')
          application.getControllerForElementAndIdentifier(dialog, 'weui-dialog').show()
        }
      })
    })
  }

}

application.register('wechat', WechatController)
