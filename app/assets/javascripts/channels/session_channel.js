import consumer from './cable'

consumer.subscriptions.create({channel: 'Com::SessionChannel', room: 'room'}, {

  received(data) {
    const url = data.url || '/'
    if (data.auth_token) {
      document.addEventListener('turbo:before-fetch-request', event => {
        const xhr = event.detail.fetchOptions
        xhr.headers['Authorization'] = data.auth_token
      })
    }
    Turbo.visit(url)
  },

  connected() {
    console.debug('connected:', this.identifier)
  },

  disconnected() {
    console.debug('disconnected:', this.identifier)
  }

})
