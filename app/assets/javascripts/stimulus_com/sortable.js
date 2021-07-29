import { Controller } from 'stimulus'
import Sortable from 'sortablejs'

class SortableController extends Controller {

  reload(element) {
    Sortable.create(element, {
      handle: '.is-drawable',
      onEnd: function(evt) {
        if (evt.oldIndex === evt.newIndex) {
          return
        }
        let url = element.dataset['src'] + evt.item.dataset['id'] + '/reorder'
        let body = {
          sort_array: this.toArray(),
          old_index: evt.oldIndex,
          new_index: evt.newIndex
        }

        fetch(url, {
          method: 'PATCH',
          headers: {
            Accept: 'text/vnd.turbo-stream.html',
            'Content-Type': 'application/json'
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
    console.debug('connected:', this.identifier)
    this.reload(this.element)
  }

}

application.register('sortable', SortableController)
