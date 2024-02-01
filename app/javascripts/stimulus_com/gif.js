import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    duration: Number
  }

  connect() {
    if (this.hasDurationValue) {
      setTimeout(() => {
        this.innerShowNext(this.element, this.identifier)
      }, this.durationValue)
    }
  }

  showNext(event) {
    const ele = event.currentTarget
    this.innerShowNext(ele, this.identifier)
  }

  innerShowNext(ele, identifier) {
    let nextEle = ele.nextElementSibling
    if (ele.dataset.next) {
      nextEle = document.getElementById(ele.dataset.next)
    }
    let hiddenEle = ele
    if (ele.dataset.hidden) {
      hiddenEle = document.getElementById(ele.dataset.hidden)
    }

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
