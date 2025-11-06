import BaseCable from './base_cable'

// 专门用于微信扫码登录
export default class extends BaseCable {

  connect() {
    this.subscribe()
  }

  subscribe() {
    this.subscription = BaseCable.consumer.subscriptions.create(
      {
        channel: 'Wechat::SessionLoginChannel',
      },
      {
        received(data) {
          const url = data.url || '/'
          Turbo.visit(url)
        }
     }
    )
  }

  disconnect() {
    this.subscription.unsubscribe()
  }
}