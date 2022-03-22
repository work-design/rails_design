import ConfigController from './config'

export default class extends ConfigController {
  static targets = ['preview', 'media']
  static values = {
    title: String,
    desc: String,
    link: String,
    image: String
  }

  connect() {
    super.connect()
    this.ready()
    this.showMenu()
  }

  ready() {
    wx.ready(() => {
      wx.updateTimelineShareData({
        title: this.titleValue,
        link: this.linkValue,
        imgUrl: this.imageValue,
        success: function(res) {
          console.debug('timeline', res)
        }
      })
      wx.updateAppMessageShareData({
        title: this.titleValue,
        desc: this.descValue,
        link: this.linkValue,
        imgUrl: this.imageValue,
        success: function() {
          console.debug('message', res)
        }
      })
    })
  }

  showMenu() {
    wx.ready(() => {
      wx.hideAllNonBaseMenuItem()
      wx.showMenuItems({
        menuList: [
          'menuItem:share:appMessage',
          'menuItem:share:timeline',
          'menuItem:profile'
        ]
      })
      wx.showOptionMenu()
    })
  }

}
