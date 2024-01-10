import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['video']

  connect() {
    if (this.video.autoplay) {
      this.video.addEventListener('ended', this.enableLink)
    }
  }

  disconnect() {
    this.element.querySelectorAll('audio, video').forEach(el => el.remove())
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
