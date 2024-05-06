import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  appear(event) {
    const ele = event.currentTarget
    ele.parentNode.classList.remove('is-skeleton')
  }

}
