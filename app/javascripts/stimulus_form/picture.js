import { DirectUploadController } from '@rails/activestorage/src/direct_upload_controller'
import { Controller } from '@hotwired/stimulus'

// <input type="file" data-controller="picture">
export default class extends Controller {
  static targets = ['src', 'filename', 'preview', 'upload']

  //<input type="file" data-action="picture#upload">
  upload(event) {
    const input = event.currentTarget
    const button = Array.from(input.form.elements).find(el =>
      el.type === 'submit' && el.name === 'commit'
    )

    input.disabled = true
    button.disabled = true

    Array.from(input.files).forEach(file => {
      if (file.type.startsWith('image/')) {
        this.previewFile(file)
      }
      const controller = new DirectUploadController(input, file)

      controller.directUploadWillCreateBlobWithXHR = (xhr) => {

      }

      controller.start(error => {
        console.error('upload,er', error)
        input.disabled = false
        button.disabled = false
      })
    })

    if (input.multiple) {

    } else {
      const uploadIcon = this.uploadTarget.querySelector('.file-cta')
      if (uploadIcon) {
        uploadIcon.classList.add('invisible')
      }
    }

    input.value = null
  }

  previewFile(file) {
    const template = this.previewTarget
    const cloned = template.cloneNode(true)
    cloned.classList.remove('display-none')

    const img = cloned.querySelector('img')
    img.src = window.URL.createObjectURL(file) // 创建一个object URL，并不是你的本地路径
    img.addEventListener('load', () => {
      window.URL.revokeObjectURL(img.src) // 图片加载后，释放object URL
    })

    template.after(cloned)
  }

  removePreview(e) {
    const valueInput = this.element.querySelector('input[type=hidden]')
    if (valueInput) {
      valueInput.remove()
    }

    const fileInput = this.element.querySelector('input[type=file]')
    if (fileInput) {
      fileInput.disabled = false
    }

    const uploadIcon = this.uploadTarget.querySelector('.file-cta')
    if (uploadIcon) {
      uploadIcon.classList.remove('invisible')
    }

    const wrap = e.currentTarget.parentNode
    wrap.remove()
  }

}
