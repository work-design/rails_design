import { Controller } from 'stimulus'

// data-controller="input"
class InputController extends Controller {
  static targets = ['checkbox', 'submit']

  connect() {
    console.debug('Input Controller works!')
  }

  check() {
    if (this.hasCheckboxTarget) {
      this.checkboxTarget.click()
      this.submitTarget.click()
    }
  }

  submit(event) {
    let el = event.currentTarget
    el.form.submit()
  }

  uncheck(event) {

  }

  form(event) {
    let el = event.currentTarget

    Rails.fire(event.target.form, 'submit')
  }

  filter(event) {
    let ele = event.currentTarget
    if (!ele.value) {
      return
    }

    let url = ele.dataset['url']
    if (url) {
      Rails.ajax({
        url: url,
        type: 'GET',
        data: `${ele.name}=${ele.value}`,
        dataType: 'script'
      })
    } else {
      Rails.fire(ele.form, 'submit')
    }
  }

  remove() {
    this.element.remove()
  }

}

application.register('input', InputController)
