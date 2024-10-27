import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['ids']
  static outlets = ['check']

  doSubmit(event) {
    const ids = []
    this.checkOutlet.checkboxes.forEach(item => {
      if (item.checked && !item.disabled) {
        ids.push(item.value)
      }
    })

    if (ids.length > 0) {
      this.idsTarget.value = ids
    } else {
      alert('no need commit')
    }
  }
}
