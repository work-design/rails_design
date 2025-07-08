import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['template']

  add(e) {
    const input = this.templateTarget.cloneNode(true)
    input.removeAttribute('data-input-clone-target')
    input.querySelectorAll('textarea, input').forEach(el => {
      el.value = ''
      el.focus()
    })

    this.templateTarget.after(input)
  }

  remove(e) {
    const ele = e.currentTarget
    ele.parentNode.remove()
  }
}