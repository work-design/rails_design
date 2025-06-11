import BaseController from '../base_controller'

export default class extends BaseController {
  static targets = ['sentinel', 'paging']
  static values = {
    url: String
  }

  connect() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.debug('ddd', entry)
        }
      }, { root: this.element })
    })
    this.observer.observe(this.sentinelTarget)
  }

  disconnect() {
    this.observer.disconnect()
  }

  #appendPage() {
    const url = new URL(this.urlValue)
    this.currentPage = this.currentPage + 1
    url.searchParams.set('page', this.currentPage)

    this.get(url)
  }

  get currentPage() {
    return Number(this.pagingTarget.dataset.page) || 1
  }

  set currentPage(value) {
    this.pagingTarget.dataset.page = value
  }

  get totalPage() {
    return Number(this.pagingTarget.dataset.total) || 1
  }

}
