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
    if (ele.dataset.hidden) {
      const hiddenEles = document.querySelectorAll(ele.dataset.hidden)
      hiddenEles.forEach(el => {
        el.style.display = 'none'
      })
    }

    let nextEles = [ele.nextElementSibling]
    if (ele.dataset.next) {
      nextEles = document.querySelectorAll(ele.dataset.next)
    }
    let nextCon = identifier
    if (ele.dataset.nextController) {
      nextCon = ele.dataset.nextController
    }
    nextEles.forEach(el => {
      el.style.removeProperty('display')
      el.dataset.add('controller', nextCon)
    })
  }

}
