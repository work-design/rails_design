window.addEventListener('turbo:click', event => {
  if (event.target.dataset.turboScroll === 'true') {
    sessionStorage.setItem('scrollTop', document.scrollingElement.scrollTop)
  } else if (!isNaN(event.target.dataset.turboScroll)) {
    sessionStorage.setItem('scrollTop', event.target.dataset.turboScroll)
  }
})

window.addEventListener('turbo:submit-start', event => {
  if (event.target.dataset.turboScroll === 'true') {
    sessionStorage.setItem('scrollTop', document.scrollingElement.scrollTop)
  } else if (!isNaN(event.target.dataset.turboScroll)) {
    sessionStorage.setItem('scrollTop', event.target.dataset.turboScroll)
  }
})

window.addEventListener('turbo:render', event => {
  if (sessionStorage.getItem('scrollTop')) {
    document.scrollingElement.scrollTo(0, sessionStorage.getItem('scrollTop'))
    Turbo.navigator.currentVisit.scrolled = true
  }

  sessionStorage.removeItem('scrollTop')
})
