import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  enter(event) {
    const ele = event.currentTarget

    Array.from(this.element.children).filter(el => el.classList.contains('menu-list')).forEach(item => {
      Array.from(item.children).forEach(el => {
        if (el.classList.contains('is-active')) {
          el.classList.remove('is-active')
        }
      })
    })

    ele.classList.add('is-active')
  }

}
