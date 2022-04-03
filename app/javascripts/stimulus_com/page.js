import TouchController from './touch'

export default class extends TouchController {
  static targets = ['paging', 'loading', 'tip']

  connect() {
    this.element.addEventListener('touchstart', event => {
      this.start(event)
    }, { passive: true })
  }

  start(event) {
    this.initStatus(event)
  }

  move(event) {
    const offset = this.offset(event)
    if (offset.y < 0 && this.arriveBottom() && this.currentPage < this.totalPage) {
      this.loadingTarget.style.display = 'flex'
      this.appendPage()
    } else {
      console.log('未触发翻页')
    }
  }

  arriveBottom() {
    const wrap = this.element.parentNode.parentNode
    const toBottom = wrap.scrollHeight - (wrap.clientHeight + wrap.scrollTop)
    console.debug('to bottom', toBottom)
    if (this.hasTipTarget) {
      return toBottom < this.tipTarget.clientHeight
    } else {
      return false
    }
  }

  appendPage() {
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
