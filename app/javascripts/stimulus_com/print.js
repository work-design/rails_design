import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String,
    hidden: Boolean
  }

  doPrint() {
    const iframe = document.createElement('iframe')

    iframe.src = this.urlValue
    iframe.name = 'pdf'
    iframe.hidden = this.hiddenValue
    iframe.onload = () => {
      const pdfFrame = window.frames['pdf']
      pdfFrame.focus()
      pdfFrame.print()
    }
    document.body.appendChild(iframe)
  }

}
