document.addEventListener('turbo:before-fetch-request', event => {
  const xhr = event.detail.fetchOptions
  xhr.headers['Timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone
  //xhr.headers['X-Csp-Nonce'] = Rails.cspNonce()
})
