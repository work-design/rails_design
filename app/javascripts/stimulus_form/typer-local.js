import BaseController from '../base_controller'

// data-controller="typer-local"
export default class extends BaseController {
  static targets = [
    'input',
    'value',
    'content',
    'container'
  ]
  static values = {
    url: String
  }

  connect() {
    const ele = this.inputTarget

    this.containerTarget.style.minWidth = `${ele.clientWidth}px`
    this.containerTarget.classList.add('display-none')

    ele.addEventListener('focus', () => {
      this.containerTarget.classList.remove('display-none')
    })
    this.contentTargets.forEach(el => {
      el.parentNode.addEventListener('click', this.choose)
    })
    ele.addEventListener('blur', this.hideContainer)
    this.containerTarget.addEventListener('mouseenter', () => {
      ele.removeEventListener('blur', this.hideContainer)
      this.containerTarget.addEventListener('mouseleave', () => {
        ele.addEventListener('blur', this.hideContainer)
      })
    })
    ele.addEventListener('input', this.search)
    ele.addEventListener('compositionstart', event => {
      event.target.removeEventListener('input', this.search)
    })
    ele.addEventListener('compositionend', event => {
      event.target.addEventListener('input', this.search)
      this.conSearch(ele)
    })
  }

  // NOTICE  here this becomes ele, who call addEventListener
  search() {
    const con = this.closest('[data-controller~=typer-local]').getController('typer-local')

    if (con.hasValueTarget) {
      con.valueTarget.removeAttribute('value')
      if (this.value) {
        con.doSearch(this.value)
      } else {
        con.clear()
      }
    }
  }

  conSearch(ele) {
    this.valueTarget.removeAttribute('value')
    if (ele.value) {
      this.doSearch(ele.value)
    } else {
      this.clear()
    }
  }

  doSearch(value) {
    this.containerTarget.classList.remove('display-none')
    this.contentTargets.forEach(el => {
      const pel = el.parentNode
      if (pel.dataset.name.startsWith(value)) {
        pel.classList.remove('display-none')
        el.innerHTML = el.parentNode.dataset.name.replace(new RegExp(value, 'gi'), '<span class="text-warning">$&</span>')
      } else {
        pel.classList.add('display-none')
      }
    })
  }

  clear() {
    this.containerTarget.classList.remove('display-none')
    this.contentTargets.forEach(el => {
      el.parentNode.classList.remove('display-none')
      el.innerHTML = el.parentNode.dataset.name
    })
  }

  hideContainer() {
    const con = this.closest('[data-controller~=typer-local]').getController('typer-local')
    con.containerTarget.classList.add('display-none')
  }

  // click->typer-local#choose
  choose(event) {
    const ele = event.currentTarget
    const con = this.closest('[data-controller~=typer-local]').getController('typer-local')

    window.xxx = con
    con.valueTarget.value = ele.dataset['id']
    con.valueTarget.dispatchEvent(new Event('change')) // 触发事件
    con.inputTarget.value = ele.dataset['name']
    con.containerTarget.classList.add('display-none')
  }

}
