import { Controller } from '@hotwired/stimulus'
const EVENT_LINE = 'event:'
const DATA_LINE = 'data:'
const ID_LINE = 'id:'
const RETRY_LINE = 'retry:'

export default class extends Controller {

  connect() {
    this.decoder = new TextDecoder()
  }

  commit(event) {
    event.preventDefault()
    const body = new FormData(this.element)
    const container = document.getElementById('chat_box')
    this.element.reset()
    document.getElementById('content').focus()

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
            container.append(JSON.parse(currentData).text || '')
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


}
