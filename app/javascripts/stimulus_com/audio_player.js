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
    this.autoPlay()
    if (this.hasAutoValue) {
      this.doPlay(this.autoValue)
    }
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

  async autoPlay() {
    await this.element.querySelector(':scope > video:first-child')?.play()
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
      this.source.currentEle = this.element
      this.source.addEventListener('ended', this.playNext)
    }
  }

  playNext(event) {
    const that = event.currentTarget
    let ele = that.currentEle
    if (ele) {
      let nextEle = ele.nextElementSibling

      ele.style.display = 'none'
      nextEle.style.removeProperty('display')
      nextEle.dataset.add('controller', 'audio-player')
    }
  }

}
