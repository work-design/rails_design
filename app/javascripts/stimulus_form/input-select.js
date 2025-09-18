import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['input']

  select(e) {
    const ele = e.currentTarget
    this.inputTarget.value = ele.dataset.value
    this.inputTarget.form.requestSubmit()
  }

}