import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    auto: String,
    link: String,
    loop: { type: Boolean, default: false },
    next: { type: Boolean, default: true }
  }

  initialize() {
    window.audioContext ||= new AudioContext
  }

  connect() {
    if (this.hasAutoValue) {
      this.doPlay(this.autoValue)
    }
    this.element.querySelector(':scope > video:first-child')?.play()
  }

  disconnect() {
    this.source?.stop()
  }

  stop() {
    this.source.stop()
  }

  play(event) {
    this.doPlay(this.autoValue)
  }

  async doPlay(url) {
    this.source = audioContext.createBufferSource()
    const response = await fetch(url)
    this.source.buffer = await audioContext.decodeAudioData(await response.arrayBuffer())
    this.source.connect(audioContext.destination)
    this.source.loop = this.loopValue
    console.log(this.source)
    this.source.start()

    if (this.linkValue) {
      this.source.addEventListener('ended', e => {
        Turbo.visit(this.linkValue)
      })
    } else if (this.nextValue) {
      this.source.nextEle = this.element
      this.source.addEventListener('ended', this.playNext)
    }
  }

  playNext(event) {
    const that = event.currentTarget
    let ele = that.nextEle
    if (ele) {
      let nextEle = ele.nextElementSibling

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
        nextEle.dataset.add('controller', 'audio-player')
      }
    }
  }

}
