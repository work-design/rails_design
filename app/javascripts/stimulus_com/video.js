import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['video']

  connect() {
    if (this.video.autoplay) {
      console.debug('ended event added')
      this.video.addEventListener('ended', this.enableLink)
    }
  }

  disconnect() {
    console.debug('ddd', this.video)
    this.video.remove()
  }

  enableLink(event) {
    const ele = event.currentTarget.closest('a[disabled=disabled]')
    if (ele) {
      ele.removeAttribute('disabled')
    }
  }

  get video() {
    if (this.hasVideoTarget) {
      return this.videoTarget
    } else {
      return this.element
    }
  }

}
