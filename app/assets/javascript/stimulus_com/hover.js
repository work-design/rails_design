import { Controller } from "stimulus"

class HoverController extends Controller {
  static targets = ['card']
  static values = {
    url: String
  }

  connect() {
    console.debug(this.identifier, 'connected')
  }

  show(event) {
    let ele = event.currentTarget
    if (this.hasCardTarget) {
      this.cardTarget.classList.remove('is-hidden')
    } else if (this.urlValue) {
      Rails.ajax({
        url: this.urlValue,
        type: 'GET',
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
      this.cardTarget.classList.add('is-hidden')
    }
  }

  disconnect() {
    if (this.hasCardTarget) {
      this.cardTarget.remove()
    }
  }

}

application.register('hover', HoverController)
