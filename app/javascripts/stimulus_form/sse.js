import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String,
    id: String
  }

  connect() {
    this.eventSource = new EventSource(this.urlValue)
    this.container = document.getElementById(`receive_${this.idValue}`)
    this.wrap = document.getElementById('chat_box')

    this.eventSource.addEventListener('message', this.handleMessageEvent.bind(this));
    this.eventSource.addEventListener('done', this.handleDoneEvent.bind(this));
  }

  handleMessageEvent(event) {
    const data = JSON.parse(event.data)
    this.container.append(data.text)
    this.wrap.scrollTop = this.wrap.scrollHeight
  }

  handleDoneEvent(event) {
    this.eventSource.close();
  }

}