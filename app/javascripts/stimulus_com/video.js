import AudioPlayerController from './audio-player'

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

    if (ele.dataset.hidden) {
      const hiddenEles = document.querySelectorAll(ele.dataset.hidden)
      hiddenEles.forEach(el => {
        el.style.display = 'none'

        if (['VIDEO', 'AUDIO'].includes(el.tagName)) {
          el.pause()
        } else {
          el.querySelectorAll('video, audio').forEach(hideVideo => {
            hideVideo.pause()
          })
        }
      })
    }

    if (ele.dataset.next) {
      const nextEles = document.querySelectorAll(ele.dataset.next)

      nextEles.forEach(nextEle => {
        nextEle.style.removeProperty('display')

        if (['VIDEO', 'AUDIO'].includes(nextEle.tagName)) {
          nextEle.play()
        } else if (nextEle.controller('audio-player')) {
          nextEle.controller('audio-player').play()
        } else {
          nextEle.querySelectorAll('video, audio').forEach(nextVideo => {
            nextVideo.play()
          })
        }
      })
    }
  }

}
