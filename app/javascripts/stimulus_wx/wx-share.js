import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['preview', 'media']
  static values = {
    title: String,
    desc: String,
    link: String,
    image: String
  }

  ready() {
    this.updateTimeline()
    this.updateShare()
  }

  updateTimeline() {
    wx.updateTimelineShareData({
      title: this.titleValue,
      link: this.linkValue,
      imgUrl: this.imageValue,
      fail: () => {
        weixin_fetch({ success: this.updateTimeline, controller: this })
      }
    })
  }

  updateShare() {
    wx.updateAppMessageShareData({
      title: this.titleValue,
      desc: this.descValue,
      link: this.linkValue,
      imgUrl: this.imageValue,
      fail: () => {
        weixin_fetch({ success: this.updateShare, controller: this })
      }
    })
  }

  // 实际测试不能正常工作，文档未说明
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
