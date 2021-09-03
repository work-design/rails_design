import { Controller } from '@hotwired/stimulus'
import Sortable from 'sortablejs'

export default class extends Controller {

  reload(element, controller) {
    Sortable.create(element, {
      handle: '.is-drawable',
      onEnd: function(evt) {
        if (evt.oldIndex === evt.newIndex) {
          return
        }
        let url = [element.dataset['src'], evt.item.dataset['id'], 'reorder'].join('/')
        let body = {
          sort_array: this.toArray(),
          old_index: evt.oldIndex,
          new_index: evt.newIndex
        }

        fetch(url, {
          method: 'PATCH',
          headers: {
            Accept: 'text/vnd.turbo-stream.html',
            'Content-Type': 'application/json',
            'X-CSRF-Token': controller.csrfToken()
          },
          body: JSON.stringify(body)
        }).then(response => {
          return response.text()
        }).then(body => {
          Turbo.renderStreamMessage(body)
        })
      }
    })
  }

  connect() {
    this.reload(this.element, this)
  }

}
