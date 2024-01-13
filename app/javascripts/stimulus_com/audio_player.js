import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  async playAudio(url, callback, loop = true) {
    try {
      this.audio = new AudioContext
      this.source = this.audio.createBufferSource()
      const response = await fetch(url, { mode: 'no-cors' })

      this.source.buffer = await this.audio.decodeAudioData(await response.arrayBuffer())
      this.source.connect(this.audio.destination)
      this.source.loop = loop
      console.log(this.source)
      this.source.start()

      this.source.addEventListener('ended', callback)
    } catch (err) {
      console.error(`Unable to fetch the audio file. Error: ${err.message}`)
    }
  }

}
