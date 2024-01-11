import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  disconnect() {
    if (['VIDEO', 'AUDIO'].includes(this.element.tagName)) {
      this.element.remove()
    } else {
      this.element.querySelectorAll('audio, video').forEach(el => el.remove())
    }
  }

  enableLink(event) {
    const ele = event.currentTarget.closest('a[disabled=disabled]')
    if (ele) {
      ele.removeAttribute('disabled')
    }
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

  linkNext(e) {

  }

}
