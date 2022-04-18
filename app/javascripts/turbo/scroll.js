let scrollTop = 0
window.addEventListener('turbo:click', event => {
  console.debug('turbo:click', event)
  if (event.target.hasAttribute('data-turbo-scroll')) {
    scrollTop = document.scrollingElement.scrollTop
  }
})

window.addEventListener('turbo:submit-start', event => {
  console.debug('turbo:submit-start', event)
  if (event.target.hasAttribute('data-turbo-scroll')) {
    scrollTop = document.scrollingElement.scrollTop
  }
})

window.addEventListener('turbo:render', event => {
  if (scrollTop) {
    document.scrollingElement.scrollTo(0, scrollTop)
    Turbo.navigator.currentVisit.scrolled = true
  }

  scrollTop = 0
  console.debug('turbo:render', event)
})
