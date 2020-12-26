export function timeForLocalized() {
  document.querySelectorAll('time:not([data-localized="true"])').forEach(el => {
    if (el.textContent.length > 0) {
      let format = el.dataset['format'] || 'YYYY-MM-DD HH:mm'
      el.textContent = moment.utc(el.textContent).local().format(format)
      el.dataset['localized'] = 'true'
    }
  })
}

export function prepareFormFilter() {
  document.querySelectorAll('form[method="get"]').forEach(el => {
    el.addEventListener('submit', event => {
      event.preventDefault()
      let url = new URL(location)
      let form = new FormData(event.target)

      for (let el of form.entries()) {
        if (el[1].length > 0) {
          url.searchParams.set(el[0], el[1])
        }
      }

      Turbo.visit(url.href)
    })
  })
}
