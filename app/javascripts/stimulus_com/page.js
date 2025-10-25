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
          this.#appendPage(entry.target)
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

  #appendPage(entry) {
    if (entry.dataset.page === entry.dataset.total) {
      return
    }

    const url = new URL(this.urlValue, location.origin)
    const href = new URL(location.href)
    const nextPage = (Number(entry.dataset.page) || 1) + 1
    url.searchParams.set('page', nextPage)
    if (href.searchParams.get('per')) {
      url.searchParams.set('per', href.searchParams.get('per'))
    }

    entry.children[0].innerText = '加载中'
    this.get(url)
  }

}
