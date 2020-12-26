import { Controller } from 'stimulus'

// data-controller="typer"
class TyperController extends Controller {
  static targets = ['input', 'value']

  connect() {
    console.debug('Typer Controller works!')
    let ele = this.inputTarget
    ele.addEventListener('input', this.form)
    ele.addEventListener('compositionstart', event => {
      event.target.removeEventListener('input', this.form)
    })
    ele.addEventListener('compositionend', event => {
      event.target.addEventListener('input', this.form)
      this.form(event)
    })
  }

  form(event) {
    let ele = event.currentTarget
    if (!ele.value) {
      return
    }

    let url = ele.dataset['url']
    let method = ele.dataset['method']
    if (url && method === 'post') {
      let body = new FormData(ele.form)
      Rails.ajax({
        url: url,
        type: 'POST',
        data: body,
        dataType: 'script'
      })
    } else if (url) {
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

  // click->typer#choose
  choose(event) {
    let ele = event.currentTarget
    this.valueTarget.value = ele.dataset['id']
    this.inputTarget.value = ele.dataset['name']
  }

}

application.register('typer', TyperController)
