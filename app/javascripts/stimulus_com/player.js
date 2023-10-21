import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['media', 'progress']

  connect() {
    if (this.mediaTarget.duration) {
      this.progressTarget.setAttribute('max', this.mediaTarget.duration)
    } else {
      this.mediaTarget.addEventListener('loadedmetadata', (e) => {
        this.progressTarget.setAttribute('max', e.currentTarget.duration)
      })
    }
    this.mediaTarget.addEventListener('timeupdate', ()=>{
      if (!this.progressTarget.getAttribute('max')) {
        this.progressTarget.setAttribute('max', this.mediaTarget.duration)
      }
      this.progressTarget.value = this.mediaTarget.currentTime
    })
  }

  play() {
    this.mediaTarget.play()
  }

  pause() {
    this.mediaTarget.pause()
  }

  timeupdate() {

    //progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
  }

}
