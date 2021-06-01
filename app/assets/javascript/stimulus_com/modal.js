import { Controller } from 'stimulus'

// data-controller="modal"
class ModalController extends Controller {
  static values = {
    url: String
  }

  connect() {
    console.debug(this.identifier, 'connected!')
    console.debug('modal refer:', document.referrer)
    this.observer = new MutationObserver(this.loaded)
    this.observer.observe(this.modal, { attributeFilter: ['src'], attributeOldValue: true })
  }

  close() {
    this.element.classList.remove('is-active')
    document.documentElement.classList.remove('is-clipped')
    if (this.hasUrlValue) {
      this.modal.delegate.visit(this.urlValue)
      this.modal.src = this.urlValue
    } else {
      this.modal.removeAttribute('src')
    }
  }

  disconnect() {
    console.debug(this.identifier, 'disconnected!')
    this.observer.disconnect()
    delete this.observer
  }

  // NOTICE: here this becomes observer
  loaded(list, observer) {
    list.forEach(item => {
      switch(item.type) {
        case 'attributes':
          if (typeof item.target.src === 'undefined' || item.target.src === null) {
            break
          }
          let ele = item.target.parentNode.parentNode
          ele.classList.add('is-active')
          if (item.oldValue) {
            ele.dataset.modalUrlValue = item.oldValue
          }
      }
    })
  }

  get modal() {
    return document.getElementById('modal')
  }

}

application.register('modal', ModalController)
