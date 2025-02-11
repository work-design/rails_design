import BaseCable from './base_cable'

export default class extends BaseCable {

  connect() {
    const element = this.element
    this.subscription = BaseCable.consumer.subscriptions.create({ channel: 'Com::LogChannel', room: 'room' }, {
      received(data) {
        const p = document.createElement('p')
        p.innerText = data
        element.appendChild(p)
        p.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    })
  }

  disconnect() {
    this.subscription.unsubscribe()
  }

}
