import '@hotwired/turbo'
import './cable_stream_source_element'

document.addEventListener('turbo:before-fetch-request', event => {
  let xhr = event.detail.fetchOptions
  xhr.headers['Utc-Offset'] = (new Date).getTimezoneOffset()
  //xhr.headers['X-Csp-Nonce'] = Rails.cspNonce()
})

document.addEventListener('turbo:before-cache', event => {
  const modal = document.getElementById('modal')
  if (modal) {
    modal.removeAttribute('src')
  }
})

let scrollTop = 0
window.addEventListener('turbo:click', event => {
  console.debug('turbo:click', event)
  if (event.target.hasAttribute('data-turbo-scroll')) {
    scrollTop = document.scrollingElement.scrollTop
  }
})

window.addEventListener('turbo:submit-start', event => {
  console.debug('turbo:submit-start', event)
  if (event.target.hasAttribute('data-turbo-scroll')) {
    scrollTop = document.scrollingElement.scrollTop
  }
})

window.addEventListener('turbo:render', event => {
  if (scrollTop) {
    document.scrollingElement.scrollTo(0, scrollTop)
    Turbo.navigator.currentVisit.scrolled = true
  }

  scrollTop = 0
  console.debug('turbo:render', event)
})

// 当 target 为 body 的时候，则不用 getElementById 的逻辑，而是直接使用body
Object.defineProperties(customElements.get('turbo-stream').prototype, {
  targetElementsById: {
    get: function() {
      let element
      if (this.target === 'body') {
        element = this.ownerDocument.body
      } else if (this.target) {
        element = this.ownerDocument.getElementById(this.target)
      }

      if (element !== null) {
        return [ element ]
      } else {
        return []
      }
    }
  }
})
