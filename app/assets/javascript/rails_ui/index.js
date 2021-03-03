import '../stimulus_com'

import { Turbo, cable } from '@hotwired/turbo-rails'
window.Turbo = Turbo

document.addEventListener('turbo:before-fetch-request', event => {
  let xhr = event.detail.fetchOptions
  xhr.headers['Utc-Offset'] = (new Date).getTimezoneOffset()
  //xhr.headers['X-Csp-Nonce'] = Rails.cspNonce()
})

document.addEventListener('turbo:before-cache', event => {
  let modal = document.getElementById('modal')
  if (modal) {
    modal.removeAttribute('src')
  }
})

document.addEventListener('turbo:before-stream-render', event => {
  let target = event.target
  if (target.action === 'after') {
    target.targetElement.parentNode.insertBefore(target.templateContent, target.targetElement.nextSibling)
  } else {
    console.log(target.action)
  }
})
