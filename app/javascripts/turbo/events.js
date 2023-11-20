document.addEventListener('turbo:before-fetch-request', event => {
  const xhr = event.detail.fetchOptions
  xhr.headers['Timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone
  //xhr.headers['X-Csp-Nonce'] = Rails.cspNonce()
})

document.addEventListener('turbo:before-cache', event => {
  const modal = document.getElementById('modal')
  if (modal) {
    modal.removeAttribute('src')
  }
})

document.addEventListener('turbo:frame-render', event => {
  event.detail.fetchResponse.responseHTML.then(body => {
    const container = new DOMParser().parseFromString(body, 'text/html')
    const title = container.querySelector('turbo-frame')?.dataset?.title
    const titleEle = document.getElementById('modal_title')
    if (titleEle && title) {
      titleEle.innerText = title
    } else if (titleEle) {
      titleEle.innerText = ''
    }
  })
})
