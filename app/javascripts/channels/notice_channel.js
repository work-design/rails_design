import consumer from './cable'

consumer.subscriptions.create({ channel: 'Notice::ReceiverChannel', room: 'room' }, {

  received(data) {
    Turbo.renderStreamMessage(data)

    document.getElementById('notice_show').classList.add('has-text-danger')
  },

  connected() {
    console.debug('connected:', this.identifier)
  },

  disconnected() {
    console.debug('disconnected:', this.identifier)
  }

})
