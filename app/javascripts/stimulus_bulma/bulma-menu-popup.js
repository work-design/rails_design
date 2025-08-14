import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['trigger']
  static values = {
    openClass: String,
    closeClass: String,
  }

  connect() {
    this.element.addEventListener('mouseover', () => {
      this.open()
    })
    this.element.addEventListener('mouseout', () => {
      this.close()
    })
  }

  open() {
    this.element.classList.add('is-active')
    this.element.lastElementChild.style.top = `${this.element.offsetTop - this.element.parentElement.parentElement.parentElement.scrollTop}px`
  }

  close() {
    this.element.classList.remove('is-active')
  }

  enter(event) {
    const ele = event.currentTarget

    this.element.closest('.menu-list').querySelectorAll('.cell').forEach(el => {
      if (el.classList.contains('is-active')) {
        el.classList.remove('is-active')
      }
    })
    ele.classList.add('is-active')

    Array.from(this.element.closest('.menu-list').children).forEach(el => {
      if (el.classList.contains('is-active')) {
        el.classList.remove('is-active')
      }
    })
    this.element.closest('.menu-item').classList.add('is-active')

    this.element.classList.remove('is-active')
  }

}
