window.addEventListener('turbo:click', event => {
  if (event.target.dataset.turboScroll === 'true') {
    sessionStorage.setItem('scrollTop', document.scrollingElement.scrollTop)
  } else if (!isNaN(event.target.dataset.turboScroll)) {
    sessionStorage.setItem('scrollTop', event.target.dataset.turboScroll)
  }
})

window.addEventListener('turbo:submit-start', event => {
  if (event.target.dataset.turboScroll === 'true') {
    if (event.target.dataset.turboScrollItem) {
      const ele = document.getElementById(event.target.dataset.turboScrollItem)
      sessionStorage.setItem('scrollTopItem', event.target.dataset.turboScrollItem)
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
    if (sessionStorage.getItem('scrollTopItem')) {
      const ele = document.getElementById(sessionStorage.getItem('scrollTopItem'))
      ele.scrollTo(0, sessionStorage.getItem('scrollTop'))
    } else {
      document.scrollingElement.scrollTo(0, sessionStorage.getItem('scrollTop'))
    }

    Turbo.navigator.currentVisit.scrolled = true
  }

  sessionStorage.removeItem('scrollTop')
  sessionStorage.removeItem('scrollTopItem')
})
