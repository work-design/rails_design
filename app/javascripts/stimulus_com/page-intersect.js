import BaseController from '../base_controller'

export default class extends BaseController {
  static targets = ['sentinel']
  static values = {
    url: String
  }

  initialize() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.#appendPage()
        }
      }, { root: this.element })
    })
  }

  sentinelTargetConnected(target) {
    this.observer.observe(target)
  }

  disconnect() {
    this.observer.disconnect()
  }

  #appendPage() {
    const url = new URL(this.urlValue, location.origin)
    this.currentPage = this.currentPage + 1
    url.searchParams.set('page', this.currentPage)

    this.get(url)
  }

  get currentPage() {
    return Number(this.sentinelTarget.dataset.page) || 1
  }

  set currentPage(value) {
    this.sentinelTarget.dataset.page = value
  }

  get totalPage() {
    return Number(this.sentinelTarget.dataset.total) || 1
  }

}
