import BaseController from '../base_controller'

// data-controller="visit"
export default class extends BaseController {
  static values = {
    url: String,
    frame: String,
    reload: Boolean,
    method: String,
    params: Object,
    later: Number,
    modal: String,
    headers: { type: Object, default: {} }
  }

  connect() {
    if (this.hasFrameValue) {
      this.visit()
    } else if (this.hasMethodValue && this.methodValue && this.methodValue.toUpperCase() !== 'GET') {
      this.request(
        this.urlValue,
        this.methodValue,
        JSON.stringify(this.paramsValue),
        { 'Content-Type': 'application/json', 'X-CSRF-Token': this.csrfToken(), ...this.headersValue }
      )
    } else if (this.hasLaterValue) {
      this.timerId = setTimeout(() => {
        console.debug('Later visit:', this.timerId)
        this.laterVisit()
      }, this.laterValue * 1000)
      this.topVisit()
    } else {
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
    if (this.hasModalValue) {
      const ele = document.getElementById(this.modalValue)
      ele.remove()
    }

    if (this.hasUrlValue) {
      Turbo.visit(this.urlValue, { action: 'replace' })
    } else {
      Turbo.visit(location.href, { action: 'replace' })
    }
  }

  laterVisit() {
    if (this.timerId) {
      clearTimeout(this.timerId)
    }
    this.topVisit()
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
