import { Controller } from '@hotwired/stimulus'

// data-controller="typer"
export default class extends Controller {
  static targets = ['input', 'value']
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
    if (!this.value) {
      return
    }

    if (con.hasUrlValue) {
      con.doRequest(this)
    } else {
      this.form.requestSubmit()
    }
  }

  conForm(ele) {
    if (!ele.value) {
      return
    }

    if (this.hasUrlValue) {
      this.doRequest(ele)
    } else {
      ele.form.requestSubmit()
    }
  }

  // click->typer#choose
  choose(event) {
    const ele = event.currentTarget
    this.valueTarget.value = ele.dataset['id']
    this.inputTarget.value = ele.dataset['name']
    ele.parentNode.replaceChildren()
  }

}
