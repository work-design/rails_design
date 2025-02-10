import BaseCable from './base_cable'

export default class extends BaseCable {
  static values = {
    content: String
  }

  connect() {
    this.subscription = BaseCable.consumer.subscriptions.create({ channel: 'Datum::DoneChannel' }, {
      received(data) {
        Turbo.renderStreamMessage(data)
      }
    })
  }

  disconnect() {
    this.subscription.unsubscribe()
  }

}
