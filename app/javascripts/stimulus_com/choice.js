import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['template', 'tag', 'list']

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
    tag.dataset.id = ele.dataset.id
    this.tagTarget.parentNode.prepend(tag)

    ele.classList.add('display-none')
  }

  toggle() {
    this.listTarget.classList.toggle('display-none')
  }

  restore(e) {
    const ele = e.currentTarget.parentNode
    const tar = this.listTarget.querySelector((`[data-id="${ele.dataset.id}"`))
    if (tar) {
      ele.remove()
      tar.classList.remove('display-none')
    }
  }

}
