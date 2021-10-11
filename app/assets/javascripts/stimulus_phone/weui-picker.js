import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    id: String,
    url: String
  }

  // focus->weui-picker#getData
  getData(event) {
    document.activeElement.blur()  // disable input

    fetch(this.urlValue, {
      method: 'GET',
      headers: {
        Accept: 'text/vnd.turbo-stream.html'
      }
    }).then(response => {
      return response.text()
    }).then(body => {
      Turbo.renderStreamMessage(body)
    })
  }

  getNext(event) {
    const ele = event.currentTarget

    fetch(this.urlValue, {
      method: 'POST',
      headers: {
        Accept: 'text/vnd.turbo-stream.html',
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.csrfToken()
      },
      body: JSON.stringify({
        id: ele.dataset.id
      })
    }).then(response => {
      return response.text()
    }).then(body => {
      if (body.length > 0) {
        ele.parentNode.parentNode.insertAdjacentHTML('afterend', body)
      }
    })
  }

}
