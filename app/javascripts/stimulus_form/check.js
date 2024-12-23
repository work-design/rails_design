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
      ingredient.addEventListener('change', this.updateDisplay)
    }
  }

  // checkbox data-action="check#toggleAll"
  toggleAll(event) {
    const element = event.currentTarget

    for (const checkbox of this.checkboxes) {
      if (!checkbox.disabled) {
        checkbox.checked = element.checked
        checkbox.dispatchEvent(new Event('input'))
        const all = checkbox.dataset.all.split(', ').filter(el => el !== `#${this.element.id}`).join(', ')
        if (all) {
          console.debug(all)
          const cons = document.querySelectorAll(all)
          cons.forEach(ele => {
            const con = ele.getController('check')
            con.computeDisplay()
          })
        }
      }
    }

    if (element.checked) {
      this.showCommits(this.checkboxes)
    } else {
      this.hiddenCommits()
    }
  }

  showCommits(ids) {
    this.checkCommitOutlets.forEach(el => {
      if (ids.length > 0) {
        el.submitTarget.disabled = false
        el.idsTarget.value = ids
      }
    })
    if (this.hasTotalTarget) {
      this.totalTarget.innerText = `${ids.length} Selected`
    }
  }

  hiddenCommits() {
    this.checkCommitOutlets.forEach(el => {
      el.submitTarget.disabled = true
      el.idsTarget.value = ''
    })
    if (this.hasTotalTarget) {
      this.totalTarget.innerText = ''
    }
  }

  // NOTICE: this become event
  updateDisplay(event) {
    const cons = document.querySelectorAll(event.currentTarget.dataset.all)
    cons.forEach(ele => {
      const con = ele.getController('check')
      con.computeDisplay()
    })
  }

  computeDisplay() {
    let checkedCount = 0
    const ids = []
    const overall = this.allTarget
    for (const ingredient of this.checkboxes) {
      if (ingredient.checked) {
        checkedCount++
        ids.push(ingredient.value)
      }
    }

    if (checkedCount === 0) {
      overall.checked = false
      overall.indeterminate = false
      this.hiddenCommits()
    } else if (checkedCount === this.checkboxes.length) {
      overall.checked = true
      overall.indeterminate = false
      this.showCommits(ids)
    } else {
      overall.checked = false
      overall.indeterminate = true
      this.showCommits(ids)
    }
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
