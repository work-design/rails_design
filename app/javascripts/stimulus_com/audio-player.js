import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    auto: String,
    url: String,
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
    } else if (this.hasUrlValue) {
      this.doFetch(this.urlValue)
    }

    if (window.__wxjs_environment === 'miniprogram') {
      WeixinJSBridge.on('onPageStateChange', res => {
        if (res.active === 'true' || res.active === true) {
          this.stop()
        }
      })
    }
  }

  disconnect() {
    this.disconnected = true
    this.source?.stop()
  }

  stop() {
    this.source.stop()
  }

  play(event) {
    if (this.hasAutoValue) {
      this.doPlay(this.autoValue)
    } else if (this.hasUrlValue) {
      this.doPlay(this.urlValue)
    }
  }

  autoPlay() {
    this.element.querySelector(':scope > video:first-child')?.play()
  }

  async doPlay(url) {
    await this.doFetch(url, this.doStart)
  }

  async doFetch(url, callback) {
    const response = await fetch(url)
    audioContext.decodeAudioData(await response.arrayBuffer(), (decodeData) => {
      this.source = audioContext.createBufferSource()
      this.source.buffer = decodeData
      this.source.connect(audioContext.destination)
      this.source.loop = this.loopValue
      console.log(this.source)
      callback(this)
    })
  }

  doStart(that = this) {
    console.debug('---------------', that)
    if (!that.disconnected) {
      that.source.start()
    }

    if (that.linkValue) {
      that.source.addEventListener('ended', e => {
        Turbo.visit(that.linkValue)
      })
    } else if (that.nextValue) {
      that.source.that = that
      that.source.addEventListener('ended', that.goPlayNext)
    }
  }

  playNext(event) {
    let ele = event.currentTarget
    const controller = event.target.closest('[data-controller~=audio-player]').getController('audio-player')
    controller.playAnd(ele)
  }

  playAnd(ele) {
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
        } else if (nextEle.getController('audio-player')) {
          nextEle.getController('audio-player').doStart()
        } else {
          nextEle.querySelectorAll('video, audio').forEach(nextVideo => {
            nextVideo.play()
          })
        }
      })
    }
  }

  goPlayNext(event) {
    const tar = event.currentTarget
    tar.that.playAnd(tar.that.element)
  }

}
