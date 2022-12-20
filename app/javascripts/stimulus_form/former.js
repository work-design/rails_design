import { Controller } from '@hotwired/stimulus'

// 用于对指定 form 的数据进行提交
export default class extends Controller {
  static values = {
    id: String,
    url: String
  }

  submit() {
    const ele = document.getElementById(this.idValue)
    const data = new FormData(ele)

    this.post(this.urlValue, data)
  }
}
