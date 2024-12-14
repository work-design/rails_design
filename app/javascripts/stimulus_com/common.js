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

  streamPost() {
    this.post(this.urlValue, this.bodyValue)
  }

  stream(event) {
    const ele = event.currentTarget
    this.inputGet(ele)
  }

  // turbo:submit-start@window->common#submit
  submit(event) {
    const form = event.detail.formSubmission
    form.mustRedirect = false  // 可以让 turbo 渲染 html 的内容
  }

}
