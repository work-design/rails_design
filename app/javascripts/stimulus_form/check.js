import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['all']

  connect() {
    for (const ingredient of this.checkboxes) {
      ingredient.dataset.id = this.allTarget.id
      ingredient.addEventListener('click', this.updateDisplay)
    }
  }

  // checkbox data-action="check#toggleAll"
  toggleAll(event) {
    const element = event.currentTarget

    for (const checkbox of this.checkboxes) {
      if (!checkbox.disabled) {
        checkbox.checked = element.checked
      }
    }
  }

  // NOTICE: this become event
  updateDisplay(event) {
    let checkedCount = 0
    const ele = event.currentTarget
    const ingredients = document.querySelectorAll(`input[type=checkbox][name='${ele.name}']`)
    const element = document.getElementById(ele.dataset.id)
    for (const ingredient of ingredients) {
      if (ingredient.checked) {
        checkedCount++;
      }
    }

    if (checkedCount === 0) {
      element.checked = false
      element.indeterminate = false
    } else if (checkedCount === ingredients.length) {
      element.checked = true
      element.indeterminate = false
    } else {
      element.checked = false
      element.indeterminate = true
    }
  }

  get checkboxes() {
    return document.querySelectorAll(`input[type=checkbox][name='${this.allTarget.value}']`)
  }

}
