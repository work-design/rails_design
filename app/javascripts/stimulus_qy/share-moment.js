import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    text: String,
    images: Array
  }

  shareImage() {
    const debug = this.debugValue
    wx.invoke(
      'shareToExternalMoments',
      {
        text: {
          content: this.textValue
        },
        attachments: this.images
      },
      function(res) {
        if (debug) {
          alert(JSON.stringify(res))
        }
      }
    )
  }

  get images() {
    return this.imagesValue.map(i => {
      return {
        msgtype: 'image',
        image: {
          imgUrl: i
        }
      }
    })
  }
}
