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
