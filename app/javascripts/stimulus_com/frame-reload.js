import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    const frame = this.element.closest('turbo-frame')
    if (frame && frame.src) {
      frame.reload()
    } else {
      Turbo.visit(location.href, { action: 'replace' })
    }
  }

}
