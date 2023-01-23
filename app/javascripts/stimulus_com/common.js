import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String,
    params: Object
  }

  cancel(event) {
    event.preventDefault()
    Turbo.visit(location.href, { action: 'replace' })
  }

  // 用于兼容 rails ujs data-method 的逻辑
  link(event) {
    event.preventDefault()
    const ele = event.currentTarget

    if (ele.dataset.method) {
      this.request(ele.href, ele.dataset.method, null, { 'X-CSRF-Token': this.csrfToken() })
    } else {
      this.get(ele.href)
    }
  }

  stream(event) {
    const ele = event.currentTarget
    const search_url = new URL(this.urlValue, location.origin)
    search_url.searchParams.set('node_id', ele.value)
    Object.keys(this.paramsValue).forEach(k => {
      search_url.searchParams.set(k, this.paramsValue[k])
    })

    this.get(search_url)
  }

  // turbo:submit-start@window->common#submit
  submit(event) {
    const form = event.detail.formSubmission
    form.mustRedirect = false  // 可以让 turbo 渲染 html 的内容
  }

}
