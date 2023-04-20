import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    id: String,
    url: String
  }
  static targets = ['select']

  // focus->weui-picker#getData
  getData(event) {
    document.activeElement.blur()  // disable input
    console.log(event)
    this.get(this.urlValue)
  }

  getNext(event) {
    const ele = event.currentTarget
    const option = ele.selectedOptions[0]

    fetch(this.urlValue, {
      method: 'POST',
      headers: {
        Accept: 'text/vnd.turbo-stream.html',
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.csrfToken()
      },
      body: JSON.stringify({
        id: option.dataset.id
      })
    }).then(response => {
      return response.text()
    }).then(body => {
      const node = ele.parentNode
      this.clear(node)
      if (body.length > 0) {
        node.insertAdjacentHTML('afterend', body)
      }
    })
  }

  setValue(event) {
    document.getElementById(this.idValue).value = event.currentTarget.selectedOptions[0].dataset.id
  }

  confirmValue() {
    const last = this.selectTargets[this.selectTargets.length - 1]
    const input = document.getElementById(this.idValue)

    if (last && input) {
      input.value = last.selectedOptions[0].dataset.id
      if (input.nextElementSibling) {
        input.nextElementSibling.value = last.selectedOptions[0].value
      }
    }

  }

  close() {
    this.confirmValue()
    this.element.remove()
  }

  clear(node) {
    let el = node.nextElementSibling
    while (el) {
      el.remove()
      el = node.nextElementSibling
    }
  }

}
