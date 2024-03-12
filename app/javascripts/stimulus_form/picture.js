import { DirectUploadController } from '@rails/activestorage/src/direct_upload_controller'
import { Controller } from '@hotwired/stimulus'

// <input type="file" data-controller="picture">
export default class extends Controller {
  static targets = ['src', 'filename', 'preview', 'uploadDiv']

  //<input type="file" data-action="picture#upload">
  upload(event) {
    const input = event.currentTarget
    const button = input.form.querySelector('input[type=submit], button[type=submit]')
    input.disabled = true
    button.disabled = true
    Array.from(input.files).forEach(file => {
      this.filenameTarget.innerText = file.name
      // todo file is image
      this.previewFile(file)
      let controller = new DirectUploadController(input, file)
      controller.start(error => {
        console.error('upload,er', error)
        input.disabled = false
        button.disabled = false
      })
    })

    input.value = null
  }

  dropFile(event) {
    event.preventDefault()
    event.stopPropagation()
    for (var i = 0; i < event.dataTransfer.files.length; i++) {
      var file = e.dataTransfer.files[i]
      console.debug('drop文件', file.name)
    }
  }

  pasteFile(event) {
    const result = false
    const clipboardData = event.clipboardData
    let items

    if (typeof clipboardData === 'object') {
      items = clipboardData.items || clipboardData.files || []

      for (let i = 0; i < items.length; i++) {
        let item = items[i]
        console.debug('粘贴', item)
      }
    }

    if (result) { event.preventDefault() }
  }

  previewFile(file) {
    const template = this.previewTarget
    const cloned = template.cloneNode(true)
    cloned.style.display = 'block'

    let img = cloned.querySelector('img')
    img.src = window.URL.createObjectURL(file) //创建一个object URL，并不是你的本地路径
    img.onload = function(e) {
      console.debug(e)
      window.URL.revokeObjectURL(img.src) //图片加载后，释放object URL
    }

    template.after(cloned)
  }

  removePreview(event) {
    const wrap = event.currentTarget.parentNode.parentNode
    wrap.style.display = 'none'
    wrap.querySelector('input').remove()
    const up = this.uploadDivTarget
    const input = up.querySelector('input[type=file]')
    up.style.display = 'block'
    input.disabled = false
  }

}
