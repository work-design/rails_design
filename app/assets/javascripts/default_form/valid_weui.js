import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  validForm() {
    const node = this.parentNode.parentNode
    node.classList.add('weui-cell_warn')
    node.insertAdjacentHTML('beforeend', '<i class="weui-icon-warn"></i>')
  }

  clearValid () {
    const node = this.parentNode
    node.parentNode.classList.remove('weui-cell_warn')
    node.nextElementSibling.remove()
  }

}
