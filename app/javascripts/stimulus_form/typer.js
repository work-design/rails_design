import { Controller } from '@hotwired/stimulus'

// data-controller="typer"
export default class extends Controller {
  static targets = ['input', 'value', 'content']
  static values = {
    url: String,
    method: String
  }

  connect() {
    this.initInput()
  }

  initInput() {
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
    const con = this.closest('[data-controller~=typer]').controller('typer')
    con.valueTarget.removeAttribute('value')
    if (!this.value) {
      con.clear()
      return
    }

    if (con.hasUrlValue) {
      con.doRequest(this)
    } else {
      this.form.requestSubmit()
    }
  }

  conForm(ele) {
    this.valueTarget.removeAttribute('value')
    if (!ele.value) {
      this.clear()
      return
    }

    if (this.hasUrlValue) {
      this.doRequest(ele)
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
