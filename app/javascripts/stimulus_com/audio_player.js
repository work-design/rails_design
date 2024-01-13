import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  async playData(url) {
    try {
      const response = await fetch(url)
      this.source = this.audio.createBufferSource()
      this.source.buffer = await this.audio.decodeAudioData(await response.arrayBuffer())
      this.source.connect(this.audio.destination)
      this.source.loop = true
      console.log(this.source)
      this.source.start()
    } catch (err) {
      console.error(`Unable to fetch the audio file. Error: ${err.message}`)
    }
  }
}
