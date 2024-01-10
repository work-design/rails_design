import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
  }

  disconnect() {
    this.element.querySelectorAll('audio, video').forEach(el => el.remove())
  }

  playNext(event) {
    const ele = event.currentTarget
    const nextEle = ele.parentElement.nextElementSibling

    ele.style.display = 'none'
    nextEle.style.removeProperty('display')
    nextEle.querySelectorAll('audio, video').forEach(el => el.play())
  }

  get video() {
    if (this.hasVideoTarget) {
      return this.videoTarget
    } else {
      return this.element
    }
  }

}
