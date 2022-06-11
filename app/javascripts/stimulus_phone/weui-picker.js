import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    id: String,
    url: String
  }

  // focus->weui-picker#getData
  getData(event) {
    document.activeElement.blur()  // disable input
    console.log(event)
    this.get(this.urlValue)
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
      const node = ele.parentNode.parentNode
      this.clear(node)
      if (body.length > 0) {
        node.insertAdjacentHTML('afterend', body)
      }
    })
  }

  setValue(event) {
    document.getElementById('address_area_id').value = event.currentTarget.dataset.id
  }

  clear(node) {
    let el = node.nextElementSibling
    while (el) {
      el.remove()
      el = node.nextElementSibling
    }
  }

}
