import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static outlets = ['check-commit']
  static targets = ['all', 'total']
  static values = {
    container: { type: String, default: 'tbody' }
  }

  connect() {
    for (const ingredient of this.checkboxes) {
      ingredient.dataset.id = this.element.id
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

    if (element.checked) {
      this.showCommits(this.checkboxes.length)
    } else {
      this.hiddenCommits()
    }
  }

  showCommits(total) {
    this.checkCommitOutletElements.forEach(el => {
      el.classList.remove('display-none')
    })
    if (this.hasTotalTarget) {
      this.totalTarget.innerText = `${total} Selected`
    }
  }

  hiddenCommits() {
    this.checkCommitOutletElements.forEach(el => {
      el.classList.add('display-none')
    })
    if (this.hasTotalTarget) {
      this.totalTarget.innerText = ''
    }
  }

  // NOTICE: this become event
  updateDisplay(event) {
    let checkedCount = 0
    const con = document.getElementById(event.currentTarget.dataset.id).getController('check')
    const overall = con.allTarget
    for (const ingredient of con.checkboxes) {
      if (ingredient.checked) {
        checkedCount++
      }
    }

    if (checkedCount === 0) {
      overall.checked = false
      overall.indeterminate = false
      con.hiddenCommits()
    } else if (checkedCount === con.checkboxes.length) {
      overall.checked = true
      overall.indeterminate = false
      con.showCommits(checkedCount)
    } else {
      overall.checked = false
      overall.indeterminate = true
      con.showCommits(checkedCount)
    }
  }

  get checkboxes() {
    const container = document.getElementById(this.containerValue)
    return container.querySelectorAll(`input[type=checkbox][name^='${this.allTarget.value}']`)
  }

}
