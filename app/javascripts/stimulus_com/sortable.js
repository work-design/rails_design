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
        const body = {
          old_index: evt.oldIndex,
          new_index: evt.newIndex
        }

        if (evt.newIndex === evt.oldIndex) {
          return
        } else if (evt.newIndex > evt.oldIndex) { // 向下移动
          body.prior_id = evt.item.previousElementSibling.dataset.id
        } else {
          body.subsequent_id = evt.item.nextElementSibling.dataset.id
        }

        const url = evt.item.dataset['url']
        this.patch(url, JSON.stringify(body), { 'Content-Type': 'application/json' })
      }
    })
  }

  disconnect() {
    //this.sortable.destroy()
  }

}
