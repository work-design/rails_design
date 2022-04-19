window.addEventListener('turbo:click', event => {
  if (event.target.hasAttribute('data-turbo-scroll')) {
    sessionStorage.setItem('scrollTop', document.scrollingElement.scrollTop)
  }
})

window.addEventListener('turbo:submit-start', event => {
  if (event.target.hasAttribute('data-turbo-scroll')) {
    sessionStorage.setItem('scrollTop', document.scrollingElement.scrollTop)
  }
})

window.addEventListener('turbo:render', event => {
  if (sessionStorage.getItem('scrollTop')) {
    document.scrollingElement.scrollTo(0, sessionStorage.getItem('scrollTop'))
    Turbo.navigator.currentVisit.scrolled = true
  }

  sessionStorage.removeItem('scrollTop')
})
