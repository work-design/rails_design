import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static outlets = ['check-commit']
  static targets = ['all']

  connect() {
    for (const ingredient of this.checkboxes) {
      ingredient.dataset.id = this.element.id
      ingredient.addEventListener('click', this.updateDisplay)
    }
  }

  // checkbox data-action="check#toggleAll"
  toggleAll(event) {
    const element = event.currentTarget
    if (element.checked) {
      this.showCommits()
    } else {
      this.hiddenCommits()
    }

    for (const checkbox of this.checkboxes) {
      if (!checkbox.disabled) {
        checkbox.checked = element.checked
      }
    }
  }

  showCommits() {
    this.checkCommitOutletElements.forEach(el => {
      el.classList.remove('is-hidden')
    })
  }

  hiddenCommits() {
    this.checkCommitOutletElements.forEach(el => {
      el.classList.add('is-hidden')
    })
  }

  // NOTICE: this become event
  updateDisplay(event) {
    let checkedCount = 0
    const ele = event.currentTarget
    const ingredients = document.querySelectorAll(`input[type=checkbox][name='${ele.name}']`)
    const con = document.getElementById(ele.dataset.id).controller('check')
    const overall = con.allTarget
    for (const ingredient of ingredients) {
      if (ingredient.checked) {
        checkedCount++;
      }
    }

    if (checkedCount === 0) {
      overall.checked = false
      overall.indeterminate = false
      con.hiddenCommits()
    } else if (checkedCount === ingredients.length) {
      overall.checked = true
      overall.indeterminate = false
      con.showCommits()
    } else {
      overall.checked = false
      overall.indeterminate = true
      con.showCommits()
    }
  }

  get checkboxes() {
    return document.querySelectorAll(`input[type=checkbox][name='${this.allTarget.value}']`)
  }

}
