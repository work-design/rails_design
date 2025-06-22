import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['template', 'tag']

  connect() {
  }

  select(e) {
    const ele = e.currentTarget
    const cloned = this.templateTarget.cloneNode(true)
    cloned.removeAttribute('data-choice-target')
    cloned.value = ele.dataset.id
    this.element.prepend(cloned)

    const tag = this.tagTarget.cloneNode(true)
    tag.removeAttribute('data-choice-target')
    tag.classList.remove('display-none')
    tag.children[0].innerText = ele.dataset.title
    this.tagTarget.parentNode.prepend(tag)

    ele.remove()
  }

}
