import consumer from './cable'

consumer.subscriptions.create({ channel: 'Notice::ReceiverChannel', room: 'room' }, {

  received(data) {
    //this.collection().css('color', '#ff7f24')
    //this.collection().html(data.body)
    document.getElementById('notify_show').classList.add('has-text-danger')
    document.getElementById('notice_count').innerText = data.count
  },

  connected() {
    console.debug('connected:', this.identifier)
  },

  disconnected() {
    console.debug('disconnected:', this.identifier)
  }

})
