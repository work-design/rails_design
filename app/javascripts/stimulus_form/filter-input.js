import BaseController from '../base_controller'

export default class extends BaseController {


  submit(e) {
    const el = e.currentTarget
    el.form.requestSubmit()
  }

}
