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

  stop() {

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
      nextEle.querySelectorAll('[data-url]').forEach(el => {
        this.playAudio(el.dataset.url, this.playNextA, nextEle, false)
      })
    }
  }

  playNextA(event) {
    const that = event.currentTarget
    let ele = that.nextEle
    let nextEle = ele.nextElementSibling
    const con = ele.closest('[data-controller~=video]').controller('video')

    while (true) {
      if (nextEle && nextEle.style.display === 'none') {
        break
      }

      ele = ele.parentElement
      if (!ele) {
        break
      }

      nextEle = ele.nextElementSibling
    }

    ele.style.display = 'none'
    nextEle.style.removeProperty('display')
    if (['VIDEO', 'AUDIO'].includes(nextEle.tagName)) {
      nextEle.play()
    } else {
      nextEle.querySelector('video, audio')?.play()
      nextEle.querySelectorAll('[data-url]').forEach(el => {
        con.playAudio(el.dataset.url, con.playNextA, nextEle, false)
      })
    }
  }

  linkNext(e) {

  }

}
