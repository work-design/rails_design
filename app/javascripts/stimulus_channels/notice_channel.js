import BaseCable from './base_cable'

export default class extends BaseCable {

  connect() {
    this.subscription = BaseCable.consumer.subscriptions.create({channel: 'Notice::ReceiverChannel', room: 'room'}, {

      received(data) {
        Turbo.renderStreamMessage(data)

        document.getElementById('notice_show').classList.add('color-danger')
      },

      connected() {
        console.debug('connected:', this.identifier)
      },

      disconnected() {
        console.debug('disconnected:', this.identifier)
      }

    })
  }
}