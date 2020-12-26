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
        let body = new FormData()
        this.toArray().forEach(el => {
          body.append('sort_array[]', el)
        })
        body.append('old_index', evt.oldIndex)
        body.append('new_index', evt.newIndex)

        Rails.ajax({
          url: url,
          type: 'PATCH',
          dataType: 'script',
          data: body
        })
      }
    })
  }

  connect() {
    console.debug('Sortable Controller works!')
    this.reload(this.element)
  }

}

application.register('sortable', SortableController)
