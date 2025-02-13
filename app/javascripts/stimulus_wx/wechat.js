import BaseController from '../base_controller'

export default class extends BaseController {
  static targets = ['preview', 'media']
  static values = {
    address: String,
    url: String
  }

  close() {
    wx.miniProgram.getEnv(res => {
      if (res.miniprogram) {
        wx.miniProgram.navigateTo({
          url: this.addressValue  // url must begin with /pages
        })
      } else {
        wx.closeWindow()
      }
    })
  }

  openAddress() {
    wx.openAddress({
      success: res => {
        this.post(this.urlValue, JSON.stringify(res))
      },
      fail: res => {
        weixin_fetch({ success: this.openAddress, controller: this })
      }
    })
  }

  programAddress() {
    wx.miniProgram.getEnv(res => {
      if (res.miniprogram) {
        wx.miniProgram.navigateTo({
          url: this.addressValue  // url must begin with /pages
        })
      }
    })
  }

  location() {
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
      fail: () => {
        weixin_fetch({ success: this.location, controller: this })
      }
    })
  }

  chooseImage() {
    wx.chooseImage({
      count: 1,
      success: res => {
        let localId = res.localIds[0]
        this.previewTarget.src = localId
        wx.uploadImage({
          localId: localId,
          success: res => {
            this.mediaTarget.value = res.serverId
            this.mediaTarget.form.requestSubmit()
          }
        })
      },
      fail: () => {
        weixin_fetch({ success: this.chooseImage, controller: this })
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
