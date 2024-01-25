import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    duration: Number
  }

  connect() {
    if (this.hasDurationValue) {
      setTimeout(() => {
        this.shownNext(this.element, this.identifier)
      }, this.durationValue)
    }
  }

  showNext(event) {
    this.shownNext(this.element, this.identifier)
  }

  shownNext(ele, identifier) {
    ele.style.display = 'none'
    let nextEle = ele.nextElementSibling
    nextEle.style.removeProperty('display')
    nextEle.dataset.add('controller', identifier)
  }

}
