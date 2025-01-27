import BaseController from '../base_controller'
const I18N = {
  zh: '已选择 {value}',
  en: '{value} Selected'
}

export default class extends BaseController {
  static outlets = ['form']
  static targets = ['all']
  static values = {
    container: String,
    range: String,
    total: { type: String, default: 'check_total' }
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
    const ids = []

    for (const checkbox of this.checkboxes) {
      if (!checkbox.disabled) {
        ids.push(checkbox.value)
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
      this.showCommits(ids)
    } else {
      this.hiddenCommits()
    }
  }

  showCommits(ids) {
    this.formOutlets.forEach(el => {
      if (ids.length > 0) {
        if (el.hasSubmitTarget) {
          el.submitTarget.disabled = false
        }
        if (el.hasIdsTarget) {
          el.idsTarget.value = ids
        }
      }
    })
    if (this.totalContainer) {
      const word = I18N[this.locale]
      this.totalContainer.innerText = word.replace('{value}', ids.length)
    }
  }

  hiddenCommits() {
    this.formOutlets.forEach(el => {
      if (el.hasSubmitTarget) {
        el.submitTarget.disabled = true
      }
      if (el.hasIdsTarget) {
        el.idsTarget.value = ''
      }
    })
    if (this.totalContainer) {
      this.totalContainer.innerText = ''
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

  get totalContainer() {
    return document.getElementById(this.totalValue)
  }

}
