import * as Turbo from '@hotwired/turbo'
window.Turbo = Turbo
import { timeForLocalized, prepareFormFilter } from './footer'

document.addEventListener('DOMContentLoaded', () => {
  timeForLocalized()
  prepareFormFilter()
})
document.addEventListener('turbo:load', () => {
  timeForLocalized()
  prepareFormFilter()
})
document.addEventListener('turbo:visit', () => {
  timeForLocalized()
})
document.addEventListener('turbo:before-fetch-request', event => {
  let xhr = event.detail.fetchOptions
  xhr.headers['Utc-Offset'] = (new Date).getTimezoneOffset()
  //xhr.headers['X-Csp-Nonce'] = Rails.cspNonce()
})
