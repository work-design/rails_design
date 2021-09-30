import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['preview', 'media']
  static values = {
    address: String,
    url: String
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
              const url = document.getElementById('wechat_address').controller('wechat').urlValue
              fetch(url, {
                method: 'POST',
                headers: {
                  Accept: 'text/vnd.turbo-stream.html',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(res)
              }).then(response => {
                return response.text()
              }).then(body => {
                Turbo.renderStreamMessage(body)
              })
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
