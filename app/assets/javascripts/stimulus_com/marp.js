import { Controller } from '@hotwired/stimulus'
import { Marp } from '@marp-team/marp-core'
import hljs from 'highlight.js'

export default class extends Controller {
  static targets = ['container']

  connect() {
    this.link()
  }

  link() {
    fetch(location.href, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }).then(response => {
      return response.json()
    }).then(body => {
      const { html, css, comments } = this.marp.render(body.results.markdown, { htmlAsArray: true })
      this.installCss(css)
      this.slides = html
      this.comments = comments
      this.containerTarget.innerHTML = this.slides[0]
    })
  }

  prev() {
    const page = this.currentPage - 2
    if (page < 0) {
      return
    }
    this.containerTarget.innerHTML = this.slides[page]
    console.log(this.comments[page])
    this.containerTarget.querySelectorAll('code').forEach(el => {
      hljs.highlightElement(el)
    })
  }

  next() {
    const page = this.currentPage
    if (page >= this.slides.length) {
      return
    }
    this.containerTarget.innerHTML = this.slides[page]
    console.log(this.comments[page])
    this.containerTarget.querySelectorAll('code').forEach(el => {
      hljs.highlightElement(el)
    })
  }

  keyboard(e) {
    switch(e.which) {
      case 37: // left
        return this.prev()
      case 39: // right
        return this.next()
      default: return
    }
  }

  installCss(css) {
    const element = document.createElement('style')
    element.type = 'text/css'
    element.id = 'marp_style'
    element.textContent = css
    document.head.insertBefore(element, document.head.lastChild)
  }

  set slides(arr) {
    this.slices = arr
  }

  get slides() {
    return this.slices
  }

  get script() {
    const content = this.slices[this.slices.length - 1]
    const doc = this.parser.parseFromString(content, 'text/html')
    return doc.querySelector('script')
  }

  get currentPage() {
    return this.containerTarget.querySelector('section').dataset.marpitPagination
  }

  get parser() {
    return new DOMParser
  }

  get marp() {
    return new Marp({
      markdown: {
        html: true,
        breaks: true
      }
    })
  }

}
