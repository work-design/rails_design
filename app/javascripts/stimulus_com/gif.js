import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    duration: Number
  }

  connect() {
    if (this.hasDurationValue) {
      setTimeout(() => {
        this.element.style.display = 'none'
        let nextEle = this.element.nextElementSibling
        nextEle.style.removeProperty('display')
        nextEle.dataset.add('controller', 'gif')
      }, this.durationValue)
    }
  }

}
