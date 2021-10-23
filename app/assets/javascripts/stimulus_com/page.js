import TouchController from './touch'

export default class extends TouchController {
  static targets = ['paging']

  connect() {
    this.element.addEventListener('touchstart', event => {
      this.start(event)
    }, { passive: true })
  }

  start(event) {
    this.initStatus(event)
  }

  end(event) {
    const offset = this.offset(event)
    const wrap = this.element.parentNode.parentNode
    if (offset.y < 0 && wrap.scrollHeight === wrap.clientHeight + wrap.scrollTop && this.currentPage < this.totalPage) {
      const url = new URL(location.href)
      this.currentPage = this.currentPage + 1
      url.searchParams.set('page', this.currentPage)

      fetch(url, {
        headers: {
          Accept: 'text/vnd.turbo-stream.html'
        }
      }).then(response => {
        return response.text()
      }).then(body => {
        Turbo.renderStreamMessage(body)
      })
    }
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
