import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['preview', 'media']
  static values = {
    address: String,
    url: String
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
    wx.openAddress({
      success: res => {
        this.post(this.urlValue, JSON.stringify(res), { 'Content-Type': 'application/json' })
      },
      fail: () => {
        weixin_fetch({ success: this.openAddress, controller: this })
      }
    })
  }

  programAddress() {
    wx.ready(() => {
      wx.miniProgram.getEnv(res => {
        if (res.miniprogram) {
          wx.miniProgram.navigateTo({
            url: this.addressValue  // url must begin with /pages
          })
        }
      })
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
      fail(res) {
        alert(JSON.stringify(res))
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
          success: (res) => {
            this.mediaTarget.value = res.serverId
            this.mediaTarget.form.requestSubmit()
          }
        })
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
