import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['card']
  static values = {
    url: String
  }

  show(event) {
    let ele = event.currentTarget
    if (this.hasCardTarget) {
      this.cardTarget.classList.remove('display-none')
    } else if (this.urlValue) {
      fetch(this.urlValue, {
        method: 'GET',
        dataType: 'text/html',
        success: function(html) {
          ele.insertAdjacentHTML('beforebegin', html.body.innerHTML)
        },
        error: function(data) {
          console.debug('error', data)
        }
      })
    }
  }

  hide() {
    if (this.hasCardTarget) {
      this.cardTarget.classList.add('display-none')
    }
  }

  disconnect() {
    if (this.hasCardTarget) {
      this.cardTarget.remove()
    }
  }

}
