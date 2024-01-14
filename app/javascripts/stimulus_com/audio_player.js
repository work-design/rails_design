import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    auto: String,
    loop: String
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
    this.audio = new AudioContext
    this.source = this.audio.createBufferSource()
    const response = await fetch(url)
    this.source.buffer = await this.audio.decodeAudioData(await response.arrayBuffer())
    this.source.connect(this.audio.destination)
    this.source.loop = loop
    console.log(this.source)
    this.source.start()
  }

  playAudio(nextEle, callback, loop = true) {
    try {
      if (nextEle.dataset.url) {
        this.doPlay(nextEle.dataset.url, loop)
        this.source.nextEle = nextEle
        this.source.addEventListener('ended', callback)
      }
    } catch (err) {
      console.error(`Unable to fetch the audio file. Error: ${err.message}`)
    }
  }

}
