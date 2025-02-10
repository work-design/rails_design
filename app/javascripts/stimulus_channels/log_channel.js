import BaseCable from './base_cable'

export default class extends BaseCable {

  connect() {
    this.subscription = BaseCable.consumer.subscriptions.create({ channel: 'Com::LogChannel', room: 'room' }, {
      received(data) {
        
      }
    })
  }

  disconnect() {
    this.subscription.unsubscribe()
  }

}
