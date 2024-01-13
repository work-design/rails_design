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
    if (['VIDEO', 'AUDIO'].includes(this.element.tagName)) {
      this.element.remove()
    } else {
      this.element.querySelectorAll('audio, video').forEach(el => el.remove())
    }
    this.source?.stop()
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

    console.debug('first', nextEle)

    while (true) {
      if (nextEle && nextEle.style.display === 'none') {
        break
      }

      ele = ele.parentElement
      if (!ele) {
        break
      }

      nextEle = ele.nextElementSibling

      console.debug('ele', ele)
      console.debug('next', nextEle)
    }

    ele.style.display = 'none'
    nextEle.style.removeProperty('display')
    if (['VIDEO', 'AUDIO'].includes(nextEle.tagName)) {
      nextEle.play()
    } else {
      nextEle.querySelector('video, audio')?.play()
      console.debug('ddddddd')
      nextEle.querySelectorAll('[data-url]').forEach(el => {
        console.debug('ddddd', el)
        this.playAudio(el.dataset.url, this.playNext)
      })
    }
  }

  linkNext(e) {

  }

}
