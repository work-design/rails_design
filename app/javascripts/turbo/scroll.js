window.addEventListener('turbo:click', event => {
  if (event.target.dataset.turboScroll === 'true') {
    sessionStorage.setItem('scrollTop', document.scrollingElement.scrollTop)
  } else if (!isNaN(event.target.dataset.turboScroll)) {
    sessionStorage.setItem('scrollTop', event.target.dataset.turboScroll)
  }
})

window.addEventListener('turbo:submit-start', event => {
  if (event.target.dataset.turboScroll === 'true') {
    if (event.target.dataset.turboScrollContainer) {
      sessionStorage.setItem('scrollContainer', event.target.dataset.turboScrollContainer)
      const ele = document.getElementById(event.target.dataset.turboScrollContainer)
      sessionStorage.setItem('scrollTop', ele.scrollTop)
    } else {
      sessionStorage.setItem('scrollTop', document.scrollingElement.scrollTop)
    }
  } else if (!isNaN(event.target.dataset.turboScroll)) {
    sessionStorage.setItem('scrollTop', event.target.dataset.turboScroll)
  }
})

window.addEventListener('turbo:render', event => {
  if (sessionStorage.getItem('scrollTop')) {
    if (sessionStorage.getItem('scrollContainer')) {
      const ele = document.getElementById(sessionStorage.getItem('scrollContainer'))
      ele.scrollTo(0, sessionStorage.getItem('scrollTop'))
      sessionStorage.removeItem('scrollContainer')
    } else {
      document.scrollingElement.scrollTo(0, sessionStorage.getItem('scrollTop'))
    }

    Turbo.navigator.currentVisit.scrolled = true
    sessionStorage.removeItem('scrollTop')
  }
})
