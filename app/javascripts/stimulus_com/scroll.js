import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
  }

  preserve(event) {
    let scrollTop
    let scrollContainer
    let ele = event.target.parentElement
    while (ele) {
      if (ele.scrollTop > 0) {
        scrollTop = ele.scrollTop
        scrollContainer = ele
        break
      }
      ele = ele.parentElement
    }

    window.addEventListener('turbo:render', ev => {
      const ele = document.getElementById(scrollContainer.id) || document.scrollingElement
      console.debug('------------------------', ele, scrollTop)
      ele.scrollTo(0, scrollTop)
    }, { once: true })
  }

}
