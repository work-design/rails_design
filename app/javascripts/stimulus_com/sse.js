import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    const botType = this.data.get("bot") || "ChatBot";
    const messagesJSON = JSON.stringify([]);

    this.eventSource = new EventSource(`/chat?bot=${botType}&messages=${encodeURIComponent(messagesJSON)}`);
    this.assistantMessage = ''

    this.eventSource.addEventListener('text', this.handleMessageEvent.bind(this))
    this.eventSource.addEventListener('done', this.handleDoneEvent.bind(this))
  }

  handleMessageEvent(event) {
    const data = JSON.parse(event.data)
    this.assistantMessage += data.text
    this.outputTarget.textContent = this.assistantMessage
  }

  handleDoneEvent() {
    this.eventSource.close()
  }

}
