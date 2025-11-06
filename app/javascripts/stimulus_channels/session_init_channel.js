import BaseCable from './base_cable'

// 专门用于微信扫码登录
export default class extends BaseCable {

  connect() {
    this.subscribe()
  }

  subscribe() {
    const urlParams = new URLSearchParams(location.search)

    this.subscription = BaseCable.consumer.subscriptions.create(
      {
        channel: 'Wechat::SessionInitChannel',
        state: urlParams.get('state')
      }
    )
  }

  disconnect() {
    this.subscription.unsubscribe()
  }
}