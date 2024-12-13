import BaseController from '../base_controller'

// 用于对指定 form 的数据进行提交
export default class extends BaseController {
  static values = {
    id: String,
    url: String
  }

  submit() {
    const ele = document.getElementById(this.idValue)
    this.formPost(ele)
  }
}
