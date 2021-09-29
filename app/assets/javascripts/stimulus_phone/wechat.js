import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['preview', 'media']
  static values = {
    address: String
  }

  close() {
    wx.closeWindow()
  }

  openAddress() {
    wx.ready(() => {
      wx.miniProgram.getEnv(res => {
        if (res.miniprogram) {
          wx.miniProgram.navigateTo({
            url: this.addressValue  // url must begin with /pages
          })
        } else {
          wx.openAddress({
            success(res) {
              document.getElementById('address_contact').value = res.userName
              document.getElementById('address_tel').value = res.telNumber
              document.getElementById('address_detail').value = res.detailInfo
              document.getElementById('address_post_code').value = res.postalCode
              document.getElementById('province_name').value = res.provinceName
              document.getElementById('city_name').value = res.cityName
              document.getElementById('country_name').value = res.countryName

              document.getElementById('dialog').controller('weui-dialog').show()
            }
          })
        }
      })
    })
  }

  location() {
    wx.ready(() => {
      wx.getLocation({
        type: 'gcj02',
        success(res) {
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

  chooseImage() {
    wx.ready(() => {
      wx.chooseImage({
        count: 1,
        success(res) {
          let localId = res.localIds[0]
          this.previewTarget.src = localId
          wx.uploadImage({
            localId: localId,
            success: (res) => {
              this.mediaTarget.value = res.serverId
              this.submit(this.mediaTarget.form)
            }
          })
        }
      })
    })
  }

  scan() {
    wx.scanQRCode({
      success(res) {
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
      }
    })
  }

}
