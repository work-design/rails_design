import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['template']

  add(e) {
    const input = this.templateTarget.cloneNode(true)
    const inputs = input.querySelectorAll('textarea, input')
    inputs.forEach(el => {
      el.autofocus = false
      el.value = ''
    })

    this.templateTarget.after(input)
    inputs[0].focus()
  }

  remove(e) {
    const ele = e.currentTarget
    ele.parentNode.remove()
  }
}