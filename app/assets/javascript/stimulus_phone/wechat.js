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

  location() {
    wx.ready(() => {
      wx.getLocation({
        type: 'gcj02',
        success: function(res) {
          wx.openLocation({
            latitude: res.latitude,
            longitude: res.longitude,
            name: '点击右侧打开导航软件',
            address: '点击测试',
            scale: 15
          })
        },
        fail: function(res) {
          alert(res)
        }
      })
    })
  }

  scan() {
    wx.scanQRCode({
      success: function (res) {
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
      }
    })
  }

}

application.register('wechat', WechatController)
