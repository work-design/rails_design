import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['template']

  connect() {
  }

  select(e) {
    const ele = e.currentTarget
    const cloned = this.templateTarget.cloneNode(true)
    cloned.removeAttribute('data-choice-target')
    cloned.value = ele.dataset.id

    this.element.prepend(cloned)
  }

}
