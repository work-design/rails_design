import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = [
    'media',
    'progress',
    'cover',
    'hide'
  ]
  static values = {
    show: String
  }

  connect() {
    if (this.mediaTarget.duration && this.hasProgressTarget) {
      this.progressTarget.setAttribute('max', this.mediaTarget.duration)
    } else if (this.hasProgressTarget) {
      this.mediaTarget.addEventListener('loadedmetadata', (e) => {
        this.progressTarget.setAttribute('max', e.currentTarget.duration)
      })
    }
    if (this.hasProgressTarget) {
      this.mediaTarget.addEventListener('timeupdate', () => {
        if (!this.progressTarget.getAttribute('max')) {
          this.progressTarget.setAttribute('max', this.mediaTarget.duration)
        }
        this.progressTarget.value = this.mediaTarget.currentTime
      })
    }
  }

  toggle(e) {
    const ele = e.currentTarget
    if (this.mediaTarget.played.length === 0 || this.mediaTarget.paused) {
      this.mediaTarget.play()
      ele.children[0].classList.replace('fa-play', 'fa-pause')
      this.coverTarget.style.animationPlayState = 'running'
    } else {
      this.mediaTarget.pause()
      ele.children[0].classList.replace('fa-pause', 'fa-play')
      this.coverTarget.style.animationPlayState = 'paused'
    }
  }

  play() {
    if (this.mediaTarget.played.length === 0 || this.mediaTarget.paused) {
      this.mediaTarget.play()
    }
  }

  cutTo() {
    if (this.hasHideTarget) {
      this.hideTarget.style.display = 'none'
    }
    if (this.hasShowValue) {
      const show = document.getElementById(this.showValue)
      show.style.removeProperty('display')
      if (['VIDEO', 'AUDIO'].includes(this.element.tagName)) {
        show.play()
      } else {
        show.querySelector('audio, video')?.play()
      }
    }
  }

}
