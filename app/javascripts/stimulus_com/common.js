import BaseController from '../base_controller'

export default class extends BaseController {
  static values = {
    url: String,
    body: String,
    params: Object
  }

  cancel(event) {
    event.preventDefault()
    Turbo.visit(location.href, { action: 'replace' })
  }

  link() {
    this.post(this.urlValue, this.bodyValue)
  }

  streamPost(event) {
    this.post(this.urlValue, this.bodyValue)
  }

  stream(event) {
    const ele = event.currentTarget
    let search_url
    if (ele.dataset.url) {
      search_url = new URL(ele.dataset.url, location.origin)
    } else {
      search_url = new URL(this.urlValue, location.origin)
    }

    if (ele.value) {
      search_url.searchParams.set('node_id', ele.value)
    }
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
