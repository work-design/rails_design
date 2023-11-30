import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['ids']
  static outlets = ['check']

  doSubmit(event) {
    event.preventDefault()

    const ids = []
    this.checkOutlet.checkboxes.forEach(item => {
      if (item.checked && !item.disabled) {
        ids.push(item.value)
      }
    })

    if (ids.length > 0) {
      this.idsTarget.value = ids
      this.idsTarget.form.requestSubmit()
    } else {
      alert('no need commit')
    }
  }
}
