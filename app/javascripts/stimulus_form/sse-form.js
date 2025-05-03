import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
  }

  commit(event) {
    event.preventDefault()
    const container = document.getElementById('chat_box')

    fetch(this.element.action, {
      method: this.element.method.toUpperCase(),
      body: new FormData(this.element)
    }).then(async response => {
      const reader = response.body.getReader()
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        window.xxx = chunk
        console.log('Received:', chunk);
        //container.append(chunk.data.text)
      }
    })
  }


}
