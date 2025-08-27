import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  changeSvg(ele, name) {
    const use = ele.querySelector('use')
    const href = new URL(use.href.baseVal)
    href.hash = `#${name}`
    console.debug('-------------',href)
    use.setAttribute('href', href.toString())
  }

}