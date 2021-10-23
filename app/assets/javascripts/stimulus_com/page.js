import TouchController from './touch'

export default class extends TouchController {

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
    if (offset.y < 0 && wrap.scrollHeight === wrap.clientHeight + wrap.scrollTop) {
      const url = new URL(location.href)
      const currentPage = Number(url.searchParams.get('pages')) || 1
      url.searchParams.set('page', currentPage + 1)
      Turbo.visit(url)
    }
  }

}
