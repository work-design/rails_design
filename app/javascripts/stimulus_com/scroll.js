import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  preserve(event) {
    let oldContainer = event.target.parentElement
    while (oldContainer) {
      if (oldContainer.scrollTop > 0) {
        break
      }
      oldContainer = oldContainer.parentElement
    }

    window.addEventListener('turbo:render', ev => {
      const newContainer = document.getElementById(oldContainer.id) || document.scrollingElement
      console.debug('old container scroll top', oldContainer.scrollTop)
      newContainer.scrollTo(0, oldContainer.scrollTop)
    }, { once: true })
  }

}
