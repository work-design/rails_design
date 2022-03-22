import ConfigController from './config'

export default class extends ConfigController {
  static targets = ['preview', 'media']
  static values = {
    title: String,
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
          alert(res)
        }
      })
    })
  }

  showMenu() {
    wx.ready(() => {
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
