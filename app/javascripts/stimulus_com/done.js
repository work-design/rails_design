import { Controller } from '@hotwired/stimulus'
import consumer from '../channels/cable'

export default class extends Controller {
  static values = {
    content: String
  }

  connect() {
    this.subscription = consumer.subscriptions.create({channel: 'Datum::DoneChannel'}, {
      received(data) {
        Turbo.renderStreamMessage(data)
      },

      connected() {
        console.log('connected:', this.identifier)
      },

      disconnected() {
        console.debug('disconnected:', this.identifier)
      }
    })
  }

  disconnect() {
    this.subscription.unsubscribe()
  }

}
