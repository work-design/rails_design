import * as Turbo from '@hotwired/turbo'
window.Turbo = Turbo
import { prepareFormFilter } from './footer'

document.addEventListener('DOMContentLoaded', () => {
  prepareFormFilter()
})
document.addEventListener('turbo:load', () => {
  prepareFormFilter()
})

document.addEventListener('turbo:before-fetch-request', event => {
  let xhr = event.detail.fetchOptions
  xhr.headers['Utc-Offset'] = (new Date).getTimezoneOffset()
  //xhr.headers['X-Csp-Nonce'] = Rails.cspNonce()
})
