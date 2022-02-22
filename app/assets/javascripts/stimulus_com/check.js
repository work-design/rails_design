import { Controller } from '@hotwired/stimulus'

// data-controller="check"
export default class extends Controller {
  static targets = ['ids']
  static values = {
    name: String
  }

  // checkbox data-action="check#toggleAll"
  toggleAll(event) {
    const element = event.currentTarget

    for (let checkbox of this.checkboxes) {
      checkbox.checked = element.checked
      this.doToggle(checkbox)
    }
  }

  doSubmit() {
    const ids = []
    this.checkboxes.forEach(item => {
      ids.push(item.value)
    })
    this.idsTarget.value = ids.join(',')

    this.submit(this.idsTarget.form)
  }

  get checkboxes() {
    return document.querySelectorAll(`input[type=checkbox][name='${this.nameValue}']`)
  }
}
