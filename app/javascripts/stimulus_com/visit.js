import { Controller } from '@hotwired/stimulus'

// data-controller="visit"
export default class extends Controller {
  static values = {
    url: String,
    frame: String,
    reload: Boolean,
    method: String,
    params: Object,
    headers: Object
  }

  connect() {
    if (this.hasFrameValue) {
      this.visit()
    } else if (this.hasMethodValue && this.methodValue.toUpperCase() !== 'GET') {
      this.request(this.urlValue, this.methodValue, JSON.stringify(this.paramsValue))
    }else {
      this.addEvent(this.headersValue)
      this.topVisit()
    }

    if (this.hasReloadValue && this.reloadValue) {
      this.replaceAction()
    }

    document.documentElement.classList.remove('is-clipped')
    this.element.remove()
  }

  addEvent(headers) {
    document.addEventListener('turbo:before-fetch-request', event => {
      const xhr = event.detail.fetchOptions
      Object.assign(xhr.headers, headers)
    }, { once: true })
  }

  topVisit() {
    if (this.hasUrlValue) {
      Turbo.visit(this.urlValue, { action: 'replace' })
    } else {
      Turbo.visit(location.href, { action: 'replace' })
    }
  }

  visit() {
    this.modal.visit(this.urlValue)
  }

  replaceAction() {
    this.modalWrapper.querySelectorAll('[data-action$="modal#close"]').forEach(ele => {
      ele.dataset.replace('action', 'modal#close', 'modal#reloadClose')
    })
  }

  get modal() {
    return document.getElementById(this.frameValue).delegate
  }

  get modalWrapper() {
    return document.getElementById('modal_wrapper')
  }

}
