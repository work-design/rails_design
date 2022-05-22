import { Controller } from '@hotwired/stimulus'

// data-controller="modal"
export default class extends Controller {
  static targets = ['background']
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
    sessionStorage.removeItem('scrollTop')
    this.urlsValue = this.urlsValue.slice(0, this.urlsValue.length - 1)
    const url = this.urlsValue.pop()
    if (url) {
      this.urlsValue = this.urlsValue.slice(0, this.urlsValue.length - 1)
      this.modal.src = url
    } else {
      this.modal.removeAttribute('src')
    }
  }

  // 关闭前检查下有没有未提交的表单
  closeCheck() {

  }

  reloadClose() {
    this.removeClass()
    Turbo.visit(location.href, { action: 'replace' })
  }

  disconnect() {
    this.observer.disconnect()
    delete this.observer
  }

  // NOTICE: here this becomes observer
  loaded(list, observer) {
    const item = list[0]
    const ele = item.target.parentNode.parentNode
    const con = application.getControllerForElementAndIdentifier(ele, 'modal')
    switch(item.type) {
      case 'childList':
        if (typeof item.target.src === 'undefined' || item.target.src === null) {
          break
        }
        ele.classList.add('is-active')
        con.backgroundTarget.classList.replace('has-background-white', 'modal-background')
        document.documentElement.classList.add('is-clipped')
        if (con.urlsValue.length > 0 && !con.hasRedirectValue) {
          con.redirectValue = item.target.src
          con.addEvent()
        }
        if (con.urlsValue[con.urlsValue.length - 1] !== item.target.src) {
          con.urlsValue = con.urlsValue.concat(item.target.src)
        }
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
    const xhr = event.detail.fetchOptions
    const ele = document.getElementById('modal').parentNode.parentNode
    const con = ele.controller('modal')
    console.debug('add redirect headers')
    xhr.headers['Redirect'] = con.redirectValue
  }

  removeClass() {
    this.element.classList.remove('is-active')
    this.backgroundTarget.classList.replace('modal-background', 'has-background-white')
    document.documentElement.classList.remove('is-clipped')
  }

  get modal() {
    return document.getElementById('modal')
  }

}
