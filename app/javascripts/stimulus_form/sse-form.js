import { Controller } from '@hotwired/stimulus'
const EVENT_LINE = 'event:'
const DATA_LINE = 'data:'
const ID_LINE = 'id:'
const RETRY_LINE = 'retry:'

export default class extends Controller {
  static outlets = [ 'sse-receive', 'sse-send' ]

  connect() {
    this.decoder = new TextDecoder()
    this.container = document.getElementById('chat_box')
  }

  commit(event) {
    event.preventDefault()
    const body = new FormData(this.element)
    this.element.reset()
    document.getElementById('content').focus()
    this.xx()

    fetch(this.element.action, {
      method: this.element.method.toUpperCase(),
      body: body
    }).then(async response => {
      const reader = response.body.getReader()
      let currentBuffer = ''
      let currentData = ''

      while (true) {
        const { done, value } = await reader.read();
        if (done) break

        if (typeof value !== 'string') {
          currentBuffer += this.decoder.decode(value)
        } else {
          currentBuffer += value
        }
        if (!currentBuffer.includes('\n')) continue
        const lines = currentBuffer.split('\n')
        // Get remaining data and put it into the buffer
        currentBuffer = lines.pop()

        for (const line of lines) {
          if (!line) {
            console.debug(currentData)
            this.container.append(JSON.parse(currentData).text || '')
            currentData = ''
          }
          if (line.startsWith(DATA_LINE)) {
            const data = line.slice(DATA_LINE.length).trimStart()
            if (currentData) currentData += '\n'
            currentData += data
          }
        }
      }
    })
  }

  xx() {
    const clonedItem = this.sseSendOutletElement.cloneNode(true)
    this.container.appendChild(clonedItem)
    clonedItem.getController('sse-send').contentTarget.innerText = 'ddd'
  }


}
