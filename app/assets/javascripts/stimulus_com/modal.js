import { Controller } from 'stimulus'

// data-controller="modal"
export default class extends Controller {
  static values = {
    urls: Array,
    redirect: String
  }

  connect() {
    console.debug('modal refer:', document.referrer)
    this.observer = new MutationObserver(this.loaded)
    this.observer.observe(this.modal, { childList: true })
  }

  close() {
    this.removeClass()
    this.urlsValue = this.urlsValue.slice(0, this.urlsValue.length - 1)
    let url = this.urlsValue.pop()
    if (url) {
      this.urlsValue = this.urlsValue.slice(0, this.urlsValue.length - 1)
      this.modal.src = url
    } else {
      this.modal.removeAttribute('src')
    }
  }

  reloadClose() {
    this.removeClass()
    Turbo.visit(location.href, { action: 'replace' })
  }

  disconnect() {
    console.debug('disconnected:', this.identifier)
    this.observer.disconnect()
    delete this.observer
  }

  // NOTICE: here this becomes observer
  loaded(list, observer) {
    let item = list[0]
    let ele = item.target.parentNode.parentNode
    let con = application.getControllerForElementAndIdentifier(ele, 'modal')
    switch(item.type) {
      case 'childList':
        if (typeof item.target.src === 'undefined' || item.target.src === null) {
          break
        }
        ele.classList.add('is-active')
        document.documentElement.classList.add('is-clipped')
        if (con.urlsValue.length > 0 && !con.hasRedirectValue) {
          con.redirectValue = item.target.src
          con.addEvent()
        }
        con.urlsValue = con.urlsValue.concat(item.target.src)
    }
  }

  addEvent() {
    document.addEventListener('turbo:before-fetch-request', this.addHeader)
  }

  removeEvent() {
    document.removeEventListener('turbo:before-fetch-request', this.addHeader)
  }

  // NOTICE: here this become document
  addHeader(event) {
    let xhr = event.detail.fetchOptions
    let ele = document.getElementById('modal').parentNode.parentNode
    let con = application.getControllerForElementAndIdentifier(ele, 'modal')
    console.debug('add redirect headers')
    xhr.headers['Redirect'] = con.redirectValue
  }

  removeClass() {
    this.element.classList.remove('is-active')
    document.documentElement.classList.remove('is-clipped')
  }

  get modal() {
    return document.getElementById('modal')
  }

}
