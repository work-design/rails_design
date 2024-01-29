import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    duration: Number
  }

  connect() {
    if (this.hasDurationValue) {
      setTimeout(() => {
        this.shownNext(this.element, this.element.nextElementSibling, this.identifier)
      }, this.durationValue)
    }
  }

  showNext(event) {
    const ele = event.currentTarget

    let nextEle = ele.nextElementSibling
    if (ele.dataset.next) {
      nextEle = document.getElementById(ele.dataset.next)
    }

    let hiddenEle = ele
    if (ele.dataset.hidden) {
      hiddenEle = document.getElementById(ele.dataset.hidden)
    }

    this.shownNext(hiddenEle, nextEle, this.identifier)
  }

  shownNext(hiddenEle, nextEle, identifier) {
    hiddenEle.style.display = 'none'
    nextEle.style.removeProperty('display')
    if (nextEle.dataset.controller?.includes('dispatch')) {
      const dispatch = nextEle.controller('dispatch')
      dispatch.controlTargets.forEach(el => {
        el.dataset.add('controller', dispatch.controlValue)
      })
    } else {
      nextEle.dataset.add('controller', identifier)
    }
  }

}
