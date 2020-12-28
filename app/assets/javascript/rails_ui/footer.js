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
