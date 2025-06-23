import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['template']

  add(e) {
    const input = this.templateTarget.cloneNode(true)
    input.removeAttribute('data-input-clone-target')

    this.templateTarget.after(input)
  }
}