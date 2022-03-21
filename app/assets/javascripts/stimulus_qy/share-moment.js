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
    wx.invoke('shareToExternalMoments', {
      text: {
        content: this.textValue
      },
      attachments: this.images
    })
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
