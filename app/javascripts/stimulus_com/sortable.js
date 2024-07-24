import BaseController from '../base_controller'
import Sortable from 'sortablejs'

export default class extends BaseController {
  static values = {
    handle: { type: String, default: '.is-drawable' }
  }

  connect() {
    Sortable.create(this.element, {
      handle: this.handleValue,
      onEnd: evt => {
        console.debug('-----', evt)
        window.xxx = evt
        if (evt.oldIndex === evt.newIndex) {
          return
        }
        const url = evt.item.dataset['url']
        const body = {
          //sort_array: this.toArray(),
          old_index: evt.oldIndex,
          new_index: evt.newIndex
        }

        this.patch(url, JSON.stringify(body), { 'Content-Type': 'application/json' })
      }
    })
  }

  disconnect() {
    //this.sortable.destroy()
  }

}
