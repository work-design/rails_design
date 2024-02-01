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
    let nextEles = [ele.nextElementSibling]
    if (ele.dataset.next) {
      nextEles = document.querySelectorAll(ele.dataset.next)
    }
    let hiddenEles = [ele]
    if (ele.dataset.hidden) {
      hiddenEles = document.querySelectorAll(ele.dataset.hidden)
    }

    nextEles.forEach(el => {
      el.style.removeProperty('display')
      el.dataset.add('controller', identifier)
    })
    hiddenEles.forEach(el => {
      el.style.display = 'none'
    })
  }

}
