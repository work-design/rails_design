import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['trigger', 'aim']
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

  aimTargetConnected(target) {
    const ro = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize[0]
      target.style.left = `${box.inlineSize}px`

      ro.unobserve(entry.target)
    })
    ro.observe(this.element)
  }

  open() {
    this.element.classList.add('is-active')
    const dropdownMenu = this.element.lastElementChild
    const menu = this.element.parentElement.parentElement.parentElement
    const top = this.element.offsetTop - menu.scrollTop // 当前元素的上边距离页面顶部的距离
    const height = dropdownMenu.firstElementChild.clientHeight // 当前弹出框的实际高度

    if (top + height > innerHeight) {
      dropdownMenu.style.top = 'auto'
      dropdownMenu.style.bottom = '0'
    } else {
      dropdownMenu.style.top = `${top}px`
    }
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
