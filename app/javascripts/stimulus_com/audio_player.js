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
      this.doPlay
    }
    this.element.querySelector(':scope > video:first-child')?.play()
  }

  stop() {
    this.source.stop()
  }

  play(event) {
    this.doPlay()
  }

  async doPlay(url = this.autoValue) {
    this.source = audioContext.createBufferSource()
    const response = await fetch(url)
    this.source.buffer = await audioContext.decodeAudioData(await response.arrayBuffer())
    this.source.connect(audioContext.destination)
    this.source.loop = this.loopValue
    console.log(this.source)
    this.source.start()

    if (this.linkValue) {
      this.source.addEventListener('ended', e => {
        Turbo.visit(nextEle.dataset.link)
      })
    } else if (this.nextValue) {
      this.source.nextEle = nextEle
      this.source.addEventListener('ended', callback)
    }
  }

}
