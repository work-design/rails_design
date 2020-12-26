import { Controller } from 'stimulus'

// data-controller="input"
class InputController extends Controller {

  connect() {
    console.debug('Input Controller works!')

    let label = this.element.querySelector('label')
    if (label) {
      label.addEventListener('click', () => {
        let input = this.element.querySelector('input')
        input.click()
      })
    }
  }

  submit(event) {
    let el = event.currentTarget
    let str

    if (el.defaultValue === '') {
      str = el.name + '=' + el.checked
    } else if (el.nodeName === 'SELECT') {
      str = el.name + '=' + el.value
    } else {
      str = el.name + '=' + el.defaultValue
    }

    if (el.dataset['params']) {
      el.dataset['params'] += '&'
    } else {
      el.dataset['params'] = ''
    }
    el.dataset['params'] += str
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
