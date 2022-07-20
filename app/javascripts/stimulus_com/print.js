import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String,
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

}
