window.turboScroll = function(event) {
  if (event.target.dataset.turboScroll === 'true') {
    let ele = event.target.parentElement
    while (ele) {
      if (ele.scrollTop > 0) {
        sessionStorage.setItem('scrollTop', ele.scrollTop)
        sessionStorage.setItem('scrollContainer', ele.id)
        break
      }
      ele = ele.parentElement
    }
  }
}

window.addEventListener('turbo:click', event => {
  turboScroll(event)
})

window.addEventListener('turbo:submit-start', event => {
  turboScroll(event)
})

window.addEventListener('turbo:render', event => {
  if (sessionStorage.getItem('scrollTop')) {
    const ele = document.getElementById(sessionStorage.getItem('scrollContainer')) || document.scrollingElement
    ele.scrollTo(0, sessionStorage.getItem('scrollTop'))

    Turbo.navigator.currentVisit.scrolled = true

    sessionStorage.removeItem('scrollTop')
    sessionStorage.removeItem('scrollContainer')
  }
})
