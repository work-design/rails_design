import { Controller } from '@hotwired/stimulus'
const I18N = {
  zh: {
    badInput: '{label}格式不正确',
    customError: '{label}输入错误',
    patternMismatch: '{label}不符合格式要求',
    rangeOverflow: '{label}超出允许的最大值',
    rangeUnderflow: '{label}低于允许的最小值',
    stepMismatch: '{label}输入错误',
    tooLong: '{label}太长了',
    tooShort: '{label}太短了',
    typeMismatch: '{label}输入错误',
    valid: '{label}为非法值',
    valueMissing: '请输入{label}'
  },
  en: {
    badInput: 'Bad Input: {label}',
    customError: 'Custom Error: {label}',
    patternMismatch: 'Invalid Input: {label}',
    rangeOverflow: 'Range Over Flow: {label}',
    rangeUnderflow: 'Range Under Flow: {label}',
    stepMismatch: 'Step Mismatch',
    tooLong: '{label} is too long',
    tooShort: '{label} is Too Short',
    typeMismatch: '{label} Type Mismatch',
    valid: '{label} is not valid',
    valueMissing: 'Please enter: {label}'
  }
}
export default class extends Controller {
  static values = {
    css: { type: String, default: 'is-danger' }
  }

  connect() {
    const labels = Array.from(this.element.querySelectorAll('.field-label > label.label'))
    const lengths = labels.map(i => i.innerText.length)
    console.debug('lengths', lengths)
    const max = Math.max.apply(null, lengths)
    Array.from(this.element.getElementsByClassName('field-label')).forEach(i => {
      i.style.minWidth = `${max}ch`
    })
  }

  defaultValid(input) {
    const locale = document.querySelector('html').lang
    let label, word

    for (let key in input.validity) {
      if (input.validity[key]) {
        word = I18N[locale][key]
      }
    }

    if (input.labels.length > 0) {
      label = input.labels[0].innerText
    } else {
      label = input.dataset['label'] || ''
    }
    const text = word.replace('{label}', label)

    input.classList.add(this.cssValue)
    if (!input.parentNode.nextElementSibling) {
      const help = document.createElement('p')
      help.classList.add('help', this.cssValue)
      help.innerText = text
      input.parentNode.after(help)
    }
  }

  defaultClear(input) {
    if (input.validity.valid) {
      input.classList.remove(this.cssValue)
      let help = input.parentNode.nextElementSibling
      if (help && help.classList.contains('help') && help.classList.contains(this.cssValue)) {
        help.remove()
      }
    }
  }

  // data-action="blur->default_valid#check"
  check(event) {
    event.currentTarget.checkValidity()
  }

  // data-action="input->default_valid#clear"
  clear(event) {
    this.defaultClear(event.currentTarget)
  }

  // data-action="invalid->default_valid#notice"
  notice(event) {
    event.preventDefault()
    this.defaultValid(event.currentTarget)
  }

  // data-action="change->form#xx"
  tip(event) {
    const ele = event.currentTarget
    if (ele.defaultValue !== ele.value) {
      ele.classList.add('is-warning')
    } else {
      ele.classList.remove('is-warning')
    }
  }

  // form[method="get"]
  // submit->xx
  filter(event) {
    event.preventDefault()
    const url = new URL(location)
    const form = new FormData(event.currentTarget)
    url.searchParams.delete('page')

    for (let el of form.entries()) {
      if (el[1].length > 0) {
        url.searchParams.set(el[0], el[1])
      }
    }

    Turbo.visit(url.href)
  }

  // focus->form#blank
  blank(event) {
    const ele = event.currentTarget
    ele.value = ''

    ele.addEventListener('blur', this.restoreDefaultValue, { once: true })
  }

  restoreDefaultValue(event) {
    const ele = event.currentTarget
    if (isNaN(ele.valueAsNumber)) {
      ele.value = ele.defaultValue
    }
  }

}
