import BaseController from '../base_controller'

export default class extends BaseController {


  submit(e) {
    const el = e.currentTarget
    for (const input of el.form.elements) {
      if (input.name === el.name && input.type === 'hidden') {
        input.remove()
      }
    }
    el.form.requestSubmit()
  }

}
