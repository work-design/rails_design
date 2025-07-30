import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    mappings: { type: Object, default: {} }
  }

  connect() {
    this.element.addEventListener('submit', e => {
       this.submit(e)
    })
  }

  submit(e) {
    Object.entries(this.mappingsValue).forEach(([key, value]) => {
      this.element.elements.namedItem(key).value = document.getElementById(value).value
    })
  }

}