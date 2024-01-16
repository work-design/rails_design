import AudioPlayerController from './audio_player'

export default class extends AudioPlayerController {

  connect() {
    if (['VIDEO', 'AUDIO'].includes(this.element.tagName) && this.element.autoplay) {
      if (this.element.played.length === 0) {
        this.element.play()
      }
    } else {
      this.element.querySelectorAll('audio[autoplay=autoplay], video[autoplay=autoplay]').forEach(el => {
        if (el.played.length === 0) {
          el.play()
        }
      })
    }
  }

  disconnect() {
    super.disconnect()
    if (['VIDEO', 'AUDIO'].includes(this.element.tagName)) {
      this.element.remove()
    } else {
      this.element.querySelectorAll('audio, video').forEach(el => el.remove())
    }
  }

  enableLink(event) {
    const ele = event.currentTarget.closest('a[disabled=disabled]')
    if (ele) {
      ele.removeAttribute('disabled')
    }
  }

  playNext(event) {
    let ele = event.currentTarget
    let nextEle = ele.nextElementSibling

    if (nextEle && nextEle.tagName === 'VIDEO') {
      ele.style.display = 'none'
      nextEle.style.removeProperty('display')
      nextEle.play()
    } else {
      ele = ele.parentElement
      nextEle = ele.nextElementSibling

      ele.style.display = 'none'
      nextEle.style.removeProperty('display')
      nextEle.dataset.add('controller', 'audio-player')
    }
  }

}
