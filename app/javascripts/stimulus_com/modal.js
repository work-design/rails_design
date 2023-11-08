import { Controller } from '@hotwired/stimulus'

// data-controller="modal"
export default class extends Controller {
  static targets = ['background']
  static values = {
    urls: Array,
    redirect: String
  }

  connect() {
    this.addClass()
  }

  close() {
    this.element.remove()
  }

  disconnect() {
    document.documentElement.classList.remove('is-clipped')
  }

  xclose() {
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

  addClass() {
    this.element.classList.add('is-active')
    this.backgroundTarget.classList.replace('has-background-white', 'modal-background')
    document.documentElement.classList.add('is-clipped')
  }

  loaded() {
    const item = list[0]
    const ele = item.target.parentNode.parentNode
    const con = application.getControllerForElementAndIdentifier(ele, 'modal')
    switch(item.type) {
      case 'childList':
        if (typeof item.target.src === 'undefined' || item.target.src === null) {
          break
        }

        if (con.urlsValue.length > 0 && !con.hasRedirectValue) {
          con.redirectValue = item.target.src
          con.addEvent()
        }
        if (con.urlsValue[con.urlsValue.length - 1] !== item.target.src) {
          con.urlsValue = con.urlsValue.concat(item.target.src)
        }
    }
  }

  get modal() {
    return document.getElementById('modal')
  }

}
