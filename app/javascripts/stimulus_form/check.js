import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static outlets = ['check-commit']
  static targets = ['all', 'total']
  static values = {
    container: String,
    range: String
  }

  connect() {
    for (const ingredient of this.checkboxes) {
      if (ingredient.dataset.all) {
        ingredient.dataset.all= ingredient.dataset.all.concat(`, #${this.element.id}`)
      } else {
        ingredient.dataset.all = `#${this.element.id}`
      }
      ingredient.addEventListener('click', this.updateDisplay)
    }
  }

  // checkbox data-action="check#toggleAll"
  toggleAll(event) {
    const element = event.currentTarget

    for (const checkbox of this.checkboxes) {
      if (!checkbox.disabled) {
        checkbox.checked = element.checked
        checkbox.dispatchEvent(new Event('input'))
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
    const cons = document.querySelectorAll(event.currentTarget.dataset.all)
    cons.forEach(ele => {
      let checkedCount = 0
      const con = ele.getController('check')
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
    })
  }

  get checkboxes() {
    if (this.hasContainerValue) {
      const container = document.getElementById(this.containerValue)
      return container.querySelectorAll(`input[type=checkbox][name^='${this.allTarget.value}']`)
    } else if (this.hasRangeValue) {
      return document.querySelectorAll(`[id^=${this.rangeValue}] input[type=checkbox][name^='${this.allTarget.value}']`)
    } else {
      return document.querySelectorAll(`input[type=checkbox][name^='${this.allTarget.value}']`)
    }
  }

}
