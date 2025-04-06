import BaseController from '../base_controller'

// data-controller="typer-local"
export default class extends BaseController {
  static targets = [
    'input',
    'value',
    'content'
  ]
  static values = {
    url: String
  }

  connect() {
    const ele = this.inputTarget
    ele.addEventListener('input', this.form)
    ele.addEventListener('compositionstart', event => {
      event.target.removeEventListener('input', this.search)
    })
    ele.addEventListener('compositionend', event => {
      event.target.addEventListener('input', this.search)
      this.conSearch(ele)
    })
  }

  // NOTICE  here this becomes ele, who call addEventListener
  search() {
    const con = this.closest('[data-controller~=typer-local]').getController('typer-local')

    if (con.hasValueTarget) {
      con.valueTarget.removeAttribute('value')
      if (!this.value) {
        con.clear()
        return
      }
    }

    con.doSearch(this.value)
  }

  conSearch(ele) {
    this.valueTarget.removeAttribute('value')
    if (!ele.value) {
      this.clear()
      return
    }

    this.doSearch(ele.value)
  }

  doSearch(value) {
    this.contentTargets.forEach(el => {
      if (el.dataset.name.startsWith(value)) {

      } else {
        el.classList.add('display-none')
      }
    })
  }

  clear() {
    this.contentTargets.forEach(el => {
      el.classList.remove('display-none')
    })
  }

  // click->typer#choose
  choose(event) {
    const ele = event.currentTarget
    this.valueTarget.value = ele.dataset['id']
    this.inputTarget.value = ele.dataset['name']
    ele.parentNode.replaceChildren()
  }

}
