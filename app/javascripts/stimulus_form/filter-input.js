import BaseController from '../base_controller'

export default class extends BaseController {


  submit(e) {
    const el = e.currentTarget
    for (const input of el.form.elements) {
      if (input.name === el.name && input.type === 'hidden') {
        input.remove()
      } else if (input.name === 'commit') {
        input.disabled = true
      }
    }
    el.form.requestSubmit()
  }

  confirm(e) {
    const el = e.currentTarget
    const lteEl = Array.from(el.form.elements).find(i => i.name === 'created_at-gte')
    console.debug(el.value)
    el.blur()

    if (el.type === 'datetime-local' && el.name.endsWith('-lte') && lteEl.value) {
      // 激活确认按钮
    }
  }

}
