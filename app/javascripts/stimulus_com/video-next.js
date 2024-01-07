import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['next', 'video', 'play']

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
    const ele = event.currentTarget
    const con = ele.closest('[data-controller~=video-next]').controller('video-next')
    ele.style.display = 'none'
    con.nextTargets.forEach(el => {
      el.style.removeProperty('display')
    })
    con.playTargets.forEach(el => {
      el.play()
    })
  }

  get video() {
    if (this.hasVideoTarget) {
      return this.videoTarget
    } else {
      return this.element
    }
  }

}
