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
      this.form(event)
    })
  }

  form(event) {
    const ele = event.currentTarget
    if (!ele.value) {
      return
    }

    if (this.hasUrlValue) {
      const search_url = new URL(this.urlValue, location.origin)
      if (this.hasMethodValue) {
        const body = new FormData()
        body.append(ele.name, ele.value)
        this.request(search_url, this.methodValue, data)
      } else {
        search_url.searchParams.set(ele.name, ele.value)
        this.get(search_url)
      }
    } else {
      this.submit(ele.form)
    }
  }

  // click->typer#choose
  choose(event) {
    const ele = event.currentTarget
    this.valueTarget.value = ele.dataset['id']
    this.inputTarget.value = ele.dataset['name']
  }

}
