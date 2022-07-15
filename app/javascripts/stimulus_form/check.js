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
      if (!checkbox.disabled) {
        checkbox.checked = element.checked
      }
    }
  }

  doSubmit(event) {
    event.preventDefault()

    const ids = []
    this.checkboxes.forEach(item => {
      if (item.checked && !item.disabled) {
        ids.push(item.value)
      }
    })

    if (ids.length > 0) {
      this.idsTarget.value = ids
      this.submit(this.idsTarget.form)
    } else {
      alert('no need commit')
    }
  }

  get checkboxes() {
    return document.querySelectorAll(`input[type=checkbox][name='${this.nameValue}']`)
  }
}
