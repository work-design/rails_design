import BaseCable from './base_cable'

export default class extends BaseCable {

  connect() {
    this.subscription = BaseCable.consumer.subscriptions.create(
      {
        channel: 'Com::SessionChannel',
        room: 'room'
      },
      {
        received(data) {
          const url = data.url || '/'
          Turbo.visit(url)
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