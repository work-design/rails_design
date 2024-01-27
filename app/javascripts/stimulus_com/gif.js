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
    const nextEle = document.getElementById(ele.dataset.next)
    let hidden

    if (ele.dataset.hidden) {
      hidden = document.getElementById(ele.dataset.hidden)
    } else {
      hidden = ele
    }

    this.shownNext(hidden, nextEle, this.identifier)
  }

  shownNext(ele, nextEle, identifier) {
    ele.style.display = 'none'

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
