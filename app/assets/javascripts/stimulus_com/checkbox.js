import { Controller } from 'stimulus'

// data-controller="check"
export default class extends Controller {
  static targets = ['added', 'moved']

  applyFor(event) {
    const link = event.currentTarget
    const url = new URL(link.href)
    const added = this.addedIds()
    const moved = this.movedIds()
    if (added.length > 0) {
      url.searchParams.set('add_ids', added)
    }
    if (moved.length > 0) {
      url.searchParams.set('remove_ids', added)
    }

    link.href = url
  }

  addedIds() {
    const ids = []
    this.addedTargets.forEach(item => {
      ids.push(item.value)
    })
    return ids.join(',')
  }

  movedIds() {
    const ids = []
    this.movedTargets.forEach(item => {
      ids.push(item.value)
    })
    return ids.join(',')
  }

  // data-action="check#toggle"
  toggle(event) {
    this.doToggle(event.currentTarget)
  }

  // data-action="check#toggleAll"
  // value: 'xx'
  toggleAll(event) {
    const element = event.currentTarget
    const checkboxes = document.getElementsByName(element.value)

    for (let checkbox of checkboxes) {
      checkbox.checked = element.checked
      this.doToggle(checkbox)
    }
  }

  toggleAllName(event) {
    const element = event.currentTarget
    const checkboxes = document.querySelectorAll(`input[data-name='${element.value}']`)

    for (let checkbox of checkboxes) {
      checkbox.checked = element.checked
      this.doToggle(checkbox)
    }
  }

  doToggle(checkbox) {
    const changed = checkbox.checked !== checkbox.defaultChecked

    if (changed && checkbox.checked) {
      checkbox.dataset.add_target('check.added')
    } else if (changed && !checkbox.checked) {
      checkbox.dataset.add_target('check.moved')
    } else {
      checkbox.dataset.remove_target('check.added')
      checkbox.dataset.remove_target('check.moved')
    }
  }
}
