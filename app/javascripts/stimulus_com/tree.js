import SvgController from '../svg_controller'

export default class extends SvgController {
  static targets = ['item']

  collapse(event) {
    const ele = event.currentTarget
    const par = this.itemTarget

    let el = par.nextElementSibling
    while (el && el.dataset['depth'] !== par.dataset['depth'] && par.dataset['depth'].endsWith(el.dataset['depth'])) {
      el.style.display = 'none'
      el = el.nextElementSibling
    }

    this.changeSvg(ele, 'caret-right')
    ele.dataset['action'] = 'click->tree#expand'
  }

  expand(event) {
    const ele = event.currentTarget
    const par = this.itemTarget

    let el = par.nextElementSibling
    while (el && el.dataset['depth'] !== par.dataset['depth'] && par.dataset['depth'].endsWith(el.dataset['depth'])) {
      el.style.display = 'table-row'
      el = el.nextElementSibling
    }

    this.changeSvg(ele, 'caret-down')
    ele.dataset['action'] = 'click->tree#collapse'
  }

}
