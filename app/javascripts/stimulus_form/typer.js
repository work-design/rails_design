import BaseController from '../base_controller'

// data-controller="typer"
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
      event.target.removeEventListener('input', this.form)
    })
    ele.addEventListener('compositionend', event => {
      event.target.addEventListener('input', this.form)
      this.conForm(ele)
    })
  }

  // NOTICE  here this becomes ele, who call addEventListener
  form() {
    const con = this.closest('[data-controller~=typer]').getController('typer')

    if (con.hasValueTarget) {
      con.valueTarget.removeAttribute('value')
      if (this.value) {
        con.remoteFilter(this)
      } else {
        con.clear()
      }
    }
  }

  conForm(ele) {
    this.valueTarget.removeAttribute('value')
    if (ele.value) {
      this.remoteFilter(ele)
    } else {
      this.clear()
    }
  }

  remoteFilter(ele) {
    if (this.hasUrlValue) {
      this.inputPost(ele)
    } else {
      ele.form.requestSubmit()
    }
  }

  clear() {
    Array.from(this.contentTarget.children).forEach(child => {
      child.remove()
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
