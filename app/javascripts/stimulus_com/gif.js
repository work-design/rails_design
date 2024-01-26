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
    const ele = event.currentTarget
    const nextEle = document.getElementById(ele.dataset.next)
    if (ele.dataset.hidden) {
      const hidden = document.getElementById(ele.dataset.hidden)
      hidden.style.display = 'none'
    } else {
      ele.style.display = 'none'
    }
    const xx = ele.closest('[data-controller~=dispatch]')
    if (xx) {
      xx.style.display = 'none'
    }
    nextEle.style.removeProperty('display')
    nextEle.dataset.add('controller', this.identifier)
  }

  shownNext(ele, identifier) {
    ele.style.display = 'none'
    let nextEle = ele.nextElementSibling
    nextEle.style.removeProperty('display')
    if (nextEle.dataset.controller?.includes('dispatch')) {
      nextEle.controller('dispatch').controlTargets.forEach(el => {
        el.dataset.add('controller', identifier)
      })
    } else {
      nextEle.dataset.add('controller', identifier)
    }
  }

}
