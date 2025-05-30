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
        channel: 'Wechat::SessionChannel',
        state: urlParams.get('state')
      },
      {
        received(data) {
          if (data.data_url) {
            document.getElementById('login_qrcode').src = data.data_url
            document.getElementById('login_count_down').getController('count-down').resetCounter('', data.remaining)
          } else {
            const url = data.url || '/'
            Turbo.visit(url)
          }
        },

        connected() {
          console.debug('connected:', this.identifier)
        },

        disconnected() {
          console.debug('disconnected:', this.identifier)
        }
     }
    )
  }

  disconnect() {
    this.subscription.unsubscribe()
  }
}