import { Controller } from '@hotwired/stimulus'
import hljs from 'highlight.js'

export default class extends Controller {
  static targets = ['container']
  static values = {
    url: String
  }

  connect() {
    this.link()
  }

  link() {
    fetch(this.urlValue, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }).then(response => {
      return response.json()
    }).then(body => {
      this.installCss(body.css)
      this.slides = body.html
      this.comments = body.comments
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
    this.highlight()
  }

  next() {
    const page = this.currentPage
    if (page >= this.slides.length) {
      return
    }
    this.containerTarget.innerHTML = this.slides[page]
    console.log(this.comments[page])
    this.highlight()
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

  highlight() {
    this.containerTarget.querySelectorAll('code').forEach(el => {
      hljs.highlightElement(el)
    })
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

}
