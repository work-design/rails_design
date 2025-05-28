import BaseController from '../base_controller'

export default class extends BaseController {
  static values = {
    body: String
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

  streamFormPost() {
    const dom = document.getElementById(this.bodyValue)
    if (dom) {
      const body = {}
      body[dom.name] = dom.value
      this.post(this.urlValue, JSON.stringify(body))
    }
  }

  stream(event) {
    const ele = event.currentTarget
    this.inputGet(ele)
  }

  postInput(event) {
    const ele = event.currentTarget
    this.inputPost(ele)
  }

  // turbo:submit-start@window->common#submit
  submit(event) {
    const form = event.detail.formSubmission
    form.mustRedirect = false  // 可以让 turbo 渲染 html 的内容
  }

}
