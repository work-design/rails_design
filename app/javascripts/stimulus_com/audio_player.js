import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    auto: String,
    loop: String
  }

  initialize() {
    window.audioContext ||= new AudioContext
  }

  connect() {
    if (this.hasAutoValue) {
      this.doPlay(this.autoValue, false)
    } else if (this.hasLoopValue) {
      this.doPlay(this.loopValue)
    }
  }

  stop() {
    this.source.stop()
  }

  async doPlay(url, loop = true) {
    this.source = audioContext.createBufferSource()
    const response = await fetch(url)
    this.source.buffer = await audioContext.decodeAudioData(await response.arrayBuffer())
    this.source.connect(audioContext.destination)
    this.source.loop = loop
    console.log(this.source)
    this.source.start()
  }

  playAudio(nextEle, callback, loop = true) {
    try {
      if (nextEle.dataset.url) {
        this.doPlay(nextEle.dataset.url, loop)

        if (nextEle.dataset.link) {
          this.source.addEventListener('ended', e => {
            Turbo.visit(nextEle.dataset.link)
          })
        } else {
          this.source.nextEle = nextEle
          this.source.addEventListener('ended', callback)
        }
      }
    } catch (err) {
      console.error(`Unable to fetch the audio file. Error: ${err.message}`)
    }
  }

}
