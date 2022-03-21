import AgentConfigController from './agent-config'

export default class extends AgentConfigController {
  static values = {
    text: String,
    images: Array
  }

  connect() {
    super.connect()
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
