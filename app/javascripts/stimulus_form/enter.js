import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['input']
  static values = {
    index: Number,
    label: Boolean
  }

  // data-action="click->field#add"
  open() {
    this.element.querySelectorAll('input').forEach(el => {
      el.disabled = false
    })
  }

  close() {
    this.element.querySelectorAll('input').forEach(el => {
      el.disabled = true
    })
  }

}
