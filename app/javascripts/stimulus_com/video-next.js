import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
  }

  disconnect() {
    this.element.querySelectorAll('audio, video').forEach(el => el.remove())
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
      nextEle.querySelectorAll('audio, video').forEach(el => el.play())
    }
  }

}
