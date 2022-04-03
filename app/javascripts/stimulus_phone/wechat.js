import ConfigController from './config'

export default class extends ConfigController {
  static targets = ['preview', 'media']
  static values = {
    address: String,
    url: String
  }

  connect() {
    super.connect()
  }

  close() {
    wx.ready(() => {
      wx.miniProgram.getEnv(res => {
        if (res.miniprogram) {
          wx.miniProgram.navigateTo({
            url: this.addressValue  // url must begin with /pages
          })
        } else {
          wx.closeWindow()
        }
      })
    })
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
              const controller = document.getElementById('wechat_address').controller('wechat')
              fetch(controller.urlValue, {
                method: 'POST',
                headers: {
                  Accept: 'text/vnd.turbo-stream.html',
                  'Content-Type': 'application/json',
                  'X-CSRF-Token': controller.csrfToken()
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
        fail(res) {
          alert(JSON.stringify(res))
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
        const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
      }
    })
  }

  showMenu() {
    wx.ready(() => {
      wx.showMenuItems({
        menuList: ['menuItem:copyUrl']
      })
      wx.showOptionMenu()
    })
  }

}
