import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['input', 'label']

  connect() {
    if (this.hasInputTarget && this.inputTarget.value.length > 0) {
      this.focus()
    }
  }

  focus() {
    this.element.classList.add('weui-search-bar_focusing')
    this.inputTarget.focus()
  }

  doSearch(element) {
    let ele = element.currentTarget
    if (ele.value.length) {

    }
  }

  clear() {
    Turbo.visit(location.pathname, { action: 'replace' })
    this.inputTarget.value = ''
    this.inputTarget.focus()
  }

  cancel() {
    Turbo.visit(location.pathname, { action: 'replace' })
    this.element.classList.remove('weui-search-bar_focusing')
    this.inputTarget.blur()
  }

}
