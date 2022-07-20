import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String,
    name: String,
    hidden: Boolean
  }

  doPrint() {
    const present_frame = document.getElementById('pdf_iframe')
    if (present_frame) {
      present_frame.src = this.urlValue
    } else {
      const iframe = document.createElement('iframe')
      iframe.src = this.urlValue
      iframe.name = 'pdf'
      iframe.id = 'pdf_iframe'
      iframe.hidden = true
      iframe.onload = () => {
        const pdfFrame = window.frames['pdf']
        pdfFrame.focus()
        pdfFrame.print()
      }
      document.body.appendChild(iframe)
    }
  }

  batchPrint() {
    this.batchUrl()
    this.doPrint()
  }

  batchUrl() {
    const ids = []
    this.checkboxes.forEach(item => {
      if (item.checked && !item.disabled) {
        ids.push(item.value)
      }
    })

    if (ids.length > 0) {
      const url = new URL(this.urlValue)
      url.searchParams.set('ids', ids.join(','))
      this.urlValue = url
    } else {
      alert('no need commit')
    }
  }

  // checkbox data-action="check#toggleAll"
  toggleAll(event) {
    const element = event.currentTarget

    for (let checkbox of this.checkboxes) {
      if (!checkbox.disabled) {
        checkbox.checked = element.checked
      }
    }
  }

  get checkboxes() {
    return document.querySelectorAll(`input[type=checkbox][name='${this.nameValue}']`)
  }

}
